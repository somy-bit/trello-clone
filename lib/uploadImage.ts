import {ID,storage} from '@/appwrite'

const uplaodImage = async(file:File)=>{

    if(!file) return

    const upload = await storage.createFile(
        '64d8a7f01cd2172f375a',
        ID.unique(),
        file
    )

    return upload;
}

export default uplaodImage


