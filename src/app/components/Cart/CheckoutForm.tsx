import { useEffect } from "react";
import {
  faAddressCard,
  faCreditCard,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { config } from "@fortawesome/fontawesome-svg-core";
import { validateCardData } from "@/helpers/passwordValidator";

config.autoAddCss = false;

export const CheckoutForm = ({ setData, data, setIsDisabled }: any) => {
  useEffect(() => {
    if (validateCardData(data)) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [data, setIsDisabled]);

  return (
    <div>
      <label className="mt-4 mb-2 block text-sm">Card Holder</label>
      <div className="relative">
        <input
          onChange={(e) => setData({ ...data, fullName: e.target.value })}
          type="text"
          id="card-holder"
          name="card-holder"
          className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500 text-slate-800"
          placeholder="Your full name"
        />
        <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3 text-slate-800">
          <FontAwesomeIcon icon={faAddressCard} width={16} height={16} />
        </div>
      </div>
      <label className="mt-4 mb-2 block text-sm">Card Details</label>
      <div className="flex">
        <div className="relative w-7/12 flex-shrink-0">
          <input
            onChange={(e) => setData({ ...data, cardNumber: e.target.value })}
            type="text"
            name="card-no"
            className="w-full rounded-md border border-gray-200 px-2 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500 text-slate-800"
            placeholder="xxxx-xxxx-xxxx-xxxx"
          />
          <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3 text-slate-800">
            <FontAwesomeIcon icon={faCreditCard} width={16} height={16} />
          </div>
        </div>
        <input
          onChange={(e) => setData({ ...data, expireDate: e.target.value })}
          type="text"
          name="credit-expiry"
          className="w-full rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500 text-slate-800"
          placeholder="MM/YY"
        />
        <input
          onChange={(e) => setData({ ...data, CVC: Number(e.target.value) })}
          type="number"
          name="credit-cvc"
          className="w-1/6 flex-shrink-0 rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500 text-slate-800"
          placeholder="CVC"
        />
      </div>
      <label className="mt-4 mb-2 block text-sm">Billing Address</label>
      <div className="flex flex-col sm:flex-row">
        <div className="relative flex-shrink-0 w-full">
          <input
            onChange={(e) => setData({ ...data, fullAddress: e.target.value })}
            type="text"
            id="billing-address"
            name="billing-address"
            className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500 text-slate-800"
            placeholder="Full address"
          />
          <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3 text-slate-800">
            <FontAwesomeIcon icon={faLocationDot} width={16} height={16} />
          </div>
        </div>
      </div>
    </div>
  );
};
