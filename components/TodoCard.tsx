'use client'
import { useBoardStore } from '@/Store/BoardStore';
import { XCircleIcon } from '@heroicons/react/24/solid';
import getURL from '../lib/getURL';
import React, { useEffect, useState } from 'react'
import { DraggableProvidedDragHandleProps, DraggableProvidedDraggableProps } from 'react-beautiful-dnd';
import Image from 'next/image';

type Props = {
    todo: Todo;
    index: number;
    id: ColumnType;
    innerRef: (element: HTMLElement | null) => void;
    draggableProps: DraggableProvidedDraggableProps;
    dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
}

function TodoCard({ todo, index, id, innerRef, dragHandleProps, draggableProps }: Props) {

    const deleteTask = useBoardStore(state => state.deleteTask)
    const [imageUrl, setImageUrl] = useState(null)


    useEffect(() => {

        if (todo.image) {
            const fetchImage = async () => {
                const url = await getURL(todo.image!)
                if (url) {
                    setImageUrl(url.toString())
                }
            }

            fetchImage();
        }


    }, [todo])

    return (
        <div
            {...dragHandleProps} {...draggableProps}
            ref={innerRef}

            className='bg-white rounded-md space-y-2 drop-shadow-md '
        >
            <div className='flex p-5 items-center justify-between'>
                <p>
                    {todo.title}
                </p>
                <button onClick={() => deleteTask(index, todo, id)} className='text-red-500 hover:text-red-600'>
                    <XCircleIcon className='ml-5 h-8 w-8' />
                </button>
            </div>
            {imageUrl && (
                <div className='w-full h-full rounded-b-mdب'>
                    <Image
                        src={imageUrl}
                        alt='todo image'
                        width={400}
                        height={200}
                        className='w-full object-contain rounded-b-md'

                    />
                </div>
            )}
        </div>
    )
}

export default TodoCard
