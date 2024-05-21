"use client";

import { Loading } from "@/app/components/Loading";
import { CreateProductForm } from "@/app/components/Products/CreateProductForm";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function CreateProduct() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/products/all");
    },
  });

  return (
    <div className="flex items-center justify-center">
      {!session?.user ? <Loading /> : <CreateProductForm />}
    </div>
  );
}
