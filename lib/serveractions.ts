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
import {prisma} from "@/lib/prisma";
export async function getTemplates() {
  try {
    const templates = await prisma.template.findMany();
    return templates;
  } catch (error) {
 
  }
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
    console.log(error)
  }
}

