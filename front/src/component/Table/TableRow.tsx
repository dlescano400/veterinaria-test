import React from "react";
import { Column } from "./types";

type TableRowProps<T> = {
  data: T;
  columns: Column<T>[];
  actions?: React.ReactNode;
  index?: number;
};

export function TableRow<T>({ data, columns, actions, index = 0 }: TableRowProps<T>) {
  return (
    <tr className={`border-b border-pink-500/10 transition-colors duration-200 ${
      index % 2 === 0 ? 'bg-[#1e1e38]' : 'bg-[#252545]'
    } hover:bg-pink-500/10`}>
      {columns.map((col, i) => (
        <td key={i} className="px-4 py-3 text-gray-300">
          {col.render ? col.render(data) : String(data[col.key])}
        </td>
      ))}
      {actions && <td className="px-4 py-3 text-right">{actions}</td>}
    </tr>
  );
}
