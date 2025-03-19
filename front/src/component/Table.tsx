
export const Table = ({
  columns,
  rows
}: {
  columns: string[]
  rows: { [key: string]: string }[]
}) => {
  return (
    <table className="min-w-full divide-y divide-gray-300">
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column} className="px-4 py-2 text-left text-sm font-medium text-gray-500">
              {column}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {
          rows.map((row) => (
            <tr key={row.id}>
              {columns.map((column) => (
                <td key={column} className="px-4 py-2 text-sm">
                  {row[column]}
                </td>
              ))}
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}