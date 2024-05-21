"use client";

import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import { useState } from "react";
import toast from "react-hot-toast";

type ProductState = {
  id: string;
  color: string;
  size: string;
};

type ProductInfo = {
  _id: string;
  title: string;
  description: string;
  price: number;
  image: File | null;
  sizes: string[];
  colors: string[];
  materials: string[];
  tags: string[];
};

export const ProductDetailsOptions = ({
  product,
}: {
  product: ProductInfo;
}) => {
  const { data: session } = useSession();

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [productState, setProductState] = useState<ProductState>({
    id: product._id,
    size: product.sizes[0],
    color: product.colors[0],
  });

  const onFavoriteAdd = async () => {
    setIsButtonDisabled(true);

    try {
      const res = await fetch(`http://localhost:3000/api/favorites/add`, {
        method: "POST",
        body: JSON.stringify({
          _id: product?._id,
          email: session?.user?.email,
        }),
      });

      const data = await res.json();

      if (data.status !== 200) {
        throw new Error(data.message);
      }

      toast.success(data.message);
    } catch (err: any) {
      toast.error(err.message);
    }

    setIsButtonDisabled(false);
  };

  const onCartAdd = async () => {
    setIsButtonDisabled(true);

    try {
      const res = await fetch(`http://localhost:3000/api/cart/add`, {
        method: "POST",
        body: JSON.stringify({
          productState,
          email: session?.user?.email,
        }),
      });

      const data = await res.json();

      if (data.status !== 200) {
        throw new Error(data.message);
      }

      toast.success(data.message);
    } catch (err: any) {
      toast.error(err.message);
    }

    setIsButtonDisabled(false);
  };

  return (
    <>
      <div className="flex flex-col mt-6 pb-5 mb-6">
        <div className="flex flex-wrap items-center mb-3">
          <span className="mr-3 text-slate-200 font-bold">Colors:</span>
          {product?.colors.map((c) => {
            const isSelected =
              c === productState.color ? "bg-slate-200 rounded-full" : "";

            return (
              <p
                onClick={(e) =>
                  setProductState({
                    ...productState,
                    color: c,
                  })
                }
                key={c}
                className={`${isSelected} ml-1 rounded-full px-4 py-2 text-slate-800 font-bold cursor-pointer`}
              >
                {c}
              </p>
            );
          })}
        </div>

        <div className="flex items-center mb-3">
          <span className="text-slate-200 font-bold mr-3">Sizes:</span>
          <div>
            <select
              onChange={(e) =>
                setProductState({
                  ...productState,
                  size: e.target.value,
                })
              }
              className="block w-full text-sm text-white rounded-lg bg-slate-800 font-bold p-1 cursor-pointer"
            >
              {product?.sizes.map((s) => {
                return <option key={s}>{s}</option>;
              })}
            </select>
          </div>
        </div>

        <div className="flex flex-wrap items-center font-bold">
          <span className="text-slate-200 mr-3">Materials:</span>
          <div className="text-slate-800">{product?.materials.join("/")}</div>
        </div>
      </div>

      <hr className="w-full h-1 my-4 border-0 rounded mt-5 mb-12 bg-gradient-to-r from-slate-300 via-slate-200 to-slate-300 drop-shadow-lg" />

      <div className="flex items-center">
        <span className="text-2xl text-slate-200 font-bold">
          ${product?.price}
        </span>

        {session?.user ? (
          <>
            <button
              onClick={onCartAdd}
              disabled={isButtonDisabled}
              className="flex ml-auto mr-2 px-2 py-2 bg-sky-500 hover:bg-sky-400 text-white font-bold border-b-4 border-blue-800 hover:border-blue-600 rounded hover:scale-[1.05] duration-300"
            >
              Add to cart
            </button>

            <button
              onClick={onFavoriteAdd}
              disabled={isButtonDisabled}
              className="flex px-2 py-2 bg-rose-500 hover:bg-rose-400 text-white font-bold border-b-4 border-rose-800 hover:border-rose-600 rounded hover:scale-[1.05] duration-300"
            >
              <FontAwesomeIcon icon={faHeart} width={24} height={24} />
            </button>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};
