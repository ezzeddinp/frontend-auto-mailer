/* 
    File ini untuk menampilkan halaman utama pada menu Home
*/

import { useState } from "react";
import StatusBar from "../components/Statusbar";
import FileUpload from "../components/home/file-upload/FileUpload";
import FileValidation from "../components/home/FileValidation";
import ComposeMail from "../components/home/ComposeMail";
import Confirmation from "../components/home/Confirmation";

const Home: React.FC = () => {
  const [step, setStep] = useState(0);

  return (
    <main className="p-14 min-h-full flex flex-col ">
      <StatusBar step={step} />
      <div className="flex-1 bg-white min-h-full w-full rounded-[15px] shadow-sm shadow-gray-300 px-8 py-2">
        {step === 0 && <FileUpload nextStep={() => setStep(1)} />}
      </div>
      {step === 1 && (
        <FileValidation
          nextStep={() => setStep(2)}
          prevStep={() => setStep(0)}
        />
      )}
      {step === 2 && (
        <ComposeMail nextStep={() => setStep(3)} prevStep={() => setStep(1)} />
      )}
      {step === 3 && <Confirmation />}
    </main>
  );
};

export default Home;
