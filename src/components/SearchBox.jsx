import React from 'react'

const SearchBox = () => {
  return (
    <div className='flex justify-center mt-6'>
        <input type="text" placeholder='Search By Name' className='w-1/3 text-xl border-violet-400 rounded-2xl p-3 border-2 highlight outline-none' />
    </div>
  )
}

export default SearchBox
