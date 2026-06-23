"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface StoreFilterProps {
  stores: { id: string; name: string }[];
}

export function StoreFilter({ stores }: StoreFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentStoreId = searchParams.get("storeId") || "all";

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all") {
      params.delete("storeId");
    } else {
      params.set("storeId", value);
    }
    router.push(`/dashboard?${params.toString()}`);
  };

  return (
    <select
      value={currentStoreId}
      onChange={handleChange}
      className="bg-transparent border-none text-sm font-bold text-slate-800 outline-none cursor-pointer focus:ring-0"
    >
      <option value="all">Semua Vibe</option>
      {stores.map((store) => (
        <option key={store.id} value={store.id}>
          {store.name}
        </option>
      ))}
    </select>
  );
}
