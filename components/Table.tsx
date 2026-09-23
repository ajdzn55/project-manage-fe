'use client';

import SkeletonRow from '@/components/SkeletonRow';
import {
  columnResizingFeature,
  columnSizingFeature,
  columnVisibilityFeature,
  createColumnHelper,
  createSortedRowModel,
  metaHelper,
  rowSortingFeature,
  sortFn_text,
  tableFeatures,
  useTable,
  type ColumnDef,
} from '@tanstack/react-table';
import type { ReactNode } from 'react';

export interface TableColumnMeta {
  sticky?: boolean;
  align?: 'left' | 'center' | 'right';
  color?: string;
  rowSpan?: number;
  wrap?: boolean;
}

export const projectTableFeatures = tableFeatures({
  columnMeta: metaHelper<TableColumnMeta>(),
  columnVisibilityFeature,
  columnSizingFeature,
  columnResizingFeature,
  rowSortingFeature,
  sortedRowModel: createSortedRowModel(),
  sortFns: { text: sortFn_text },
});

export type TableColumn<T extends object> = ColumnDef<
  typeof projectTableFeatures,
  T,
  any
>;

export const createTableColumnHelper = <T extends object>() =>
  createColumnHelper<typeof projectTableFeatures, T>();

interface Props<T extends object> {
  columns: TableColumn<T>[];
  data: T[];
  rowKey?: keyof T;
  onRowClick?: (row: T) => void;
  selectedRowId?: string;
  showFooter?: boolean;
  footer?: ReactNode;
  tableBorder?: boolean;
  isLoading?: boolean;
  skeletonRowCount?: number;
  onDoubleClick?: (e: any) => void;
}

const alignClasses: Record<NonNullable<TableColumnMeta['align']>, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
};

export default function Table<T extends object>({
  columns,
  data,
  rowKey,
  onRowClick,
  selectedRowId,
  showFooter = false,
  footer,
  tableBorder = false,
  isLoading = false,
  skeletonRowCount = 3,
  onDoubleClick,
}: Props<T>) {
  const table = useTable({
    features: projectTableFeatures,
    columns,
    data,
    columnResizeMode: 'onChange',
    enableColumnResizing: true,
    getRowId: (row) => String(row[rowKey ?? ('id' as keyof T)]),
  });
  const totalSize = table.getTotalSize();
  const getWidth = (size: number) =>
    totalSize > 0 ? `${(size / totalSize) * 100}%` : undefined;
  const getStickyLeft = (columnId: string) => {
    let size = 0;

    for (const column of table.getVisibleLeafColumns()) {
      if (column.id === columnId) break;
      if (column.columnDef.meta?.sticky) size += column.getSize();
    }

    return getWidth(size);
  };

  return (
    <div
      className={`h-full overflow-x-auto overflow-y-auto ${
        tableBorder ? 'border-line rounded-xl border' : ''
      }`}
    >
      <table className="text-muted w-full table-fixed text-left">
        <thead className="bg-surface text-muted font-semibold">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="border-line border-b">
              {headerGroup.headers.map((header) => {
                const meta = header.column.columnDef.meta;
                const isSticky = meta?.sticky ?? false;
                const canSort = header.column.getCanSort();
                const sorting = header.column.getIsSorted();

                return (
                  <th
                    key={header.id}
                    scope="col"
                    colSpan={header.colSpan}
                    rowSpan={meta?.rowSpan}
                    className={`border-line bg-surface sticky top-0 z-20 border-r px-5 py-3 last:border-r-0 ${
                      alignClasses[meta?.align ?? 'left']
                    } ${isSticky ? 'z-30' : ''}`}
                    style={{
                      width: getWidth(header.getSize()),
                      ...(isSticky && {
                        left: getStickyLeft(header.column.id),
                      }),
                      ...(meta?.color && { backgroundColor: meta.color }),
                    }}
                  >
                    {header.isPlaceholder ? null : canSort ? (
                      <button
                        type="button"
                        onClick={header.column.getToggleSortingHandler()}
                        className="hover:text-heading inline-flex items-center gap-1"
                      >
                        <table.FlexRender header={header} />
                        <span aria-hidden="true">
                          {sorting === 'asc'
                            ? '↑'
                            : sorting === 'desc'
                              ? '↓'
                              : ''}
                        </span>
                      </button>
                    ) : (
                      <table.FlexRender header={header} />
                    )}

                    {header.column.getCanResize() && (
                      <div
                        role="separator"
                        aria-orientation="vertical"
                        onMouseDown={header.getResizeHandler()}
                        onTouchStart={header.getResizeHandler()}
                        onDoubleClick={() => header.column.resetSize()}
                        className="group/resizer absolute top-0 -right-1 z-10 h-full w-2 cursor-col-resize touch-none select-none"
                      >
                        <span
                          className={`absolute top-0 left-1/2 h-full w-px -translate-x-1/2 transition-colors ${
                            header.column.getIsResizing()
                              ? 'bg-blue-500'
                              : 'bg-slate-200 group-hover/resizer:bg-blue-400'
                          }`}
                        />
                      </div>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>

        <tbody className="divide-y divide-slate-100">
          {isLoading ? (
            <SkeletonRow table={table} rowCount={skeletonRowCount} />
          ) : (
            table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                onClick={
                  onRowClick ? () => onRowClick(row.original) : undefined
                }
                onDoubleClick={() => {
                  if (onDoubleClick) {
                    onDoubleClick(row.original);
                  }
                }}
                tabIndex={onRowClick ? 0 : undefined}
                onKeyDown={
                  onRowClick
                    ? (event) => {
                        if (event.target !== event.currentTarget) return;
                        if (event.key === 'Enter' || event.key === ' ') {
                          event.preventDefault();
                          onRowClick(row.original);
                        }
                      }
                    : undefined
                }
                className={`group transition-colors ${
                  selectedRowId === row.id
                    ? 'bg-primary-soft'
                    : 'hover:bg-surface'
                } ${onRowClick || onDoubleClick ? 'cursor-pointer' : ''} `}
              >
                {row.getVisibleCells().map((cell) => {
                  const meta = cell.column.columnDef.meta;
                  const isSticky = meta?.sticky ?? false;

                  return (
                    <td
                      key={cell.id}
                      className={`border-line border-r px-5 py-4 last:border-r-0 ${
                        alignClasses[meta?.align ?? 'left']
                      } ${isSticky ? 'group-hover:bg-surface sticky z-10 bg-white' : ''}`}
                      style={{
                        width: getWidth(cell.column.getSize()),
                        ...(isSticky && {
                          left: getStickyLeft(cell.column.id),
                        }),
                      }}
                    >
                      <div
                        className={
                          meta?.wrap
                            ? 'break-words whitespace-normal'
                            : 'truncate'
                        }
                      >
                        <table.FlexRender cell={cell} />
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))
          )}
        </tbody>

        {showFooter && !isLoading && (
          <tfoot className="border-line bg-surface text-muted border-t">
            <tr>
              <td
                className="px-5 py-3"
                colSpan={table.getVisibleLeafColumns().length}
              >
                {footer ?? `전체: ${data.length} 건`}
              </td>
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
}
