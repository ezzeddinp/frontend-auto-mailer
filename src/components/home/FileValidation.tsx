import { useStore } from "../../store/useStore";

interface FileValidationProps {
  nextStep: () => void;
  prevStep: () => void;
}

const FileValidation: React.FC<FileValidationProps> = ({ nextStep, prevStep }) => {
  const { excelFile, zipFile } = useStore();

  console.log("FileValidation: Rendering...");

  const handlePrev = () => {
    console.log("FileValidation: Prev button clicked, calling prevStep...");
    prevStep();
  };

  const handleNext = () => {
    console.log("FileValidation: Next button clicked, calling nextStep...");
    nextStep();
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-black dark:text-white">File Validation</h2>
      <p className="text-gray-400 text-[13px] mb-4">
        Validating your uploaded files...
      </p>
      <div className="space-y-2">
        <p className="text-gray-800 dark:text-gray-200">
          Excel File: {excelFile?.name || "None"}
        </p>
        <p className="text-gray-800 dark:text-gray-200">
          Attachment: {zipFile?.name || "None"}
        </p>
      </div>
      <div className="flex space-x-4 mt-4">
        <button
          onClick={handlePrev}
          className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default FileValidation;