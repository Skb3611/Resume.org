"use server"
import { cookies } from "next/headers";

export async function getCookies() {
  const cookiestore = cookies();
  const token = cookiestore.get("token");
  return token;
}
export async function clearCookies(){
  const cookiestore = cookies();
  cookiestore.delete("token");
}