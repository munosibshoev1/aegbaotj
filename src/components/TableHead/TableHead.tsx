"use client";
import { selectFilter, seacrhFilter } from "@/redux/features/projectsSlice";
import { useAppDispatch } from "@/redux/hooks";

export default function TableHead() {
  const dispatch = useAppDispatch();
  const handleSearchFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(seacrhFilter(event.target.value));
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-5">
        <p>show</p>
        <select className="border border-[#E0E7ED] px-3 py-2">
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
        </select>
        <p>entries</p>
      </div>
      <div>
        <input
          onChange={(event) => handleSearchFilter(event)}
          className="w-[340px] h-[50px] p-3 rounded-[8px] border border-[#E0E7ED]"
          type="text"
          placeholder="Search project, district, or etc."
        />
      </div>
    </div>
  );
}
