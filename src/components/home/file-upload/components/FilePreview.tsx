import { Trash2, XCircle } from "lucide-react";
import {
  BsFiletypeXlsx,
  BsFiletypePdf,
  BsFileEarmarkZip,
} from "react-icons/bs";
import { FaCheck } from "react-icons/fa6";
import { FileProgress } from "./utils/uploadUtils";


interface FilePreviewProps {
  progress: FileProgress;
  onDelete: () => void;
  onPreview: (file: File) => void;
}

const FilePreview: React.FC<FilePreviewProps> = ({
  progress,
  onDelete,
  onPreview,
}) => {
  const formatFileSize = (size: number) => {
    return (size / (1024 * 1024)).toFixed(2) + " MB";
  };

  const renderFileIcon = (type: "Excel" | "ZIP" | "PDF") => {
    switch (type) {
      case "Excel":
        return <BsFiletypeXlsx className="text-green-500 text-[35px]" />;
      case "PDF":
        return <BsFiletypePdf className="text-red-500 text-[35px]" />;
      case "ZIP":
        return <BsFileEarmarkZip className="text-orange-500 text-[35px]" />;
      default:
        return <BsFiletypePdf className="text-red-500 text-[35px]" />;
    }
  };

  return (
    <div className="rounded-[15px] px-6 py-1 bg-white shadow-sm">
      <div className="flex items-center space-x-7 justify-between">
        <div className="flex flex-row items-center justify-center space-x-3 w-full">
          {renderFileIcon(progress.type)}
          <div className="flex-1 flex flex-col">
            <p className="text-gray-600 text-[11px] font-bold w-full">
              {progress.file.name}
            </p>
            <div className="flex flex-col mt-2">
              <p className="text-gray-400 text-[11px]">
                {formatFileSize(progress.file.size)}
              </p>
              <div className="flex items-center space-x-2">
                <div className="w-full bg-gray-200 rounded-full h-1">
                  <div
                    className={`h-1 rounded-full ${
                      progress.status === "success"
                        ? "bg-green-500"
                        : progress.status === "error"
                        ? "bg-red-500"
                        : "bg-blue-500"
                    }`}
                    style={{
                      width: `${progress.progress}%`,
                      transition: "width 0.5s ease-in-out",
                    }}
                  />
                </div>
                {progress.status === "uploading" ? (
                  <span className="text-gray-600 text-[12px]">
                    {progress.progress}%
                  </span>
                ) : progress.status === "success" ? (
                  <div className="text-gray-600 text-[12px]">
                    {progress.progress}%
                  </div>
                ) : (
                  <div className="bg-red-500 rounded-full p-1">
                    <XCircle className="text-white" size={16} />
                  </div>
                )}
              </div>
            </div>
            {progress.status === "success" && (
              <button
                onClick={() => onPreview(progress.file)}
                className="text-[#254B7C] text-left cursor-pointer hover:text-blue-500 transition duration-300 text-[12px] mt-1"
              >
                Click to view
              </button>
            )}
            {progress.status === "error" && (
              <p className="text-red-500 text-[12px] mt-1">
                Upload failed, please try again
              </p>
            )}
          </div>
        </div>
        {progress.status === "success" ? (
          <div className="bg-green-500 rounded-full p-1">
            <FaCheck className="text-white" size={12} />
          </div>
        ) : (
          <button onClick={onDelete}>
            <Trash2
              className="text-gray-600 cursor-pointer transition duration-300 hover:text-red-500"
              size={20}
            />
          </button>
        )}
      </div>
    </div>
  );
};

export default FilePreview;
