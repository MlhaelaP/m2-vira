"use client";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CheckoutForm } from "@/app/components/Cart/CheckoutForm";

const Shipping = 8.99;

type UserData = {
  fullName: string;
  cardNumber: string;
  expireDate: string;
  CVC: number;
  fullAddress: string;
};

export default function Checkout() {
  const router = useRouter();

  const [isDisabled, setIsDisabled] = useState(true);
  const [data, setData] = useState<UserData>({
    cardNumber: "",
    CVC: 0,
    expireDate: "",
    fullAddress: "",
    fullName: "",
  });

  const handleOrder = async () => {
    setIsDisabled(true);

    try {
      const res = await fetch("/api/cart/order", {
        method: "POST",
        body: JSON.stringify({ data: data }),
      });

      const result = await res.json();

      if (result.status !== 200) {
        throw new Error(result.message);
      }

      toast.success(result.message);
      router.push("/profile");
    } catch (err: any) {
      toast.error(err.message);
      router.push("/cart/mine");
    }
  };

  return (
    <div className="px-4 pt-8 text-slate-200 font-bold flex items-center flex-col">
      <p className="text-2xl md:text-5xl mb-2">Payment Details</p>
      <p className="text-slate-700">
        Complete your order by providing your payment details.
      </p>
      <div>
        <CheckoutForm
          setData={setData}
          data={data}
          setIsDisabled={setIsDisabled}
        />

        <div className="mt-6 border-t border-b py-2">
          <div className="flex items-center justify-between">
            <p className="text-sm">Subtotal</p>
            <p className="font-semibold">${0}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm">Shipping</p>
            <p className="font-semibold">${Shipping}</p>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm">Total</p>
          <p className="text-2xl font-semibold">${(0 + Shipping).toFixed(2)}</p>
        </div>

        <button
          disabled={isDisabled}
          onClick={handleOrder}
          className="mt-4 mb-8 w-full rounded-md px-6 py-3 bg-gradient-to-r from-slate-950 via-slate-800 to-slate-950 bg-[position:_0%_0%] hover:bg-[position:_100%_100%] bg-[size:_200%] transition-all duration-500 text-slate-200 disabled:opacity-50"
        >
          Place Order
        </button>
      </div>
    </div>
  );
}
