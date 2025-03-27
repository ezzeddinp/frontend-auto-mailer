import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDropzone } from "react-dropzone";
import { useStore } from "../../../store/useStore";
import { FileProgress, simulateUpload } from "./components/utils/uploadUtils";
import UploadDropdown from "./components/UploadDropdown";
import FilePreview from "./components/FilePreview";
import ActionButtons from "./components/ActionButtons";
import { IoPersonSharp } from "react-icons/io5";
import { CgAttachment } from "react-icons/cg";

interface FileUploadProps {
  nextStep: () => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ nextStep }) => {
  const { excelFile, zipFile, pdfFile, setFiles } = useStore();

  const [excelProgress, setExcelProgress] = useState<FileProgress | null>(null);
  const [attachmentProgress, setAttachmentProgress] = useState<FileProgress | null>(null);
  
  const [excel, setExcel] = useState<File | null>(excelFile);
  const [attachment, setAttachment] = useState<File | null>(zipFile || pdfFile);

  const [uploadControllers, setUploadControllers] = useState<{ excel: (() => void) | null; attachment: (() => void) | null }>({
    excel: null,
    attachment: null,
  });

  const [openDropdown, setOpenDropdown] = useState<"recipients" | "attachments" | null>(null);

  useEffect(() => {
    if (zipFile || pdfFile) {
      setAttachment(zipFile || pdfFile);
    
    }
  }, [zipFile, pdfFile]);
  

  useEffect(() => {
    if (excelFile && !excelProgress) {
      const cancelUpload = simulateUpload(excelFile, "Excel", setExcelProgress);
      setUploadControllers((prev) => ({ ...prev, excel: cancelUpload }));
    }
  }, [excelFile, excelProgress]);

  useEffect(() => {
    if ((zipFile || pdfFile) && !attachmentProgress) {
      const file = zipFile || pdfFile;
      const type = zipFile ? "ZIP" : "PDF";
      if (!file) {
        return;
      }
      const cancelUpload = simulateUpload(file, type, setAttachmentProgress);
      setUploadControllers((prev) => ({ ...prev, attachment: cancelUpload }));
    }
  }, [zipFile, pdfFile, attachmentProgress]);


  const handleDelete = (type: "excel" | "attachment") => {
    if (type === "excel") {
      uploadControllers.excel?.(); // Hentikan upload kalau masih jalan
      setExcel(null);
      setExcelProgress(null);
      setFiles(null, zipFile, pdfFile); // Hapus dari store juga
      setUploadControllers((prev) => ({ ...prev, excel: null }));
    } else {
      uploadControllers.attachment?.();
      setAttachment(null);
      setAttachmentProgress(null);
      setFiles(excel, null, null); // Hapus dari store juga
      setUploadControllers((prev) => ({ ...prev, attachment: null }));
    }
  
    setUploadControllers({ excel: null, attachment: null }); // Reset controllers
    toast.info("File removed");
  };
  

  const handleSubmit = () => {
    if (excelProgress?.status !== "success" || attachmentProgress?.status !== "success") {
      toast.error("Tunggu sampai semua file berhasil di-upload.");
      return;
    }

    setFiles(excel, attachment?.type === "application/zip" ? attachment : null, attachment?.type === "application/pdf" ? attachment : null);
    toast.success("Files uploaded successfully!");
    nextStep();
  };

  const onDropExcel = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    console.log("📂 Excel file dropped:", file);
    if (file) {
      setFiles(file, zipFile, pdfFile); // Update Zustand
      const cancelUpload = simulateUpload(file, "Excel", setExcelProgress);
      return () => cancelUpload();
    }
  };

  const onDropAttachment = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    console.log("📂 File dropped:", file); // 🔥 Debugging
  
    if (file) {
      const isZip = file.type === "application/zip";
      setFiles(excelFile, isZip ? file : null, isZip ? null : file); // Update Zustand
      console.log("📁 State updated in Zustand:", { zipFile: isZip ? file : null, pdfFile: isZip ? null : file });
  
      const type: "ZIP" | "PDF" = isZip ? "ZIP" : "PDF";
      const cancelUpload = simulateUpload(file, type, setAttachmentProgress);
      console.log("🚀 Upload started:", type);
  
      return () => cancelUpload();
    }
  };
  
  

  const { getRootProps: excelRoot, getInputProps: excelInput } = useDropzone({
    onDrop: onDropExcel,
    accept: {
      "text/csv": [".csv"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
    },
  });

  const { getRootProps: attachmentRoot, getInputProps: attachmentInput } = useDropzone({
    onDrop: onDropAttachment,
    accept: {
      "application/zip": [".zip"],
      "application/pdf": [".pdf"],
    },
  });

  const handlePreview = (file: File) => {
    const url = URL.createObjectURL(file);
    window.open(url, "_blank");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 flex items-start p-4">
        <div className="flex-1 pr-4">
          <h2 className="text-xl font-bold text-black">Upload Your File</h2>
          <p className="text-gray-400 text-[13px] mb-4">
            Select and upload the files of your choice!
          </p>

          <div className="flex flex-col gap-2">
            <UploadDropdown
              label="Recipients"
              icon={
                <IoPersonSharp className="text-[#10A3E9] w-[28px] h-[28px]" />
              }
              isOpen={openDropdown === "recipients"}
              onToggle={() =>
                setOpenDropdown(
                  openDropdown === "recipients" ? null : "recipients"
                )
              }
              dropzoneProps={{
                getRootProps: excelRoot,
                getInputProps: excelInput,
              }}
              supportedTypes="XLSX / CSV"
            />
            <UploadDropdown
              label="Attachments"
              icon={
                <CgAttachment className="text-[#10A3E9] w-[28px] h-[28px]" />
              }
              isOpen={openDropdown === "attachments"}
              onToggle={() =>
                setOpenDropdown(
                  openDropdown === "attachments" ? null : "attachments"
                )
              }
              dropzoneProps={{
                getRootProps: attachmentRoot,
                getInputProps: attachmentInput,
              }}
              supportedTypes="ZIP / PDF"
            />
          </div>
        </div>

        <div className="w-px bg-[#DBDBDB] mx-4 self-stretch" />

        {/* Right Side: Preview Area */}
        <div className="flex-1 pl-4">
          <div className="space-y-4">
            {(excelProgress || excelFile) && (
              <FilePreview
                progress={
                  excelProgress || {
                    file: excelFile!,
                    progress: 100,
                    status: "success",
                    type: "Excel",
                  }
                }
                onDelete={() => handleDelete("excel")}
                onPreview={handlePreview}
              />
            )}
            {(attachmentProgress || attachment) && (
              <FilePreview
                progress={
                  attachmentProgress || {
                    file: attachment!,
                    progress: 100,
                    status: "success",
                    type: attachment?.type === "application/zip" ? "ZIP" : "PDF",
                  }
                }
                onDelete={() => handleDelete("attachment")}
                onPreview={handlePreview}
              />
            )}
          </div>
        </div>
      </div>

      <ActionButtons
        onCancel={() => handleDelete("excel")}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default FileUpload;