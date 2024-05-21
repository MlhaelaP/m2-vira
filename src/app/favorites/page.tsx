"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getImage } from "@/helpers/firebaseStorage";
import { FavoriteProduct } from "../components/Favorites/FavoriteProduct";
import { Loading } from "@/app/components/Loading";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

type FavoriteProductInfo = {
  _id: string;
  title: string;
  price: number;
  image?: string;
};

export default function Favorites() {
  const router = useRouter();

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/");
    },
  });

  const [favorites, setFavorites] = useState<FavoriteProductInfo[] | null>();
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`http://localhost:3000/api/favorites/all`, {
        method: "POST",
        body: JSON.stringify({ email: session?.user?.email }),
      });

      const data = await res.json();

      if (data.products.length !== 0) {
        await Promise.all(
          data.products.map(async (product: FavoriteProductInfo) => {
            product.image = await getImage(product.title);
          })
        );
      }

      setFavorites(data.products);
    };

    fetchData();
  }, [router, session]);

  const removeFavorite = async (prodId: any) => {
    setDisabled(true);

    const raw = await fetch(`http://localhost:3000/api/favorites/remove`, {
      method: "POST",
      body: JSON.stringify({ _id: prodId, email: session!.user?.email }),
    });
    const data = await raw.json();

    if (data.status !== 200) {
      toast.error(data.message);
    } else {
      toast.success(data.message);
      setFavorites(favorites!.filter((fav) => fav._id !== prodId));
    }

    setDisabled(false);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center my-8">
        <p className="text-2xl md:text-5xl uppercase text-slate-200 font-bold">
          Your Favorites
        </p>

        <hr className="h-1 w-96 mx-auto my-4 border-0 rounded md:mt-5 md:mb-6 bg-gradient-to-r from-slate-300 via-slate-200 to-slate-300 drop-shadow-lg" />

        {!favorites || !session?.user ? (
          <Loading />
        ) : favorites.length > 0 ? (
          <div className="flex flex-wrap items-center justify-center my-8">
            {favorites.map((f) => (
              <FavoriteProduct
                key={f._id}
                product={f}
                removeFavorite={removeFavorite}
                disabled={disabled}
              />
            ))}
          </div>
        ) : (
          <div className="mt-16">
            <p className="font-bold text-red-500 text-2xl text-center">
              You have no favorites added!
            </p>
          </div>
        )}
      </div>
    </>
  );
}
