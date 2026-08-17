import type { ReactNode } from 'react';

export interface TableColumn<T> {
  header: ReactNode;
  key: string;
  className?: string;
  render?: (row: T, rowIndex: number) => ReactNode;
}

interface Props<T extends object> {
  columns: TableColumn<T>[];
  data: T[];
  getRowKey?: (row: T, rowIndex: number) => string;
  showFooter?: boolean;
  footer?: ReactNode;
}

export default function Table<T extends object>({
  columns,
  data,
  getRowKey,
  showFooter = true,
  footer,
}: Props<T>) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] table-fixed text-left text-sm text-slate-500">
        <thead className="bg-slate-50 text-xs font-semibold text-slate-500">
          <tr className="border-b border-slate-200">
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className={`px-5 py-3 ${column.className ?? ''}`}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100">
          {data.map((row, rowIndex) => (
            <tr
              key={getRowKey?.(row, rowIndex) ?? rowIndex}
              className="transition-colors hover:bg-slate-50/80"
            >
              {columns.map((column) => (
                <td
                  key={column.key}
                  className={`px-5 py-4 ${column.className ?? ''}`}
                >
                  {column.render
                    ? column.render(row, rowIndex)
                    : ((row as Record<string, unknown>)[
                        column.key
                      ] as ReactNode)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>

        {showFooter && (
          <tfoot className="border-t border-slate-200 bg-slate-50 text-sm text-slate-500">
            <tr>
              <td className="px-5 py-3" colSpan={columns.length}>
                {footer ?? `전체: ${data.length} 건`}
              </td>
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
}
