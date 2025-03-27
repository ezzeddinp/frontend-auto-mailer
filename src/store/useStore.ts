import { create } from "zustand";


interface FileState {
  excelFile: File | null;
  zipFile: File | null;
  pdfFile: File | null;

  progress: number;
  setFiles: (
    excel: File | null,
    zip: File | null,
    pdf: File | null,
  ) => void;
  setProgress: (type: "excel" | "attachment", progress: number) => void;
}

export const useStore = create<FileState>((set) => ({
  excelFile: null,
  zipFile: null,
  pdfFile: null,
  excelMeta: null,
  zipMeta: null,
  pdfMeta: null,
  progress: 0,
  setFiles: (excel, zip, pdf) =>
    set({ excelFile: excel, zipFile: zip, pdfFile: pdf }),
  setProgress: (type, progress) => set({ progress }),
}));
