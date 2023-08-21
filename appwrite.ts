//@ts-ignore
import { Client,ID,Databases,Storage } from 'appwrite';

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(process.env.NEXT_PUBLIC_PROJECT_ID);

    const database = new Databases(client);
    
    //@ts-ignore
    const storage = new Storage(client)

    export {client,database,storage,ID}