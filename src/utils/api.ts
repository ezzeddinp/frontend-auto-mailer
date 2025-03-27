/* 
    file ini digunakan untuk interaksi FE ke BE melalui url BE yaitu port 8080
    dan beberapa exportable method seperti validasi file, send email
*/

interface ValidateFilesResponse {
  success: boolean;
  data: { email: string; name: string; attachment: string; isValid: boolean }[];
  error?: string;
}

// Mock API responses
export const validateFiles = async (
  excel: File,
  zip: File,
  pdf: File,
  token: string // Parameter token disimpen buat konsistensi dengan flow asli, tapi ga dipake di mock
): Promise<ValidateFilesResponse> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulasi validasi file
      const isExcelValid = [
        "text/csv",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      ].includes(excel.type);
      const isZipValid = zip.type === "application/zip";
      const isPdfValid = pdf.type === "application/pdf";

      if (!isExcelValid) {
        reject(new Error("Excel file must be CSV or XLSX"));
        return;
      }
      if (!isZipValid) {
        reject(new Error("ZIP file must be in ZIP format"));
        return;
      }
      if (!isPdfValid) {
        reject(new Error("PDF file must be in PDF format"));
        return;
      }

      // Simulasi validasi isi file (misalnya cek nama file)
      if (excel.name.includes("invalid")) {
        resolve({
          success: false,
          data: [
            {
              email: "john.doe@example.com",
              name: "John Doe",
              attachment: "doc1.pdf",
              isValid: false,
            },
            {
              email: "jane.doe@example.com",
              name: "Jane Doe",
              attachment: "doc2.pdf",
              isValid: true,
            },
          ],
          error: "Some recipients are invalid",
        });
      } else {
        resolve({
          success: true,
          data: [
            {
              email: "john.doe@example.com",
              name: "John Doe",
              attachment: "doc1.pdf",
              isValid: true,
            },
            {
              email: "jane.doe@example.com",
              name: "Jane Doe",
              attachment: "doc2.pdf",
              isValid: true,
            },
          ],
        });
      }
    }, 1000);
  });
};

export const sendEmail = async (
  excel: File,
  zip: File,
  pdf: File,
  option: "now" | "schedule",
  scheduleTime: string | null,
  token: string
) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulasi error kalau file invalid
      if (excel.name.includes("invalid")) {
        reject(new Error("Cannot send email: Invalid recipients detected"));
        return;
      }

      if (option === "now") {
        resolve("Email sent successfully");
      } else if (option === "schedule" && scheduleTime) {
        resolve(`Email scheduled for ${scheduleTime}`);
      } else {
        reject(new Error("Schedule time is required for scheduled emails"));
      }
    }, 1000);
  });
};

// CODE DIBAWAH AKAN DIGUNAKAN KETIKA BACKEND SUDAH READY

/* import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

export const validateFiles = async (excel: File, zip: File, pdf: File, token: string) => {
  const formData = new FormData();
  formData.append("excel", excel);
  formData.append("zip", zip);
  formData.append("pdf", pdf); // Tambah PDF
  const res = await api.post("/validate", formData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const sendEmail = async (
  excel: File,
  zip: File,
  pdf: File,
  option: "now" | "schedule",
  scheduleTime: string | null,
  token: string
) => {
  const formData = new FormData();
  formData.append("excel", excel);
  formData.append("zip", zip);
  formData.append("pdf", pdf);
  formData.append("option", option);
  if (scheduleTime) formData.append("scheduleTime", scheduleTime);
  const res = await api.post("/send-email", formData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}; */
