import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserTie,
  faArrowTrendUp,
  faCartShopping,
  faChartSimple,
} from "@fortawesome/free-solid-svg-icons";
import { config } from "@fortawesome/fontawesome-svg-core";
import Image from "next/image";
import { InfoCard } from "../components/AboutUs/InfoCard";
config.autoAddCss = false;

export default function AboutUs() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500">
      <section className="py-10 font-poppins">
        <div className="max-w-6xl py-4 mx-auto lg:py-6 md:px-6">
          <div className="flex flex-wrap text-slate-200">
            <div className="w-full px-4 mb-10 lg:w-1/2 lg:mb-0 ">
              <div className="lg:max-w-md">
                <div className="px-4 pl-4 mb-6 border-l-4 border-slate-200">
                  <span className="text-sm uppercase">Who are we?</span>
                  <h1 className="mt-2 text-3xl font-black md:text-5xl">
                    m2vira
                  </h1>
                </div>
                <p className="px-4 mb-10 text-base leading-7">
                  {
                    "Welcome to m2vira, where fashion meets individuality. At m2vira, we believe that clothing is more than just a way to cover the body it's a statement, an expression of your unique self. Our brand is built on the foundation of celebrating diversity, empowering confidence, and curating styles that resonate with the modern trendsetter."
                  }
                </p>
                <div className="flex flex-wrap items-center">
                  <InfoCard
                    icon={faUserTie}
                    value="2000+"
                    text="Daily Customers"
                  />

                  <InfoCard
                    icon={faArrowTrendUp}
                    value="40,000+"
                    text="Products Sold"
                  />

                  <InfoCard
                    icon={faCartShopping}
                    value="1000+"
                    text="Daily Orders"
                  />

                  <InfoCard
                    icon={faChartSimple}
                    value="200+"
                    text="Employees"
                  />
                </div>
              </div>
            </div>
            <div className="w-full px-4 mb-10 lg:w-1/2 lg:mb-0">
              <Image
                src="/images/aboutus-image.jpg"
                width={1024}
                height={1024}
                className="relative z-40 object-cover w-full h-full rounded-lg"
                alt="Image"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
