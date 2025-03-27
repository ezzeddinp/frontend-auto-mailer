export interface FileProgress {
  file: File;
  progress: number;
  status: "uploading" | "success" | "error";
  type: "Excel" | "ZIP" | "PDF";
}
export function simulateUpload(
  file: File,
  type: "Excel" | "ZIP" | "PDF",
  setProgress: (progress: FileProgress) => void
) {
  let progress = 0;
  setProgress({ file, progress, status: "uploading", type });

  const interval = setInterval(() => {
    progress += Math.floor(Math.random() * 20) + 10; // Naik random antara 10-30%
    if (progress >= 100) {
      clearInterval(interval);
      setProgress({ file, progress: 100, status: "success", type });
      return;
    }
    setProgress({ file, progress, status: "uploading", type });
  }, 500);

  return () => clearInterval(interval); // Return fungsi untuk cancel upload
}
