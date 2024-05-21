"use client";

import { EditProductForm } from "@/app/components/Products/EditProductForm";
import { Loading } from "@/app/components/Loading";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function EditProduct({ params }: any) {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/products/all");
    },
  });

  return (
    <div className="flex items-center justify-center my-6">
      {!session?.user ? <Loading /> : <EditProductForm id={params.id} />}
    </div>
  );
}
