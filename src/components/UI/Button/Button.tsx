export default function Button({ children }: { children: string }) {
  return (
    <button className="bg-[#C30F08] inline-block text-white px-[35px] py-[15px] border-none outline-none">
      {children}
    </button>
  );
}
