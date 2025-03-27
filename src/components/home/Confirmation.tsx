import { useEffect, useState } from "react";
import { useStore } from "../../store/useStore";
import { sendEmail } from "../../utils/api";
import { toast } from "react-toastify";
import dayjs from "dayjs";

const Confirmation: React.FC = () => {
  const {
    token,
    excelFile,
    zipFile,
    pdfFile,
    emailOption,
    scheduleTime,
    clearFiles,
  } = useStore();
  const [status, setStatus] = useState<"success" | "error" | null>(null);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const send = async () => {
      if (!excelFile || !zipFile || !pdfFile || !token || !emailOption) return; // Update
      try {
        const res = await sendEmail(
          excelFile,
          zipFile,
          pdfFile,
          emailOption,
          scheduleTime,
          token
        ); // Update
        if (res && typeof res === "string") {
          setStatus("success");
          setMessage(res);
          toast.success(
            emailOption === "now"
              ? "Email sent successfully!"
              : `Email scheduled for ${dayjs(scheduleTime).format(
                  "DD/MM/YYYY HH:mm"
                )}`
          );
          clearFiles();
        } else {
            throw new Error("Invalid response from server");
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setStatus("error");
          toast.error(`Error occurred: ${err.message}`);
        } else {
          // Handle the case where err is not an Error
        }
      }
    };
    send();
  }, [
    excelFile,
    zipFile,
    pdfFile,
    token,
    emailOption,
    scheduleTime,
    clearFiles,
  ]); // Update

  return (
    <div className="text-center dark:text-white">
      {status === "success" ? (
        <>
          <h2 className="text-xl font-bold text-green-500">Success!</h2>
          <p>
            {/* Email has been {emailOption === "now" ? "sent" : "scheduled"}{" "}
            successfully. */}
            {message}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Done
          </button>
        </>
      ) : status === "error" ? (
        <>
          <h2 className="text-xl font-bold text-red-500">Error Occurred</h2>
          <p>Something went wrong. Please try again.</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Confirmation;
