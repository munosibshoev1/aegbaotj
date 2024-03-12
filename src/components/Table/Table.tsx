// import {
//   useReactTable,
//   getCoreRowModel,
//   flexRender,
// } from "@tanstack/react-table";
// import React from "react";
// // import { data } from "@/app/data/projects";

// export default function Table() {
//   // {
//   //   id: 1,
//   //   title:
//   //     "Cultivating of New Sort of Organic Potato Seeds for Producing Chips",
//   //   subtitle:
//   //     "Mountain Food Products, LLC (MFP), a Tajik company incorporated in July of 2013, is a for – profit social enterprise, with a mission to benefit local economies, alleviate poverty and create sustainable loca employment.The LLC MFP has been granted subsidy for renting one hectare of land to cultivate raw potato for processing.",
//   //   image: Project1,
//   //   district: "Rushon",
//   // },

//   const projects = React.useMemo(() => data, []);

//   /** @type import("tanstack/react-table").ColumnDef<any> */
//   const columns = [
//     {
//       header: "ID",
//       accessorKey: "id",
//       footer: "ID",
//     },
//     {
//       header: "TITLE",
//       accessorKey: "title",
//       footer: "TITLE",
//     },
//     {
//       header: "SUBTITLE",
//       accessorKey: "subtitle",
//       footer: "SUBTITLE",
//     },
//     {
//       header: "DISTRICT",
//       accessorKey: "district",
//       footer: "DISTRICT",
//     },
//   ];

//   const table = useReactTable({
//     projects,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//   });

//   return (
//     <div>
//       <table>
//         {table.getHeaderGroups().map((headerGroup) => (
//           <tr key={headerGroup.id}>
//             {headerGroup.headers.map((header) => (
//               <th key={header.id}>
//                 {flexRender(
//                   header.column.columnDef.header,
//                   header.getContext()
//                 )}
//               </th>
//             ))}
//           </tr>
//         ))}
//         <tbody>
//           {table.getRowModel().rows.map((row) => (
//             <tr key={row.id}>
//               {row.getVisibleCells().map((cell) => (
//                 <td key={cell.id}>
//                   {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                 </td>
//               ))}
//             </tr>
//           ))}
//           <tr>
//             <td>1</td>
//           </tr>
//         </tbody>
//         <tfoot>
//           <tr>
//             <td>footer</td>
//           </tr>
//         </tfoot>
//       </table>
//     </div>
//   );
// }
