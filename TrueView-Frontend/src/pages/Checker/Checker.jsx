import React from 'react'
import { FaPlus } from "react-icons/fa6";


import Sidebar, { SidebarItem } from '../../components/Sidebar';

export const Checker = () => {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar Component */}
      <Sidebar>
        {/* Sidebar Items */}
        <SidebarItem icon={<FaPlus />} text="New Check" active />
      </Sidebar>

     
      <div style={{ flex: 1, padding: '20px' }} className='flex flex-col justify-center items-center'>
        <h1 className='text-4xl font-medium text-center'>Please Provide The Article </h1>
        <div className='w-[80%] h-62  border-2 border-dashed border-gray-300 rounded-md flex flex-col justify-center items-center mx-auto mt-10'>
          <FaPlus size={50} className='text-gray-400' />
          <input type="file" name="" acc="inputfile" />
        </div>
        <input type="text" />
        <button className='bg-blue-500 cursor-pointer text-white px-4 py-2 justify-center items-center rounded-md mt-4'>Check now</button>
      </div>
    </div>
  )
}
