
import { clsx, type ClassValue } from "clsx";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { ToastPosition } from "react-toastify";
import { twMerge } from "tailwind-merge";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const toastoptions = {
  position: "top-center" as ToastPosition,
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
};
export function getLargerProfileImage(url: string, size: number = 400) {
  if (url) {
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
export const handleDownloadPDF = async (printRef: any) => {
  try {
    if (printRef.current) {
      console.log(printRef.current);
      const canvas = await html2canvas(printRef.current, {
        scale: 2,
        useCORS: true,
      });
      const imgData = canvas.toDataURL("image/png");

      // Default PDF page width in mm
      const pdfWidth = 210; // A4 width in mm
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width; // Scale height proportionally to the width

      // Create jsPDF instance with default width and dynamic height
      const pdf = new jsPDF({
        orientation: pdfHeight > pdfWidth ? "portrait" : "landscape",
        unit: "mm",
        format: [pdfWidth, pdfHeight], // Fixed width, dynamic height
      });

      // Add the image to the PDF
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

      // Generate a unique file name using timestamp
      const uniqueName = `resume_${new Date().getTime()}.pdf`;
      pdf.save(uniqueName);
    }
  } catch (error) {
    console.error("Error during PDF download:", error);
  }
};


