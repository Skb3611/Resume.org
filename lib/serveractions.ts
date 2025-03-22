"use server";
import React from "react";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import bcrypt from "bcryptjs";
import { render } from "@react-email/components";
import ForgotPasswordEmail from "@/components/ForgetEmail";
const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID ?? "",
    secretAccessKey: process.env.SECRET_ACCESS_KEY ?? "",
  },
  endpoint: process.env.ENDPOINT ?? "",
  forcePathStyle: true,
  region: "auto",
});

export async function uploadImg(id: string, file: string) {
  try {
    const base64 = file.split(",")[1]; // Remove the "data:image/png;base64," part
    const fileBuffer = Buffer.from(base64, "base64");
    const command = new PutObjectCommand({
      Bucket: "resume-builder",
      Key: `UserProfile/${id}.png`,
      Body: fileBuffer,
      ContentType: "image/png",
    });
    const data = await s3.send(command);
    console.log(data);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
import { prisma } from "@/lib/prisma";
import { InputJsonValue } from "@prisma/client/runtime/library";
import { cookies } from "next/headers";
import { signToken } from "./jwt";

export async function getTemplates() {
  try {
    const templates = await prisma.template.findMany();
    return templates;
  } catch (error) { }
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
async function updateResumeCount(userid: string) {
  try {
    let user = await prisma.user.update({
      where: {
        id: userid,
      },
      data: {
        resumesCreated: { increment: 1 },
      },
    });
    if (user) return true;
  } catch (er) {
    console.log(er);
  }
}

export const checkAccountLimit = async (userid: string, templateId: number) => {
  try {
    let user = await prisma.user.findUnique({
      where: {
        id: userid,
      },
      select: {
        accountType: true,
        resumesCreated: true,
        UserTemplateRecord: true,
      },
    });
    console.log(user);
    let check = user?.UserTemplateRecord.find(item => item.templateId == templateId)
    console.log(check);
    switch (user?.accountType) {
      case "Basic":
        return check ? {
          status: true,
          message: "Resume created successfully"
        } :
          user?.resumesCreated >= 5 ?
            {
              status: false,
              message: "You have reached the maximum limit of resumes"
            }
            :
            {
              status: true,
              message: "Resume created successfully"
            }

      case "Premium":
        return check ? {
          status: true,
          message: "Resume created successfully"
        } :
          user?.resumesCreated >= 10
            ? {
              status: false,
              message: "You have reached the maximum limit of resumes",
            }
            : {
              status: true,
              message: "Resume created successfully",
            };

      case "Professional":
        return check ? {
          status: true,
          message: "Resume created successfully"
        } :
          user?.resumesCreated >= 100
            ? {
              status: false,
              message: "You have reached the maximum limit of resumes",
            }
            : {
              status: true,
              message: "Resume created successfully",
            };
    }
  } catch (er) {
    console.log(er);
  }
};
export async function createTemplate(
  templateId: number,
  userid: string,
  data: InputJsonValue
) {
  try {
    let check = await prisma.userTemplateRecord.findUnique({
      where: {
        userId_templateId: {
          userId: userid,
          templateId: templateId,
        },
      },
    });
    if (!check) {
      await updateResumeCount(userid);
      let bool = await prisma.userTemplateRecord.create({
        data: {
          userId: userid,
          templateId: templateId,
          data: data,
        },
      });
      return true;
    }
    return false;
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
    if (bool) return true;
    return false;
  } catch (error) {
    console.log(error);
  }
}
export async function getUserTemplates(userid: string) {
  try {
    let templates = await prisma.userTemplateRecord.findMany({
      where: {
        userId: userid,
      },
    });
    return templates;
  } catch (error) {
    console.log(error);
  }
}

export async function getUserTemplateData(templateId: number, userid: string) {
  try {
    let data = await prisma.userTemplateRecord.findUnique({
      where: {
        userId_templateId: {
          userId: userid,
          templateId: templateId,
        },
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
}
export async function updateUserDetails(
  id: string,
  name: string,
  email: string,
  image: string
) {
  try {
    if (image.includes("base64,")) {
      let imgupdate = await uploadImg(id, image);
      if (!imgupdate) return false;
    }

    let bool = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        email: email,
        image: `${process.env.PUBLIC_ACCESS_URL}UserProfile/${id}.png`,
      },
      include: {
        accounts: true,
      },
    });
    // console.log(bool)
    if (bool) {
      if (bool.accounts[0].type == "custom_auth") {
        let obj = {
          name: bool.name,
          email: bool.email,
          id: bool.id,
          image: bool.image,
        };
        let token = signToken(bool);
        console.log(token);
        return token;
      }
      return true;
    }

    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function updateUserPassword(
  id: string,
  currentPassword: string,
  newPassword: string
) {
  try {
    let user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    if (!user) return false;
    if (user) {
      if (user.password == null) {
        let hashedPassword = await bcrypt.hash(newPassword, 10);
        let update = await prisma.user.update({
          where: {
            id: id,
          },
          data: {
            password: hashedPassword,
          },
        });
        if (update) return true;
        return false;
      }
      let bool = await bcrypt.compare(currentPassword, user.password ?? "");
      if (bool) {
        let hashedPassword = await bcrypt.hash(newPassword, 10);
        let update = await prisma.user.update({
          where: {
            id: id,
          },
          data: {
            password: hashedPassword,
          },
        });
        if (update) return true;
        return false;
      }
    }
  } catch (error) {
    console.log(error);
    return false;
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
