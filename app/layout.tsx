"use client"

import '../styles/globals.css';
import { Fragment, forwardRef } from 'react';
import { Menu, Transition } from '@headlessui/react';
import Link from 'next/link';
import { IoHome } from 'react-icons/io5';



export default function RootLayout({children}: {children: React.ReactNode}) {

  return (
    <html className='max-h-screen'>
      <head />
      <body className="flex flex-col min-h-screen bg-[url('../assets/background.jpg')] bg-cover overflow-hidden">

        {/* Navbar */}
        <nav className="flex w-screen flex-row-reverse justify-items-center justify-between bg-zinc-400 bg-opacity-70 py-4">
          <div id="Dropdown menu" className="absolute z-50 left-0 w-1/4">
            <Menu as= "div">

              <Menu.Button className='px-4 mx-3 mb-4 text-white text-l bg-purple-900 bg-opacity-60 rounded-lg ring-2 ring-indigo-700'>Entries</Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="transform opacity-75 -translate-x-10"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-200"
                leaveFrom="transform opacity-100"
                leaveTo="transform opacity-0 -translate-x-10"
              >
              <Menu.Items className='bg-zinc-400 bg-opacity-70 h-screen'>
                <Menu.Item as="div" className="w-full px-4 py-2 bg-blue-500 opacity-75 text-white text-center">
                  <Link href='/newentry'>
                      + New Entry
                  </Link>
                </Menu.Item>
              </Menu.Items>
              </Transition>
            </Menu>
          </div>

          <div className="px-6 flex">
            <Link href='/'> <IoHome size={24} /> </Link>
          </div>

        </nav>     
        
        {children}
      </body>
    </html>
  )
}
