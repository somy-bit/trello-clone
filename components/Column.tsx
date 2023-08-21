import { PlusCircleIcon } from '@heroicons/react/24/solid'
import React from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import TodoCard from './TodoCard'
import { useBoardStore } from '@/Store/BoardStore'
import { useModalStore } from '@/Store/ModalStore'

type Props = {
  id: ColumnType,
  index: number,
  todos: Todo[]
}

const idToColumName: { [key in ColumnType]: string } = {
  "todo": 'To Do',
  "inProgress": 'In Progress',
  "done": 'Done'
}

function Column({ id, todos, index }: Props) {

  const [searchString,setNewTaskType] = useBoardStore(state => [state.searchString,state.setNewTaskType])
  const openModal = useModalStore(state=>state.openModal)

  const handleOpenModal=()=>{

    setNewTaskType(id)
    openModal()
  }

  return (
    <Draggable draggableId={id} index={index}>

      {(provided) =>
        <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>

          <Droppable droppableId={index.toString()} type='card'>

            {(provided, snapshot) => (
              <div {...provided.droppableProps} ref={provided.innerRef} className={`p-2 shadow-sm rounded-2xl
                            ${snapshot.isDraggingOver ? 'bg-green-400' : 'bg-white/50'}`}>

                <h1 className='flex justify-between font-bold p-2'>
                  {idToColumName[id]}
                  <span className='text-gray-500 px-2 py-1 rounded-full bg-gray-200'>
                    {todos.length}
                  </span>
                </h1>

                <div className='space-y-2'>

                  {todos.map((todo, index) => {

                    if (searchString && !todo.title.toLocaleLowerCase().includes(searchString.toLocaleLowerCase()))
                      return null;

                    return (

                      <Draggable
                        key={todo.$id}
                        index={index}
                        draggableId={todo.$id}
                      >
                        {(provided) => (
                          <TodoCard
                            todo={todo}
                            index={index}
                            id={id}
                            draggableProps={provided.draggableProps}
                            dragHandleProps={provided.dragHandleProps}
                            innerRef={provided.innerRef}
                          />


                        )}

                      </Draggable>

                    )
                  })}

                  {provided.placeholder}

                  <div className='flex items-end justify-end p-2'>
                    <button className='text-green-500 hover:text-green-600'>
                      <PlusCircleIcon className='h-10 w-10' onClick={handleOpenModal}>

                      </PlusCircleIcon>
                    </button>
                  </div>
                </div>

              </div>
            )}
          </Droppable>
        </div>
      }
    </Draggable>
  )
}

export default Column
