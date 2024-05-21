import Link from "next/link";
import { Section } from "../components/Privacy/Section";

export default function Policy() {
  return (
    <div className="text-slate-800 min-h-screen bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 flex flex-col justify-center items-center my-4">
      <div className="flex flex-col justify-center items-center bg-white bg-opacity-75 px-3 py-5 rounded-xl mx-2">
        <h1 className="text-3xl md:text-5xl font-bold mt-3">Privacy Policy</h1>
        <hr className="w-48 md:w-72 h-1 border-0 rounded mt-5 mb-12 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 drop-shadow-lg" />

        <div className="prose max-w-none flex flex-col justify-center items-center break-words">
          <Section
            title="Collected Information"
            text="We only collect information about you if we have a reason to do so.
            For example, to provide our services or to improve our services."
          />

          <Section
            title="Using Information"
            text="We use the information we collect to provide, maintain, and improve
            our services, as well as keeping our services secure."
          />

          <Section
            title="Sharing Information"
            text="We do not sell, trade, or otherwise transfer your personal
            information to outside parties."
          />

          <Section
            title="Security"
            text="We value your trust in providing us your personal information, thus
            we are striving to use commercially acceptable means of protecting
            it."
            additionalText="However, no method of transmission over the internet or electronic
            storage is 100% secure and reliable, and we cannot guarantee
            absolute security."
          />

          <Section
            title="Privacy Policy Changes"
            text="We reserve the right to update or change our privacy policy at any
            time. Any changes will be posted here."
          />

          <Section
            title="Contact Us"
            text={
              "If you have any questions or suggestions about our privacy policy, do not hesitate to contact us."
            }
          />

          <p className="mt-8 font-bold">Last Updated: 11/23/2023</p>
        </div>
      </div>
    </div>
  );
}
