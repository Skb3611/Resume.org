import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { signToken } from "@/lib/jwt";
export async function POST(req: Request) {
  try {
    let { email, password } = await req.json();
    let user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) return NextResponse.json({message:"No user Found with this email.",status:false});
    let password_check = await bcrypt.compare(password, user.password ?? "");
    let response,token ;
      if (password_check) {
          response = NextResponse.json({ message: "Login Successful", status: true,username:user.name});
          token = signToken(user.name??"",user.email ?? "");
          response.cookies.set("token", token, { path: "/", httpOnly: true });
          return response;
      } else{
        return NextResponse.json({message:"Invalid Credentials",status:false});
      }
  } catch (error: any) {
    return NextResponse.json({ error: error.message,status:false });
  }
}
