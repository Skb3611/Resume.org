import { NextResponse } from "next/server";
import {prisma } from "@/lib/prisma"
import jwt from "jsonwebtoken"
import nodemailer from "nodemailer"
import { render } from "@react-email/components";
import ForgotPasswordEmail from "@/components/ForgetEmail";
import React from "react";
export async function POST(req: Request) {
try{
    const {email} = await req.json()
    console.log(email)
    let user = await prisma.user.findUnique({
        where:{email:email}
    })
    if(!user){
        return NextResponse.json({message:"User not found"},{status:404})
    }
    else{
        let token = jwt.sign({email},process.env.JWT_SECRET!,{expiresIn: "5m"})
        let status = await sendEmail(user?.name!,email,token)
        return status ? NextResponse.json({success:true,message:"Email sent successfully"},{status:200}) : NextResponse.json({message:"Email not sent"},{status:500})
    }
    
}catch(e){
    console.log(e)
    return NextResponse.json({message:"Internal Server Error"},{status:500})
}
}
let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    service: "gmail",
    auth: {
      user: process.env.GMAIL_APP_EMAIL,
      pass: process.env.GMAIL_APP_PASS,
    },
  });
  
 async function sendEmail(username:string,email: string, token: string) {
    console.log(process.env.GOOGLE_APP_EMAIL, process.env.GOOGLE_APP_PASS);
    try {
      const link = `${process.env.NEXTAUTH_URL}/resetpassword/${token}`;
      let page = await render(React.createElement(ForgotPasswordEmail, {userName:username, resetLink: link }));
      let res = await transporter.sendMail({
        from: process.env.GOOGLE_APP_EMAIL,
        to: email,
        subject: "Password Reset",
        html: page,
      });
      return res ? true : false;
    } catch (e) {
      console.log(e);
      return false;
    }
  }