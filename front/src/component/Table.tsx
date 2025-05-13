export const Table = ({
  columns,
  columnsNames,
  rows,
  actions,
}: {
  columns: string[];
  columnsNames: { key: string; label: string }[];
  rows: { [key: string]: string }[];
  actions?: (row: { [key: string]: string }) => React.ReactNode;
}) => {
  return (
    <table className="min-w-full divide-y divide-gray-300">
      <thead>
        <tr>
          {columns.map((column) => (
            <th
              key={column}
              className="px-4 py-2 text-left text-sm font-medium text-gray-500"
            >
              {columnsNames.find((col) => col.key === column)?.label || column}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {rows.map((row) => (
          <tr key={row.id}>
            {columns.map((column) => (
              <td key={column} className="px-4 py-2 text-sm">
                {row[column]}
              </td>
            ))}
            {actions && <td className="px-4 py-2 text-sm">{actions(row)}</td>}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
