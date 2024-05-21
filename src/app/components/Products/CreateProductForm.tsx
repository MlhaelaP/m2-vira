"use client";

import { addImage } from "@/helpers/firebaseStorage";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type ProductInfo = {
  title: string;
  description: string;
  price: number;
  image: File | null;
  sizes: string;
  colors: string;
  materials: string;
  tags: string;
};

const DOMAIN = "http://localhost:3000";

export const CreateProductForm = () => {
  const router = useRouter();

  const [isDisabled, setIsDisabled] = useState(true);
  const [product, setProduct] = useState<ProductInfo>({
    title: "",
    description: "",
    price: 0.1,
    image: null,
    materials: "",
    sizes: "",
    colors: "",
    tags: "",
  });

  const [textareaRows, setTextareaRows] = useState(6);
  const [textareaCols, setTextareaCols] = useState(32);

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

  useEffect(() => {
    if (
      product.title.length > 3 &&
      product.description.length > 6 &&
      product.price !== 0.1 &&
      product.image &&
      product.materials &&
      product.sizes &&
      product.colors &&
      product.tags
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [product]);

  const create = async () => {
    try {
      const res = await fetch(`${DOMAIN}/api/products/create`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      const data = await res.json();

      if (data.status !== 200) {
        throw new Error(data.message);
      }

      await addImage(data.product.title, product.image!);

      toast.success(data.message);
      router.push("/products/all");
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setProduct({ ...product, image: e.target.files[0] });
    }
  };
  return (
    <div className="flex flex-col items-center rounded-lg md:py-14 md:px-24 bg-gray-800 border-gray-700 bg-opacity-70 my-4 px-1 py-6">
      <h1 className="text-4xl md:text-5xl font-bold text-slate-200 drop-shadow-lg">
        Add new
      </h1>
      <hr className="w-48 h-1 mx-auto my-4 border-0 rounded mt-5 mb-12 bg-gradient-to-r from-slate-300 via-slate-200 to-slate-300 drop-shadow-lg" />

      <label className="text-slate-100 font-bold text-lg md:text-xl drop-shadow-lg">
        Image
      </label>
      <input
        className="block mb-5 text-xs md:text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-white md:w-96 w-fit"
        type="file"
        accept="image/png"
        onChange={(e) => handleImageChange(e)}
      />

      <label className="text-slate-100 font-bold text-lg md:text-xl drop-shadow-lg">
        Title
      </label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 text-slate-700 drop-shadow-lg md:w-96 w-fit"
        type="text"
        value={product.title}
        onChange={(e) => setProduct({ ...product, title: e.target.value })}
        placeholder="Title"
      />

      <label className="text-slate-100 font-bold text-lg md:text-xl drop-shadow-lg">
        Description
      </label>
      <textarea
        value={product.description}
        onChange={(e) =>
          setProduct({ ...product, description: e.target.value })
        }
        rows={textareaRows}
        cols={textareaCols}
        className="p-2 border border-gray-300 rounded-lg mb-4 text-slate-700 drop-shadow-lg resize-none md:w-96 w-fit"
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
        value={product.price}
        onChange={(e) =>
          setProduct({ ...product, price: Number(e.target.value) })
        }
        placeholder="Price"
      />

      <label className="text-slate-100 font-bold text-lg md:text-xl drop-shadow-lg">
        Sizes
      </label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 text-slate-700 drop-shadow-lg md:w-96 w-fit"
        type="text"
        value={product.sizes}
        onChange={(e) => setProduct({ ...product, sizes: e.target.value })}
        placeholder="Use separator ,"
      />

      <label className="text-slate-100 font-bold text-lg md:text-xl drop-shadow-lg">
        Colors
      </label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 text-slate-700 drop-shadow-lg md:w-96 w-fit"
        type="text"
        value={product.colors}
        onChange={(e) => setProduct({ ...product, colors: e.target.value })}
        placeholder="Use separator ,"
      />

      <label className="text-slate-100 font-bold text-lg md:text-xl drop-shadow-lg">
        Materials
      </label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 text-slate-700 drop-shadow-lg md:w-96 w-fit"
        type="text"
        value={product.materials}
        onChange={(e) => setProduct({ ...product, materials: e.target.value })}
        placeholder="Use separator ,"
      />

      <label className="text-slate-100 font-bold text-lg md:text-xl drop-shadow-lg">
        Tags
      </label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 text-slate-700 drop-shadow-lg md:w-96 w-fit"
        type="text"
        value={product.tags}
        onChange={(e) => setProduct({ ...product, tags: e.target.value })}
        placeholder="Use separator ,"
      />

      <button
        onClick={create}
        className="bg-gradient-to-r from-slate-300 via-slate-100 to-slate-300 bg-[position:_0%_0%] hover:bg-[position:_100%_100%] bg-[size:_200%] transition-all duration-500 text-gray-900 font-bold py-2 px-4 rounded mt-6 mb-3 disabled:opacity-25"
        disabled={isDisabled}
      >
        Create
      </button>
    </div>
  );
};
