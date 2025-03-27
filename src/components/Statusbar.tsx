/* 
    File ini berisikan komponen untuk menampilkan status bar
    sebagai indicator progres
*/

interface StatusBarProps {
  step: number;
}

const StatusBar: React.FC<StatusBarProps> = ({ step }) => {
  const steps = ["File Upload", "File Validation", "Compose Mail", "Confirmation"];

  return (
    <div className="flex items-center  justify-between mb-6">
      {steps.map((label, index) => (
        <div key={index} className="relative flex-1 flex flex-col items-center">
          {/* Garis Penghubung (kecuali untuk langkah pertama) */}
          {index > 0 && (
            <div
              className={`absolute top-4  left-[-40%] w-[80%] h-1 ${
                index <= step ? "bg-green-500" : "bg-gray-300"
              }`}
            />
          )}

          {/* Lingkaran dengan Nomor */}
          <div
            className={`relative z-10 w-8 text-sm h-8 flex items-center justify-center rounded-full border-2 ${
              index < step
                ? "bg-green-500 border-green-500 text-white"
                : index === step
                ? "bg-white border-green-500 text-green-500"
                : "bg-white border-gray-300 text-gray-400"
            }`}
          >
            {index + 1}
          </div>

          {/* Label Langkah */}
          <span className={`text-[13px] mt-2 text-center  ${
              index < step
                ? " text-green-500"
                : index === step
                ? "bg-white border-green-500 text-gray-400"
                : "bg-white border-gray-300 text-gray-400"
            }`}>
            {label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default StatusBar;