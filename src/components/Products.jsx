import React from 'react';

const Products = (props) => {
    console.log(props.data);
    return (
        <div className='grid grid-cols-3 gap-8'>
            {props?.data?.map((data) => {
                return (
                    <div className='border-2 rounded-2xl p-8 shadow-sm'>
                        <img src={data.image} className='w-72 h-80 mb-4' alt="" />
                        <div className='space-y-4'>
                            <h1 className='text-ellipsis whitespace-nowrap overflow-hidden text-xl'>{data.title}</h1>
                            <p className='text-2xl font-bold text-gray-600'>₹ {data.price}</p>
                            <button type='submit' className='rounded-xl w-full border-blue-200 p-4 bg-blue-600 text-white'>Add To Cart</button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Products
