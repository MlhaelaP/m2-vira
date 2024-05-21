"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faHouse,
  faHeart,
  faBagShopping,
  faShirt,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { config } from "@fortawesome/fontawesome-svg-core";
import { signIn, useSession } from "next-auth/react";

config.autoAddCss = false;

export const NavBar = () => {
  const { status } = useSession();

  return (
    <nav className="p-4 bg-gradient-to-r from-slate-950 via-slate-800 to-slate-950 bg-[position:_0%_0%] hover:bg-[position:_100%_100%] bg-[size:_200%] transition-all duration-500">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="left-links">
          <ul className="flex flex-row">
            <li className="mx-3 text-slate-200 hover:text-cyan-500">
              <Link
                href="/"
                className="flex flex-col justify-center items-center"
              >
                <FontAwesomeIcon icon={faHouse} width="24" height="24" />
                <p className="font-semibold">Home</p>
              </Link>
            </li>
            <li className="mx-3 text-slate-200 hover:text-violet-500">
              <Link
                href="/products/all"
                className="flex flex-col justify-center items-center"
              >
                <FontAwesomeIcon icon={faShirt} width="24" height="24" />
                <p className="font-semibold">Fashion</p>
              </Link>
            </li>
          </ul>
        </div>
        {status === "loading" ? (
          <></>
        ) : (
          <div className="right-links mt-4 md:mt-0">
            <ul className="flex flex-row">
              {status === "authenticated" ? (
                <>
                  <li className="mx-3 text-slate-200 hover:text-sky-500">
                    <Link
                      href="/cart/mine"
                      className="flex flex-col justify-center items-center"
                    >
                      <FontAwesomeIcon
                        icon={faBagShopping}
                        width="24"
                        height="24"
                      />
                      <p className="font-semibold">Cart</p>
                    </Link>
                  </li>
                  <li className="mx-3 text-slate-200 hover:text-red-500">
                    <Link
                      href="/favorites"
                      className="flex flex-col justify-center items-center"
                    >
                      <FontAwesomeIcon icon={faHeart} width="24" height="24" />
                      <p className="font-semibold">Favorites</p>
                    </Link>
                  </li>
                  <li className="mx-3 text-slate-200 hover:text-emerald-500">
                    <Link
                      href="/profile"
                      className="flex flex-col justify-center items-center"
                    >
                      <FontAwesomeIcon icon={faUser} width="24" height="24" />
                      <p className="font-semibold">Profile</p>
                    </Link>
                  </li>
                </>
              ) : (
                <li className="mx-3 text-slate-200 hover:text-emerald-500">
                  <button
                    onClick={() => signIn("google")}
                    className="flex flex-col justify-center items-center"
                  >
                    <FontAwesomeIcon icon={faUserPlus} width="28" height="28" />
                    <p className="font-semibold">Sign In</p>
                  </button>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};
