import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
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

  const hashedPassword = await bcrypt.hash(password, 10); // Generate hashed password
  const result = await prisma.$transaction(async (prisma) => {
        // Create the new user
        const user = await prisma.user.create({
          data: {
            name,
            email,
            password: hashedPassword,
          },
        });

      // Create account for the new user
      let account =await prisma.account.create({
        data: {
          userId: user.id,
          type: "custom_auth",
          provider: "custom_auth",
          providerAccountId: randomUUID(),
        },
      });

      return {user,account}; // Return user object so we can use it for token signing
    });

    let response = NextResponse.json({ message: "User created successfully",status:true,username:name});
    let obj={
      name:result.user.name,
      email:result.user.email,
      id:result.user.id,
      image:result.user.image,
      provider:result.account.provider
    }
    let token = signToken(obj);
    response.cookies.set('token',token,{httpOnly:true,path:'/',secure:true});
    return response
    
  } catch (error:any) {
    console.log(error);
    return NextResponse.json({ message: "Opps! Something went wrong",status:false});
  }
}