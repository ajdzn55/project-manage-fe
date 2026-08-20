import type { projectTableFeatures } from '@/components/Table';
import type { Table as TanStackTable } from '@tanstack/react-table';

interface Props<T extends object> {
  table: TanStackTable<typeof projectTableFeatures, T>;
  rowCount?: number;
}

const SkeletonRow = <T extends object>({ table, rowCount = 3 }: Props<T>) => {
  const totalSize = table.getTotalSize();

  return Array.from({ length: rowCount }, (_, rowIndex) => (
    <tr key={rowIndex} aria-hidden="true">
      {table.getVisibleLeafColumns().map((column) => (
        <td
          key={column.id}
          className="border-line border-r px-5 py-4 last:border-r-0"
          style={{
            width:
              totalSize > 0
                ? `${(column.getSize() / totalSize) * 100}%`
                : undefined,
          }}
        >
          <div className="h-4 animate-pulse rounded bg-slate-200" />
        </td>
      ))}
    </tr>
  ));
};

export default SkeletonRow;
