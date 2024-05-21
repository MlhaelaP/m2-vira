"use client";

import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeartCrack } from "@fortawesome/free-solid-svg-icons";
import { config } from "@fortawesome/fontawesome-svg-core";

config.autoAddCss = false;

export const FavoriteProduct = ({ product, disabled, removeFavorite }: any) => {
  return (
    <div className="max-w-xs rounded-xl overflow-hidden shadow-xl hover:scale-[1.03] bg-gradient-to-r from-slate-300 via-white to-slate-300 bg-[position:_0%_0%] hover:bg-[position:_100%_100%] bg-[size:_200%] transition-all duration-500 m-5">
      <Link href={`/products/details/${product._id}`}>
        <Image
          src={product.image}
          alt="Dress"
          width={512}
          height={512}
          priority
        />

        <hr className="w-48 h-1 mx-auto my-4 border-0 rounded bg-slate-950 drop-shadow-lg" />
      </Link>
      <div className="py-4 px-4 flex flex-col items-center">
        <h3 className="text-xl font-semibold text-slate-950">
          {product.title}
        </h3>

        <p className="mt-4 text-xl font-bold text-slate-950">
          ${product.price}
        </p>

        <button
          disabled={disabled}
          onClick={() => removeFavorite(product._id)}
          className="text-red-700 hover:text-red-600 focus:outline-none font-medium rounded-lg text-sm text-center inline-flex items-center mt-2 mx-2"
        >
          <FontAwesomeIcon icon={faHeartCrack} width="28" height="28" />
        </button>
      </div>
    </div>
  );
};
