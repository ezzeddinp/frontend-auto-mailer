import { IoCloudUploadOutline } from "react-icons/io5";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { JSX } from "react";
import { DropzoneInputProps, DropzoneRootProps } from "react-dropzone";
import { useStore } from "../../../../store/useStore";
import { FileProgress } from "./utils/uploadUtils";

interface UploadDropdownProps {
  label: string;
  icon: JSX.Element;
  isOpen: boolean;
  onToggle: () => void;
  dropzoneProps: {
    getRootProps: () => DropzoneRootProps;
    getInputProps: () => DropzoneInputProps;
  };
  supportedTypes: string;
  fileProgress?: FileProgress | null; // Tambahkan fileProgress sebagai optional prop
  onDelete?: () => void;
  onPreview?: (file: File) => void;
}

const UploadDropdown: React.FC<UploadDropdownProps> = ({
  label,
  icon,
  isOpen,
  onToggle,
  dropzoneProps,
  supportedTypes,
}) => {
  const { excelFile, zipFile, pdfFile, setFiles } = useStore();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];

      // Cek jenis file berdasarkan ekstensi / MIME type
      if (file.type.includes("spreadsheet") || file.type === "text/csv") {
        setFiles(file, zipFile, pdfFile); // Update hanya Excel
      } else if (
        file.type === "application/pdf" ||
        file.type === "application/zip"
      ) {
        setFiles(
          excelFile,
          file.type === "application/zip" ? file : zipFile,
          file.type === "application/pdf" ? file : pdfFile
        ); // Update ZIP/PDF sesuai jenisnya
      }
    }
  };
  return (
    <div>
      <button
        onClick={onToggle}
        className="w-full cursor-pointer flex justify-between items-center p-2 text-gray-800 bg-white shadow-gray-300 shadow-sm rounded-[15px]"
      >
        <div className="flex items-center space-x-2">
          {icon}
          <span className="text-gray-800 font-semibold text-[15px]">
            {label}
          </span>
        </div>
        <span>{isOpen ? <IoIosArrowDown /> : <IoIosArrowForward />}</span>
      </button>
      {isOpen && (
        <div
          {...dropzoneProps.getRootProps()}
          className="transition-all duration-300 ease-in-out transform scale-y-100 origin-top px-4 py-4 border-gray-300 dark:border-gray-600 shadow-sm rounded-b-[15px]"
        >
          <input
            {...dropzoneProps.getInputProps()}
            onChange={handleFileChange}
          />
          <div className="flex cursor-pointer hover:bg-black/5 transition duration-300 flex-col items-center justify-center gap-1 border-2 border-dashed border-[#254B7C] p-6 rounded-[5px] text-center">
            <IoCloudUploadOutline className="w-[40px] h-[40px] text-[#7A7A7A]" />
            <p className="text-gray-800 font-semibold text-[15px]">
              Drag & drop to upload
            </p>
            <p className="text-gray-400/60 text-[13px]">OR</p>
            <button className="text-white bg-[#10A3E9] hover:bg-[#10a4e9c9] px-2 py-0.5 cursor-pointer rounded-md text-[13px]">
              Browse Files
            </button>
            <p className="dark:text-gray-400 text-[12px] mt-2">
              Max file size: 50MB <br /> Supported file type: {supportedTypes}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadDropdown;
