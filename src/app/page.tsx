"use client";

import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAt, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { config } from "@fortawesome/fontawesome-svg-core";
import toast from "react-hot-toast";
config.autoAddCss = false;

export default function Home() {
  const onSubscribe = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    toast.success("This feature will soon be added!");
  };

  return (
    <>
      <div className="flex flex-wrap items-center justify-center my-8">
        <figure className="relative transition-all duration-300 filter md:grayscale md:hover:grayscale-0 m-3">
          <Image
            priority
            className="rounded-lg"
            src="/images/womansfashion.jpg"
            alt="image description"
            width={512}
            height={256}
          />

          <figcaption className="absolute px-4 text-sm md:text-2xl top-10 right-0 left-0 bg-black py-4 bg-opacity-50 flex justify-center">
            <p className="uppercase font-bold text-white text-center">
              {"Refresh your wardrobe with our fancy collections"}
            </p>
          </figcaption>
        </figure>

        <figure className="relative transition-all duration-300 filter md:grayscale md:hover:grayscale-0 m-3">
          <Image
            className="rounded-lg"
            src="/images/mensfashion.jpg"
            alt="image description"
            width={512}
            height={256}
          />

          <figcaption className="absolute px-4 text-sm md:text-2xl top-10 right-0 left-0 bg-black py-4 bg-opacity-50 flex justify-center">
            <p className="uppercase font-bold text-white text-center">
              {"We add new collections every month"}
            </p>
          </figcaption>
        </figure>
      </div>

      <div className="text-center bg-slate-800 bg-opacity-75 px-2 py-8 mb-6 rounded-xl md:rounded-none mx-2 md:mx-0">
        <h2 className="mb-4 text-3xl tracking-tight font-extrabold text-slate-200 sm:text-4xl">
          Sign up for our newsletter
        </h2>

        <p className="mx-auto mb-8 max-w-2xl font-light text-slate-300 sm:text-xl">
          Stay up to date with the roadmap progress, announcements and exclusive
          discounts feel free to sign up with your email.
        </p>

        <div className="items-center flex justify-center mb-3 text-sky-500">
          <input
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 text-slate-700 drop-shadow-lg text-sm md:px-4 md:py-3"
            type="text"
            placeholder="Your Email"
          />

          <button
            onClick={(e) => onSubscribe(e)}
            className="flex px-2 py-2 mx-1 bg-sky-500 hover:bg-sky-400 text-white font-bold border-b-4 border-sky-800 hover:border-sky-600 rounded hover:scale-[1.05] duration-300 cursor-pointer"
          >
            <FontAwesomeIcon icon={faUserPlus} width={24} height={24} />
          </button>
        </div>
      </div>
    </>
  );
}
