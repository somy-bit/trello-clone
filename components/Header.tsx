'use client'

import Image from 'next/image'
import React from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import Avatar from 'react-avatar'
import { UserCircleIcon } from '@heroicons/react/20/solid'
import { useBoardStore } from '@/Store/BoardStore'

export default function Header() {

  const [searchString, setSearchString] = useBoardStore(state => [state.searchString, state.setSearchString])

  return (
    <header>

      <div className='absolute top-0 left-0 w-full h-96
          bg-gradient-to-br from-pink-500 to-[#0055d1] 
          rounded-md filter blur-3xl opacity-50 -z-50'
      />

      <div className='flex flex-col md:flex-row p-5 items-center bg-gray-500.15 rounded-b-lg'>
        <Image src={'https://links.papareact.com/c2cdd5'} alt='trello'
          width={300}
          height={100}
          className='w-44 md:w-56 pb-10 md:pb-0 object-contain'
        />

        <div className='flex space-x-5 w-full flex-1 justify-end'>
          {/* search */}
          <form className='flex items-center p-2 space-x-5  rounded-full shadow-md bg-white flex-1 md:flex-initial'>
            <MagnifyingGlassIcon className='w-6 h-6 text-gray-400' />
            <input
              type='text'
              placeholder='search'
              className='flex-1 outline-none px-2'
              value={searchString}
              onChange={e => setSearchString(e.target.value)}
            />
            <button hidden type='submit'></button>
          </form>

          {/* avatar */}
          <Avatar name='somy bit' round size='50' color='#0055d1' />
        </div>
      </div>
      <div className='flex justify-center items-center px-5 md:py-5'>

        <p className='flex items-center font-light text-sm pr-5
           shadow-xl rounded-xl w-fit bg-white max-w-3xl text-[#0055d1]'>
          <UserCircleIcon color='#0055d1' width={50} />
          gpt is going to power this part
        </p>
      </div>
    </header>
  )
}