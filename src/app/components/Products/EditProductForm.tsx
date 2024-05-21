"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type ProductInfo = {
  title: string;
  description: string;
  price: number;
  image: File | null;
  sizes: string[];
  colors: string[];
  materials: string[];
  tags: string[];
};

export const EditProductForm = ({ id }: any) => {
  const router = useRouter();

  const [isBtnDisabled, setIsBtnDisabled] = useState(false);
  const [product, setProduct] = useState<ProductInfo | null>();
  const [loading, setLoading] = useState(true);

  const [textareaRows, setTextareaRows] = useState(6);
  const [textareaCols, setTextareaCols] = useState(32);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`http://localhost:3000/api/products/details`, {
        method: "POST",
        body: JSON.stringify({ id }),
      });

      const data = await res.json();

      if (data.status !== 200) {
        router.push("/products/all");
      }

      setProduct(data.product);
      setLoading(false);
    };

    fetchData();
  }, [router, id]);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 768) {
        setTextareaRows(4);
        setTextareaCols(21);
      } else {
        setTextareaRows(6);
        setTextareaCols(32);
      }
    }

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const edit = async () => {
    setIsBtnDisabled(true);

    try {
      const res = await fetch("/api/products/edit", {
        method: "POST",
        body: JSON.stringify(product),
      });

      const data = await res.json();

      if (data.status !== 200) {
        throw new Error(data.message);
      }

      toast.success(data.message);
      router.push("/products/all");
    } catch (err: any) {
      toast.error(err.message);
    }

    setIsBtnDisabled(false);
  };

  const handleInputChange = (
    field: string,
    value: string | string[] | number
  ) => {
    setProduct({ ...product!, [field]: value });
  };

  return (
    <div className="flex flex-col items-center rounded-lg md:py-10 md:px-12 bg-gray-800 border-gray-700 bg-opacity-70 px-6 py-4">
      <h1 className="text-4xl md:text-5xl font-bold text-slate-200 drop-shadow-lg">
        Edit
      </h1>
      <hr className="w-32 h-1 mx-auto my-4 border-0 rounded mt-5 mb-12 bg-gradient-to-r from-slate-300 via-slate-200 to-slate-300 drop-shadow-lg" />

      <>
        <label className="text-slate-100 font-bold text-lg md:text-xl drop-shadow-lg">
          Title
        </label>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 text-slate-700 drop-shadow-lg md:w-96 w-fit"
          type="text"
          value={product?.title}
          onChange={(e) => handleInputChange("title", e.target.value)}
          placeholder="Title"
        />

        <label className="text-slate-100 font-bold text-lg md:text-xl drop-shadow-lg">
          Description
        </label>
        <textarea
          value={product?.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
          rows={textareaRows}
          cols={textareaCols}
          className="p-2 border border-gray-300 rounded-lg mb-4 text-slate-700 drop-shadow-lg md:w-96 w-fit resize-none"
          placeholder="Description"
        ></textarea>

        <label className="text-slate-100 font-bold text-lg md:text-xl drop-shadow-lg">
          Price
        </label>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 text-slate-700 drop-shadow-lg md:w-96 w-fit"
          type="number"
          min={0.1}
          step={0.1}
          value={product?.price}
          onChange={(e) => handleInputChange("price", Number(e.target.value))}
          placeholder="Price"
        />

        <label className="text-slate-100 font-bold text-lg md:text-xl drop-shadow-lg">
          Sizes
        </label>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 text-slate-700 drop-shadow-lg md:w-96 w-fit"
          type="text"
          value={product?.sizes}
          onChange={(e) =>
            handleInputChange("sizes", e.target.value.split(","))
          }
          placeholder="Use separator ,"
        />

        <label className="text-slate-100 font-bold text-lg md:text-xl drop-shadow-lg">
          Colors
        </label>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 text-slate-700 drop-shadow-lg md:w-96 w-fit"
          type="text"
          value={product?.colors}
          onChange={(e) =>
            handleInputChange("colors", e.target.value.split(","))
          }
          placeholder="Use separator ,"
        />

        <label className="text-slate-100 font-bold text-lg md:text-xl drop-shadow-lg">
          Materials
        </label>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 text-slate-700 drop-shadow-lg md:w-96 w-fit"
          type="text"
          value={product?.materials}
          onChange={(e) =>
            handleInputChange("materials", e.target.value.split(","))
          }
          placeholder="Use separator ,"
        />

        <label className="text-slate-100 font-bold text-lg md:text-xl drop-shadow-lg">
          Tags
        </label>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 text-slate-700 drop-shadow-lg md:w-96 w-fit"
          type="text"
          value={product?.tags}
          onChange={(e) => handleInputChange("tags", e.target.value.split(","))}
          placeholder="Use separator ,"
        />
      </>

      <button
        onClick={edit}
        disabled={isBtnDisabled}
        className="bg-gradient-to-r from-slate-300 via-slate-100 to-slate-300 bg-[position:_0%_0%] hover:bg-[position:_100%_100%] bg-[size:_200%] transition-all duration-500 text-gray-900 font-bold py-2 px-4 rounded mt-6 mb-3 disabled:opacity-25"
      >
        Save Changes
      </button>
    </div>
  );
};
