import { useState } from "react";
import { z } from "zod";
import { useStore } from "../../store/useStore";
import { toast } from "react-toastify";
import dayjs from "dayjs";

const emailSchema = z.object({
    to: z.string().email("Invalid email"),
    cc: z.string().optional(),
    subject: z.string().min(1, "Subject required"),
    body: z.string().min(1, "Body required"),
    option: z.enum(["now", "schedule"]),
    scheduleTime: z.string().refine((val) => dayjs(val, "YYYY-MM-DD HH:mm:ss").isValid(), "Invalid date format"),
  });

interface ComposeMailProps {
  nextStep: () => void;
  prevStep: () => void;
}

const ComposeMail: React.FC<ComposeMailProps> = ({ nextStep, prevStep }) => {
  const { setEmailOption } = useStore();
  const [form, setForm] = useState({
    to: "",
    cc: "",
    subject: "",
    body: "",
    option: "now" as "now" | "schedule",
    scheduleTime: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    try {
      emailSchema.parse(form);
      setEmailOption(
        form.option,
        form.option === "schedule" ? form.scheduleTime : undefined
      );
      toast.success("Email composed successfully!");
      nextStep();
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(`Error occurred: ${err.message}`);
      } else {
        toast.error(`An unknown error occurred`);
      }
    }
  };

  return (
    <div className="space-y-4 dark:text-white">
      <input
        name="to"
        value={form.to}
        onChange={handleChange}
        placeholder="To"
        className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
      />
      <input
        name="cc"
        value={form.cc}
        onChange={handleChange}
        placeholder="CC"
        className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
      />
      <input
        name="subject"
        value={form.subject}
        onChange={handleChange}
        placeholder="Subject"
        className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
      />
      <textarea
        name="body"
        value={form.body}
        onChange={handleChange}
        placeholder="Body"
        className="w-full p-2 border rounded h-32 dark:bg-gray-700 dark:border-gray-600"
      />
      <div className="flex space-x-4">
        <label>
          <input
            type="radio"
            name="option"
            value="now"
            checked={form.option === "now"}
            onChange={() => setForm({ ...form, option: "now" })}
          />
          Kirim Sekarang
        </label>
        <label>
          <input
            type="radio"
            name="option"
            value="schedule"
            checked={form.option === "schedule"}
            onChange={() => setForm({ ...form, option: "schedule" })}
          />
          Jadwalkan
        </label>
        {form.option === "schedule" && (
          <div>
            <label>Schedule Time:</label>
            <input
              title="YYYY-MM-DDTHH:mm"
              type="datetime-local"
              name="scheduleTime"
              value={form.scheduleTime}
              onChange={handleChange}
              className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
        )}
      </div>
      <div className="flex space-x-4">
        <button
          onClick={prevStep}
          className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
        >
          Back
        </button>
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ComposeMail;
