interface Board{
    column : Map<ColumnType,Column>
}

type ColumnType = 'done'|'inProgress'|'todo'

interface Column{

    id:ColumnType;
    todos: Todo[]

}

interface Todo{

    $id:string;
    $createdAt:string;
    title:string;
    status:ColumnType;
    image?:Image
}

interface Image{
    bucketId:string;
    fileId:string;
}