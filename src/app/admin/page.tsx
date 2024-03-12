import AdminMenu from "@/components/AdminMenu/AdminMenu";
import AdminContent from "@/components/AdminContent/AdminContent";

export default function Admin() {
  return (
    <div className="admin-container">
      <AdminMenu />
      <AdminContent />
    </div>
  );
}
