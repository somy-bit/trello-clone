import { database, storage ,ID} from '@/appwrite';
import { fetchBoardGroupedByCol } from '@/lib/fetchBoardGroupedByCol';
import uplaodImage from '@/lib/uploadImage';
import { create } from 'zustand'


interface BoardState{

    board : Board;
    getBoard :()=>void;
    setBoardState :(board :Board)=>void;
    upadateDb :(todo:Todo,columnId:ColumnType)=>void;

    //
    searchString : string;
    setSearchString :(searchString : string)=>void;

    newTask :string;
    setNewTask :(input:string)=>void

    newTaskType:ColumnType;
    setNewTaskType : (columnId:ColumnType)=>void

    image:File|null;
    setImage:(image:File|null)=>void


    deleteTask : (taskIndex:number,todoId:Todo,id:ColumnType)=>void
    addTask:(todo:string,columnId:ColumnType,image?:File|null)=>void
}
export const useBoardStore = create<BoardState>((set,get) => ({
  board: {
    column:new Map<ColumnType,Column>()
  },
  getBoard:async()=>{

    const board = await fetchBoardGroupedByCol()
    set({board})
  }
,
  setBoardState: (board)=>set({board})
  ,
  upadateDb : async(todo,columnId)=>{

    await database.updateDocument(process.env.NEXT_PUBLIC_DATABASE_ID,process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID,
      todo.$id,{title:todo.title,status:columnId})
  },

  searchString :"",
  setSearchString :(searchString)=>set({searchString}),

  deleteTask: async(taskIndex,todo,id)=>{
  

    const newCols = new Map(get().board.column);

    newCols.get(id)?.todos.splice(taskIndex,1);

    set({board : {column:newCols}})

    if(todo.image){

      await storage.deleteFile(todo.image.bucketId,todo.image.fileId)
    }

    await database.deleteDocument(process.env.NEXT_PUBLIC_DATABASE_ID! ,process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID! ,todo.$id)
  },
  newTask:'',
  setNewTask:(input)=>{
      set({newTask:input})
  },

  newTaskType:'todo',
  setNewTaskType: (columnId)=>set({newTaskType:columnId}) ,

  image:null,
  setImage : (image:File|null)=>set({image:image})
    
  ,
  addTask:async(todo:string , columnId:ColumnType,image?:File|null)=>{

    let file: Image | undefined
    if(image){
      const uploadedImg =await uplaodImage(image)
      if(uploadedImg){
        file={
          bucketId :uploadedImg.bucketId,
          fileId:uploadedImg.$id,
        }
      }

    }

    const{$id} = await database.createDocument(process.env.NEXT_PUBLIC_DATABASE_ID! ,
      process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
      ID.unique(),
      {
        title:todo,
        status : columnId,
        ...(file&&{image : JSON.stringify(file)})
      }
      )

      alert('task added successfully')

      set({newTask:''})

      set((state)=>{
        const newcols = new Map(state.board.column)

        const newTodo:Todo ={
          $id,
          $createdAt:new Date().toISOString(),
          title:todo,
          status:columnId,
          ...(file && {image:file})
        };

        const column = newcols.get(columnId)
        if(!column){
          newcols.set(columnId,{
            id:columnId,
            todos:[newTodo]
          })
        }else{
          newcols.get(columnId)?.todos.push(newTodo)
        }

        return{
          board:{
            column:newcols
          }
        }
      })
  },

}))