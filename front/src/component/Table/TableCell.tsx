import React from "react";

export const TableCell = ({ children }: { children: React.ReactNode }) => (
  <td className="border p-2">{children}</td>
);
