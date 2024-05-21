"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { config } from "@fortawesome/fontawesome-svg-core";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Order } from "../components/Profile/Order";
import { Loading } from "../components/Loading";

config.autoAddCss = false;

export default function ProfilePage() {
  const router = useRouter();

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/");
    },
  });

  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    fetch(`http://localhost:3000/api/orders`, {
      method: "POST",
      body: JSON.stringify({ email: session?.user?.email }),
    })
      .then((raw) => raw.json())
      .then((data) => {
        setOrders(data.orders);
      });
  }, [session, router]);

  return (
    <>
      {!session?.user ? (
        <Loading />
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 antialiased">
          <div className="container mx-auto">
            <div className="pb-3 relative shadow-2xl rounded-lg w-5/6 md:w-5/6 lg:w-4/6 xl:w-3/6 mx-auto bg-gradient-to-r from-slate-950 via-slate-800 to-slate-950 bg-[position:_0%_0%] hover:bg-[position:_100%_100%] bg-[size:_200%] transition-all duration-500">
              <div className="flex justify-center">
                <Image
                  src={session?.user?.image ?? "/avatar.png"}
                  alt="Avatar"
                  priority
                  className="rounded-full mx-auto absolute -top-20 w-32 h-32 shadow-lg border-4 border-white transition duration-200 transform hover:scale-110"
                  height={120}
                  width={120}
                />
              </div>

              <div className="mt-16">
                <div className="flex flex-row justify-center items-center font-bold text-3xl text-slate-300 mb-2">
                  <h1 className="mx-1 text-center">{session?.user?.name}</h1>
                </div>

                <p className="text-center text-sm text-slate-400">
                  {session?.user?.email}
                </p>

                <hr className="w-48 h-1 mx-auto my-4 border-0 rounded md:mt-5 md:mb-6 bg-gradient-to-r from-slate-400 via-slate-300 to-slate-400 drop-shadow-lg" />

                <div className="text-center mt-5">
                  <h1 className="text-2xl text-slate-300">Orders</h1>

                  {orders.length === 0 ? (
                    <div className="text-red-500 flex justify-center items-center">
                      <FontAwesomeIcon
                        icon={faCircleXmark}
                        width={16}
                        height={16}
                      />
                      <p className="ml-1 text-slate-200">No orders yet!</p>
                    </div>
                  ) : (
                    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                      <div className="inline-block max-w-fit shadow rounded-lg overflow-hidden">
                        <table className="min-w-full leading-normal">
                          <thead>
                            <tr>
                              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Name
                              </th>
                              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Price
                              </th>
                              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Size
                              </th>
                              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Color
                              </th>
                            </tr>
                          </thead>
                          {orders.map((o: any) => (
                            <Order key={o._id} order={o} />
                          ))}
                        </table>
                      </div>
                    </div>
                  )}
                </div>

                <div className="my-5 px-6">
                  <button
                    onClick={() => signOut()}
                    className="w-full rounded-lg text-center leading-6 px-6 py-3 bg-gradient-to-r from-rose-700 via-rose-500 to-rose-700 bg-[position:_0%_0%] hover:bg-[position:_100%_100%] bg-[size:_200%] transition-all duration-500 text-slate-200 hover:text-white font-bold"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
