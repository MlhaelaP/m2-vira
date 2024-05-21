"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ContactUs() {
  const router = useRouter();

  const [from, setFrom] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [isDisabled, setIsDisabled] = useState(false);

  const onSubmitHandler = async () => {
    setIsDisabled(true);

    try {
      const res = await fetch("http://localhost:3000/api/contactus", {
        method: "POST",
        body: JSON.stringify({ from, subject, message }),
      });

      const data = await res.json();

      if (data.status !== 200) {
        throw new Error(data.message);
      }

      toast.success(data.message);
      router.push("/");
    } catch (err: any) {
      toast.error(err.message);
    }

    setIsDisabled(false);
  };

  return (
    <div className="flex justify-center items-center mt-4">
      <div className="py-8 px-8 max-w-screen-md text-slate-800 bg-white bg-opacity-75 rounded-xl mx-2">
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center">
          Contact Us
        </h2>
        <p className="mb-5 font-light text-center sm:text-xl">
          Got a technical issue? Want to send feedback about a beta feature?
          Need details about our Business plan? Let us know.
        </p>

        <div className="my-3">
          <label className="block mb-2 text-lg font-medium">Your email</label>
          <input
            onChange={(e) => setFrom(e.target.value)}
            className="shadow-sm text-sm rounded-lg block w-full p-2.5 text-slate-800"
            placeholder="example@domain.com"
          />
        </div>

        <div className="my-3">
          <label className="block mb-2 text-lg font-medium">Subject</label>
          <input
            onChange={(e) => setSubject(e.target.value)}
            className="shadow-sm text-sm rounded-lg block w-full p-2.5 text-slate-800"
            placeholder="How can we help you?"
          />
        </div>
        <div className="my-3">
          <label className="block mb-2 text-lg font-medium">Your message</label>
          <textarea
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            className="shadow-sm text-sm rounded-lg block w-full p-2.5 text-slate-800 resize-none"
            placeholder="Leave your message here..."
          ></textarea>
        </div>

        <div className="flex justify-center items-center">
          <button
            onClick={onSubmitHandler}
            disabled={isDisabled}
            className="flex px-2 py-2 bg-slate-500 hover:bg-slate-400 text-white font-bold border-b-4 border-slate-800 hover:border-slate-600 rounded hover:scale-[1.05] duration-300"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
