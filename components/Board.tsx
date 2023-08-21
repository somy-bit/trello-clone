'use client'
import { useBoardStore } from '@/Store/BoardStore'
import React, { useEffect } from 'react'
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd'
import Column from './Column'

function Board() {

    const [getBoard, board, setBoardState , updateDb] = useBoardStore(state => [state.getBoard, state.board,state.setBoardState,state.upadateDb])

    useEffect(() => {
        getBoard()
    }, [getBoard])

    const handleDropEnd = (result : DropResult)=>{

        const{source,destination,type} = result;

        if(!destination) return;
        //handle column drag
        if(type === 'column'){

            const entries = Array.from(board.column.entries())
            const [removed] =entries.splice(source.index,1)
            entries.splice(destination.index,0,removed)
             const rearrangedCols = new Map(entries)
            setBoardState({...board,column:rearrangedCols})
        }else{
        //handle card drag

        const columns  = Array.from(board.column);
       
        const startColIndex = columns[Number(source.droppableId)];
        const endColIndex = columns[Number(destination.droppableId)];

        const startCol :Column ={
            id :startColIndex[1].id,
            todos :  startColIndex[1].todos
        };

        const endCol :Column ={
            id:endColIndex[1].id,
            todos : endColIndex[1].todos
        };

        if(!startCol || !endCol) return;

        if(destination.index === source.index && startCol === endCol) return;
         const newTodos = startCol.todos;
         const [movedTodo] = newTodos.splice(source.index,1) 

         if(startCol.id === endCol.id){

            newTodos.splice(destination.index,0,movedTodo);
            const newCol = {
                id:startCol.id,
                todos:newTodos
            }

           const  newColumns = new Map(board.column)
           newColumns.set(startCol.id,newCol)

           setBoardState({...board,column:newColumns})
         }else{

            const endTodos = Array.from(endCol.todos)
            endTodos.splice(destination.index,0,movedTodo);

            const newColumns = new Map(board.column)
             
            const newstartCol = {
                id:startCol.id,
                todos:newTodos
            }

            newColumns.set(startCol.id,newstartCol)
            newColumns.set(endCol.id,{id:endCol.id,todos:endTodos})

            updateDb(movedTodo,endCol.id)

            setBoardState({...board,column:newColumns})
         }
        }
    }

    return (

        <DragDropContext onDragEnd={handleDropEnd}>
            <Droppable droppableId='board' direction='horizontal' type='column'>
                {(provided) => (

                    <div {...provided.droppableProps} ref={provided.innerRef} 
                        className='grid grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto p-5'>

                        {Array.from(board.column.entries()).map(([id, column], index) => (
                            <Column
                                key={id}
                                id={id}
                                todos={column.todos}
                                index={index}
                            />
                        ))}
                    </div>
                )}

            </Droppable>
        </DragDropContext>
    )
}

export default Board
