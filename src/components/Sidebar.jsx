import React, { useState } from 'react'

const Sidebar = () => {
  const [price, setPrice] = useState(75000)

  const checkRange = (e) => {
    setPrice(e.target.value);
  }

  return (
    <aside>
      <div className='w-1/6 py-10 bg-gray-200 transform -translate-y-1/2 top-1/2 fixed'>
        <form action="" className='flex flex-col justify-center items-center space-y-4'>
          <h1 className='text-2xl font-bold text-green-950'>Filter</h1>
          <label htmlFor="">Price: {price} </label>
          <input type="range" name="" id="" min={1} max={100000} defaultValue={75000} onChange={(e) => checkRange(e)} />
          <label htmlFor="" className='text-2xl text-green-950 font-semibold'>Category</label>
          <ul>
            <li>
              <input type="checkbox" name="" id="" />
              <label className='text-xl px-2' htmlFor="">Men's Clothing</label>
            </li>
            <li>
              <input type="checkbox" name="" id="" />
              <label className='text-xl px-2' htmlFor="">Women's Clothing</label>
            </li>
            <li>
              <input type="checkbox" name="" id="" />
              <label className='text-xl px-2' htmlFor="">Jewelery</label>
            </li>
            <li>
              <input type="checkbox" name="" id="" />
              <label className='text-xl px-2' htmlFor="">Electronics</label>
            </li>
          </ul>
        </form>
      </div>
    </aside>
  )
}

export default Sidebar
