import React from "react";
import { Column } from "./types";

type TableProps<T> = {
  columns: Column<T>[];
  children: React.ReactNode;
  includeActions?: boolean;
};

export function Table<T>({ columns, children, includeActions }: TableProps<T>) {
  return (
    <table className="w-full">
      <thead>
        <tr className="border-b-2 border-pink-500/50">
          {columns.map((col, i) => (
            <th key={i} className="px-4 py-3 text-left text-pink-400 font-semibold text-sm tracking-wider bg-[#1f1f3a]">
              {col.label}
            </th>
          ))}
          {includeActions && (
            <th className="px-4 py-3 text-pink-400 font-semibold text-sm tracking-wider bg-[#1f1f3a] text-right w-40">Acciones</th>
          )}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
}
