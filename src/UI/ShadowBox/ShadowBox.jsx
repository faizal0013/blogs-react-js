const ShadowBox = ({ children }) => (
  <div className="w-[30rem] flex flex-col gap-y-14 border-black items-center p-6 rounded-2xl shadow-2xl shadow-zinc-600 ">
    {children}
  </div>
);

export default ShadowBox;
