import Link from "next/link";

export const NoProducts = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-8">
      <div className="flex flex-col items-center justify-center bg-white bg-opacity-50 rounded-xl px-6 py-8">
        <p className="text-slate-800 text-3xl md:text-5xl font-bold text-center uppercase">
          Please stand by!
        </p>

        <p className="text-slate-800 text-xl mt-4">
          We are currently manufacturing our latest fashion pieces!
        </p>

        <Link
          href="/"
          className="flex px-2 py-2 bg-sky-500 hover:bg-sky-400 text-white font-bold border-b-4 border-sky-800 hover:border-sky-600 rounded hover:scale-[1.05] duration-300 mt-12"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};
