"use server";
// import AWS from "aws-sdk";
// import { prisma } from "./prisma";

// const s3 = new AWS.S3({
//   accessKeyId: process.env.ACCESS_KEY_ID,
//   secretAccessKey: process.env.SECRET_ACCESS_KEY,
//   endpoint: process.env.ENDPOINT,
// });
// const params = {
//   Bucket: "resume-builder",
// };
// export async function getAllTemplates() {
//   try {
//     const data = await s3.listObjectsV2(params).promise();
//     const images = data.Contents?.filter((item) =>
//       item.Key?.includes(".jpg")
//     ).map((item) => ({
//       key: item.Key,
//       url: `${process.env.PUBLIC_ACCESS_URL}${item.Key}`,
//     }));
//
//     return images;
//   } catch (error) {
//
//   }
// }
import { prisma } from "@/lib/prisma";
import { InputJsonValue } from "@prisma/client/runtime/library";
import { cookies } from "next/headers";

export async function getTemplates() {
  try {
    const templates = await prisma.template.findMany();
    return templates;
  } catch (error) {}
}
export async function getTemplateData(id: number) {
  try {
    let templateData = await prisma.templateMetaData.findUnique({
      where: {
        id: id,
      },
    });

    return Object.fromEntries(
      Object.entries(templateData as {}).filter(
        ([key, value]) => typeof value != "number"
      )
    );
  } catch (error) {
    console.log(error);
  }
}

export async function createTemplate(
  templateId: number,
  userid: string,
  data: InputJsonValue
) {
  try {
    let check = await prisma.userTemplateRecord.findUnique({
      where:{
        userId_templateId:{
          userId:userid,
          templateId:templateId
        }
      }
    })
    if(!check){
      let bool = await prisma.userTemplateRecord.create({
        data: {
          userId: userid,
          templateId: templateId,
          data: data,
        },
      });
      return
    }
    
  } catch (error) {
    console.log(error);
  }
}

export async function updateTemplate(
  templateId: number,
  userid: string,
  data: InputJsonValue
) {
  try {
    let bool = await prisma.userTemplateRecord.update({
      where: {
        userId_templateId: { userId: userid, templateId: templateId },
      },
      data: {
        data: data,
      },
    });
  } catch (error) {
    console.log(error);
  }
}
export async function getUserTemplates(userid: string) {
  try{
    let templates = await prisma.userTemplateRecord.findMany({
      where:{
        userId:userid
      }
    })
    return templates
  }catch(error){
    console.log(error)
  }
}

export async function getCookies() {
  const cookiestore = cookies();
  const token = cookiestore.get("token");
  return token;
}
export async function clearCookies() {
  const cookiestore = cookies();
  cookiestore.delete("token");
}
