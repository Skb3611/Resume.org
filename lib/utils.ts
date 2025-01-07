import { clsx, type ClassValue } from "clsx"
import { ToastPosition } from "react-toastify"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const  toastoptions={
  position: "top-center" as ToastPosition,
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",

  }
export function getLargerProfileImage(url: string, size: number = 400) {
    if(url){
      if (url.includes("googleusercontent.com")) {
        // Google: Replace `s96-c` or similar with `s<size>-c`
        return url.replace(/s\d+-c/, `s${size}-c`);
      } else if (url.includes("twimg.com")) {
        // Twitter: Replace `normal`, `bigger`, or `mini` with `400x400` or any custom size
        return url.replace(/_(normal|bigger|mini)/, `_${size}x${size}`);
      } else if (url.includes("linkedin.com")) {
        // LinkedIn: Replace default resolution by appending or modifying query parameters
        const urlObj = new URL(url);
        if (!urlObj.searchParams.has("resolution")) {
          urlObj.searchParams.append("resolution", `${size}`);
        } else {
          urlObj.searchParams.set("resolution", `${size}`);
        }
        return urlObj.toString();
      }
      return url; // If no matching platform, return the original URL
    }
  }
  