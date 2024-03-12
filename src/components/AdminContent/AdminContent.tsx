import Link from "next/link";
import AdminTable from "../AdminTable/AdminTable";

export default function AdminContent() {
  return (
    <main className="bg-[#D3D3D3] pt-12 pr-24 pl-24">
      <div className="flex items-center justify-end mb-3">
        <Link
          href={"/admin/create"}
          className="bg-[#C30F08] inline-block text-white px-[35px] py-[15px] border-none outline-none rounded-[5px]"
        >
          New Project
        </Link>
      </div>
      <AdminTable />
    </main>
  );
}
