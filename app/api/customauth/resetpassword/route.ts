import { NextResponse } from "next/server"
import jwt, { JwtPayload } from "jsonwebtoken"
import {prisma} from "@/lib/prisma"
import bycrypt from "bcryptjs"
export  async function POST(req: Request) {
    try{
    const {newPassword,token} = await req.json()
    let decoded = jwt.verify(token,process.env.JWT_SECRET!)
    if(decoded){
        let hassedpass = await bycrypt.hash(newPassword,10)

        let bool = await prisma.user.update({
            where:{email:(decoded as JwtPayload)?.email},
            data:{password:hassedpass}
        })
        if(bool){
            return NextResponse.json({status:200,message:"Password Updated Successfully"},{status:200})
        }
        else return NextResponse.json({status:500,message:"Password not updated"},{status:500})
    }
    }
    catch(e){
        // console.dir( e)
        if(e instanceof jwt.JsonWebTokenError){
            return NextResponse.json({status:406,message:"Invalid Token"},{status:406})
        }
        return NextResponse.json({status:500,message:"Internal Server Error"},{status:500})
    }
}