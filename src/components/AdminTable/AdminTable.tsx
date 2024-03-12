import TableBody from "../TableBody/TableBody";
import TableHead from "../TableHead/TableHead";

export default function AdminTable() {
  return (
    <div className="mt-5 bg-white p-5">
      <TableHead />
      <TableBody />
    </div>
  );
}
