import Link from "next/link";

export default function AdminMenu() {
  return (
    <aside className="pl-24 pt-12">
      <div>
        <Link className="text-2xl" href={"/admin/projects"}>Projects</Link>
      </div>
      <div className="mt-4">
        <Link className="text-2xl" href={"/admin/categories"}>Categories</Link>
      </div>
    </aside>
  );
}
