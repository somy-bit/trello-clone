import openApi from "@/openapi";
import { NextResponse } from "next/server";

export async function POST(reauest:Request){

    const {todos} = await reauest.json();
    console.log(todos)

    
}