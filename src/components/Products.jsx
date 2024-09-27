import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from "../index";
import more from "../assets/more.png";
import less from "../assets/less.png";
import { DataContext } from '../DataProviderContext';
import { toast, ToastContainer } from 'react-toastify';

const Products = (props) => {
    const navigate = useNavigate();
    const [CartData, setCartData] = useState([]);
    const { setSharedData } = useContext(DataContext);

    const fetchProducts = async () => {
        try {
            const results = await getDocs(collection(db, "products"));
            const fetchedProducts = results.docs.map((doc) => ({ docId: doc.id, ...doc.data() }));
            setCartData(fetchedProducts);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (props.cartTrue) {
            fetchProducts();
        }
    }, [props.cartTrue]);


    // Memoize the calculation of the total price to avoid recalculating on every render
    const totalPrice = useMemo(() => {
        return CartData.reduce((acc, item) => acc + item.price * item.quantity, 0);
    }, [CartData]);

    // Update the shared data (total price) whenever CartData changes
    useEffect(() => {
        setSharedData(totalPrice.toFixed());
    }, [setSharedData, totalPrice]);


    const addToCart = async (data) => {
        try {
            const docRef = await addDoc(collection(db, "products"), {
                id: data.id,
                title: data.title,
                category: data.category,
                image: data.image,
                price: data.price,
                quantity: 1
            });
            toast("Adding to Cart");
        } catch (error) {
            console.log(error)
        }
    }

    async function updateQuantity(id, quantity) {
        try {
            if (quantity === 0) {
                removeCart(id);
            } else {
                const updateQuantity = { quantity: quantity };
                const prodRef = doc(db, "products", id);
                await updateDoc(prodRef, updateQuantity);
                fetchProducts();
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function removeCart(id) {
        try {
            const docRef = doc(db, "products", id);
            await deleteDoc(docRef);
            fetchProducts();
        } catch (error) {
            console.log(error)
        }
    }

    function checkAuth(data) {
        setCartData([...CartData, data]);
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user.localId || !user.email || !user.passwordHash) {
            navigate('/signin');
        } else {
            addToCart(data);
        }
    }

    return (
        <>
            <ToastContainer />
            <div className='grid grid-cols-3 gap-8'>
                {!props.cartTrue ?
                    (props?.filteredData?.map((data) => {
                        return (
                            <>
                                <div className='border-2 rounded-2xl p-8 shadow-sm' key={data.id}>
                                    <img src={data.image} className='w-72 h-80 mb-4' alt="" />
                                    <div className='space-y-4'>
                                        <h1 className='text-ellipsis whitespace-nowrap overflow-hidden text-xl'>{data.title}</h1>
                                        <p className='text-2xl font-bold text-gray-600'>₹ {data.price}</p>
                                        <button type='submit' className='rounded-xl w-full border-blue-200 p-3 bg-blue-600 text-white text-2xl'
                                            onClick={() => checkAuth(data)}>Add To Cart</button>
                                    </div>
                                </div>
                            </>
                        )
                    })) : (CartData?.map((data) => {
                        return (
                            <div className='border-2 rounded-2xl p-8 shadow-sm' key={data.id}>
                                <img src={data.image} className='w-72 h-80 mb-4' alt="" />
                                <div className='space-y-4'>
                                    <h1 className='text-ellipsis whitespace-nowrap overflow-hidden text-xl'>{data.title}</h1>
                                    <div className='flex justify-between text-2xl'>
                                        <p className='text-2xl font-bold text-gray-600'>₹ {data.price}</p>
                                        <div className='flex justify-evenly items-center w-1/2'>
                                            <img src={less} alt="" onClick={() => updateQuantity(data.docId, data.quantity - 1)} />
                                            {data.quantity}
                                            <img src={more} alt="" onClick={() => updateQuantity(data.docId, data.quantity + 1)} />
                                        </div>
                                    </div>
                                    <button type='submit' className='rounded-xl w-full border-blue-200 p-3 bg-red-600 text-white text-2xl'
                                        onClick={() => removeCart(data.docId)}>Remove from Cart</button>
                                </div>
                            </div>
                        )
                    }))}
            </div>
        </>
    )
}

export default Products
