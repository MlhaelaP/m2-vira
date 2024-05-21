export const Loading = () => {
  return (
    <div className="flex flex-row items-center justify-center text-slate-200 mt-6 animate-pulse">
      <div
        className="inline-block md:h-10 md:w-10 h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] mr-3"
        role="status"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"></span>
      </div>

      <p className="uppercase text-3xl md:text-5xl">Loading</p>
    </div>
  );
};
