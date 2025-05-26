'use client'

import React, { FormEvent, useRef } from 'react'

import { useState, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useModalStore } from '@/Store/ModalStore'
import { useBoardStore } from '@/Store/BoardStore'
import TaskTypeRadioGroup from './TaskTypeRadioGroup'
import Image from 'next/image'
import { PhotoIcon } from '@heroicons/react/24/solid'

export default function Modal() {

  const [isOpen, closeModal] = useModalStore(state => [state.isOpen, state.closeModal])
  const [newTasktype,newTask, setNewTask, image, setImage,addTask] = useBoardStore(state => [state.newTaskType,state.newTask, state.setNewTask, state.image, state.setImage,state.addTask])

  const imagePickerRef = useRef<HTMLInputElement>(null)

 const handleSubmit = (e:FormEvent<HTMLFormElement>)=>{
  e.preventDefault();
  if(!newTask) return;

  addTask(newTask,newTasktype,image)

  setImage(null)
  closeModal();
 }

  return (
    // Use the `Transition` component at the root level
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
      onSubmit={handleSubmit}
      as='form'
        className='relative  z-50'
        onClose={closeModal} >

        <div className='fixed top-0 left-0 mx-auto h-screen w-screen innset-0 overflow-y-auto'>
          <div className='flex min-h-full  items-center justify-center text-center p-4'>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black/30" />
            </Transition.Child>


            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left
                        align-middle transition-all shadow-xl'>

                <Dialog.Title as='h3' className='text-lg font-medium pb-2 leading-6 text-gray-600'>
                  Add A Task
                </Dialog.Title>

                <div className='mt-2'>
                  <input
                    type='text'
                    value={newTask}
                    onChange={e => setNewTask(e.target.value)}
                    className='w-full border border-gray-500 text-gray-700 rounded-md outline-none p-5'
                  />
                </div>
                <TaskTypeRadioGroup />

                <div>
                  <button
                    type='button'
                    onClick={() => imagePickerRef.current?.click()}
                    className='w-full border border-gray-300
                               rounded-md outline-none p-5 focus-visible:ring-2
                                focus-visible:ring-blue-500 focus-visible:ring-offset-2'>
                    <PhotoIcon
                      className='h-6 w-6 inline-block mr-2'
                    />
                    Upload Image
                  </button>
                  {image && (
                    <Image
                      src={URL.createObjectURL(image)}
                      alt='upload image'
                      width={200}
                      height={200}
                      className='w-full h-44 object-cover mt-2 filter hover:grayscale transition-all duration-150 cursor-not-allowed'
                      onClick={() => setImage(null)}
                    />
                  )}
                  <input
                    type='file'
                    hidden
                    ref={imagePickerRef}
                    onChange={e => {
                      if (!e.target.files![0].type.startsWith('image/')) return;
                      setImage(e.target.files![0])
                    }}
                  />
                </div>
                <div>
                  <button 
                  type='submit'
                  disabled={!newTask}
                   className='inline-flex justify-center rounded-md border border-transparent bg-blue-100
                   px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2
                   focus-visible:ring-blue-500 focue-visible:ring-offset-2 disabled:bg-gray-100 disabled:tetx-gray-300 disabled:cursor-not-allowed '>

                    Add Task
                  </button>
                </div>

              </Dialog.Panel>

            </Transition.Child>

          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
