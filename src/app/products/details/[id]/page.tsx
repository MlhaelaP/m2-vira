import Image from "next/image";
import { redirect } from "next/navigation";
import { config } from "@fortawesome/fontawesome-svg-core";
import { getImage } from "@/helpers/firebaseStorage";
import { ProductDetailsOptions } from "@/app/components/Products/ProductDetailsOptions";

config.autoAddCss = false;

export default async function ProductDetails({ params }: any) {
  const res = await fetch(`http://localhost:3000/api/products/details`, {
    method: "POST",
    body: JSON.stringify({ id: params.id }),
    next: { revalidate: 5 },
  });

  const data = await res.json();

  if (data.status !== 200) {
    redirect("/products/all");
  }

  const image = await getImage(data.product.title);

  return (
    <>
      <section className="text-gray-700 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto cursor-default">
          <div className="lg:w-4/5 mx-auto flex flex-wrap bg-white bg-opacity-25 rounded p-5">
            <Image
              priority
              width={2048}
              height={2048}
              alt="Product Image"
              className="lg:w-1/2 w-full object-cover object-center rounded hover:scale-[1.03] duration-300"
              src={image}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm text-slate-800 tracking-widest">
                {data.product?.tags.join("/")}
              </h2>

              <h1 className="text-slate-200 text-3xl mb-1 font-bold">
                {data.product?.title}
              </h1>

              <p className="leading-relaxed text-slate-800">
                {data.product?.description}
              </p>

              <ProductDetailsOptions product={data.product} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
