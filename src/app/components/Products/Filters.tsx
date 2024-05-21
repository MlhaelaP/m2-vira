import { faBan, faMars, faVenus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Filters = ({ setGender, setSize, setSearchTerm }: any) => {
  return (
    <div className="bg-white bg-opacity-75 rounded-xl px-10 py-6">
      <div className="flex flex-col items-center justify-center text-slate-800 font-bold">
        <p className="text-xl mb-2">Gender</p>

        <div
          className="flex flex-row"
          onChange={(e: any) => setGender(e.target.value)}
        >
          <button
            onClick={() => setGender("all")}
            className="flex px-2 py-2 bg-red-700 hover:bg-red-600 text-white font-bold border-b-4 border-red-900 hover:border-red-700 rounded hover:scale-[1.05] duration-300 mx-2"
          >
            <FontAwesomeIcon icon={faBan} width={24} height={24} />
          </button>
          <button
            onClick={() => setGender("women")}
            className="flex px-2 py-2 bg-rose-500 hover:bg-rose-400 text-white font-bold border-b-4 border-rose-800 hover:border-rose-600 rounded hover:scale-[1.05] duration-300 mx-2"
          >
            <FontAwesomeIcon icon={faVenus} width={24} height={24} />
          </button>
          <button
            onClick={() => setGender("men")}
            className="flex px-2 py-2 bg-blue-500 hover:bg-blue-400 text-white font-bold border-b-4 border-blue-800 hover:border-blue-600 rounded hover:scale-[1.05] duration-300 mx-2"
          >
            <FontAwesomeIcon icon={faMars} width={24} height={24} />
          </button>
        </div>
      </div>

      <hr className="w-40 h-1 mx-auto border-0 rounded bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 drop-shadow-lg my-5" />

      <div className="flex flex-col items-center justify-center text-slate-800 font-bold">
        <p className="text-xl mb-2">Size</p>

        <div className="flex flex-row flex-wrap">
          <select
            onChange={(e) => setSize(e.target.value)}
            className="block w-full text-sm text-white rounded-lg bg-slate-800 font-bold p-1 cursor-pointer"
          >
            <option value="all">All</option>
            <option value="XS">XS</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="XXL">XXL</option>
          </select>
        </div>
      </div>

      <div className="mt-5">
        <input
          onChange={(e: any) => setSearchTerm(e.target.value)}
          type="search"
          id="search"
          className="block w-full px-5 py-3 text-sm text-slate-200 rounded-lg focus:outline-none bg-slate-800"
          placeholder="Search product..."
          required
        />
      </div>
    </div>
  );
};
