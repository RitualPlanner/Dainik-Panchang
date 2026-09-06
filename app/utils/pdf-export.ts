import { generateImage } from "../utils";

export async function generatePDF(formData: any, boldFields: string[]) {
  // Dynamically import jsPDF to avoid SSR issues
  const { jsPDF } = await import("jspdf");

  // Generate high-resolution canvas image blob of the Panchang
  const imageBlob = await generateImage(formData, boldFields);

  // Convert blob to Data URL
  const imgDataUrl = await new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve((reader.result as string) || "");
    reader.readAsDataURL(imageBlob);
  });

  // Create a new A4 PDF document
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  // Fit the generated Panchang image perfectly onto the A4 page (210mm x 297mm)
  doc.addImage(imgDataUrl, "JPEG", 0, 0, 210, 297);

  // Return PDF as Blob
  return doc.output("blob");
}
