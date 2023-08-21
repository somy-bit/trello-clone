'use client'
import { useBoardStore } from '@/Store/BoardStore'
import { RadioGroup } from '@headlessui/react'
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import React from 'react'


const types = [
    {
        id:'todo',
        name:'Todo',
        description : 'A new task to be completed',
        color:'bg-red-500'
    },
    {
        id:'inProgress',
        name:'In Progress',
        description:'A task that currently is being worked on',
        color:'bg-yellow-500'
    },
    {
        id:'done',
        name:'Done',
        description:'A task that has been completed',
        color:'bg-green-500'
    }
]

function TaskTypeRadioGroup() {
const[newTaskType,setNewTaskType] = useBoardStore(state=>[state.newTaskType,state.setNewTaskType])

  return (
    <div className='w-full py-5'>
      <div className='mx-auto max-w-md w-full'>

            <RadioGroup 
            value={newTaskType}
            onChange={(e)=>setNewTaskType(e)}
            >
                    <div className='space-y-2'>
                        {types.map((type)=>(
                            <RadioGroup.Option key={type.id} value={type.id} 
                            className={({active,checked})=>
                            `${active? "ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-200":""}
                            ${checked ? `${type.color} bg-opacity-70 text-white`:"bg-white"} relative flex cursor-pointerrounded-lg px-5 py-4 shaodw-md focus:outline-none`}>

                                {({active,checked})=>(
                                    <>
                                    <div className='w-full items-center justify-between flex'>
                                        <div className='flex items-center'>
                                            <div className='tetx-sm'>
                                                <RadioGroup.Label
                                                as='p'
                                                className={`font-md ${checked?'text-white':'text-gray-900'}`}
                                                >
                                                    {type.name}
                                                </RadioGroup.Label>
                                                <RadioGroup.Description
                                                as='span'
                                                className={`inline ${checked?'text-white':'text-gray-500'}`}
                                                >
                                                    {type.description}
                                                </RadioGroup.Description>

                                            </div>
                                        </div>
                                        {checked &&(
                                           <div className='shrink-0 text-white'>
                                                <CheckCircleIcon className='h-6 w-6'/>
                                           </div>

                                        )}
            
                                    </div>
                                    </>
                                )}
                            </RadioGroup.Option>
                        ))}
                    </div>
            </RadioGroup>
      </div>
    </div>
  )
}

export default TaskTypeRadioGroup
