import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { randomUUID } from "crypto";
import { signToken } from "@/lib/jwt";
export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();
    let user = await prisma.user.findUnique({
        where:{
            email:email
        }
    })
    if(user) return NextResponse.json({message:"Email already in use.",status:false})
    let hashedPassword = await bcrypt.hash(password,10);
    user = await prisma.user.create({
      data: {
        name,
        email,
        password:hashedPassword,
      },
    });
    await prisma.account.create({
        data:{
            userId:user.id,
            type:"custom_auth",
            provider:"custom_auth",
            providerAccountId:randomUUID(),
        }
    })

    let response = NextResponse.json({ message: "User created successfully",status:true,username:name});
    let token = signToken(user.name ?? "",user.email ?? "");
    response.cookies.set('token',token,{httpOnly:true,path:'/',secure:true});
    return response
    
  } catch (error:any) {
    console.log(error);
    return NextResponse.json({ message: "Opps! Something went wrong",status:false});
  }
}