"use client";

import { Filters } from "./Filters";
import { config } from "@fortawesome/fontawesome-svg-core";
import { Product } from "./Product";
import { useEffect, useState } from "react";

config.autoAddCss = false;

type ProductInfo = {
  _id: string;
  title: string;
  price: number;
  image?: string;
  tags: string[];
  sizes: string[];
};

export const ProductsDisplay = ({ products }: { products: ProductInfo[] }) => {
  const [filteredProducts, setFilteredProducts] =
    useState<ProductInfo[]>(products);
  const [gender, setGender] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [size, setSize] = useState("all");

  useEffect(() => {
    let filtered = products.filter((product) =>
      product.title
        .toLowerCase()
        .includes(searchTerm.replace(/[^a-zA-Z0-9\s]/g, ""))
    );

    if (gender !== "all") {
      filtered = filtered.filter((product) => product.tags.includes(gender));
    }

    if (size !== "all") {
      filtered = filtered.filter((product) => product.sizes.includes(size));
    }

    setFilteredProducts(filtered);
  }, [searchTerm, gender, products, size]);
  return (
    <>
      <Filters
        setGender={setGender}
        setSize={setSize}
        setSearchTerm={setSearchTerm}
      />

      {filteredProducts.length === 0 ? (
        <div className="mt-16">
          <p className="font-bold text-red-500 text-2xl">
            No products found that match your search!
          </p>
        </div>
      ) : (
        <div className="flex flex-wrap items-center justify-center my-8">
          {filteredProducts.map((p: ProductInfo) => (
            <Product key={p._id} product={p} />
          ))}
        </div>
      )}
    </>
  );
};
