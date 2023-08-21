import { database } from "@/appwrite"

export const fetchBoardGroupedByCol = async () => {

    const data = await database.listDocuments(
        '64d8a4e133fd2d7c8196',
        '64d8a51bbe77ff55f879'
    )

    const todos = data.documents;
    

    const colums = todos.reduce((acc: any, todo: any) => {

        if (!acc.get(todo.status)) {
            acc.set(todo.status, {
                id: todo.status,
                todos: []
            })
        }
        acc.get(todo.status).todos.push({
            $id: todo.$id,
            $createdAt: todo.createdAt,
            title: todo.title,
            status: todo.status,
            ...(todo.image && { image: JSON.parse(todo.image) })
        })


        return acc
    }, new Map<ColumnType, Column>)

    const colTypes: ColumnType[] = ["done", "inProgress", "todo"]
    for (const colType of colTypes) {
        if (!colums.get(colType)) {
            colums.set(colType, {
                id: colType,
                todos: []
            })
        }
    }

    const board: Board = {
        column: colums
    }

    return board;
}

