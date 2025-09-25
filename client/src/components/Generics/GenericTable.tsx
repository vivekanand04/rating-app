import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";

interface GenericTableProps<T> {
  tableCaption?: string;
  tableHeaders: string[];
  data: T[];
  renderRow: (item: T, index: number) => React.ReactNode;
  sortableHeaders?: string[];
  sortKey?: string;
  sortOrder?: "asc" | "desc";
  onSortChange?: (key: string) => void;
}

export const GenericTable = <T,>({
  tableCaption,
  tableHeaders,
  data,
  renderRow,
  onSortChange,
  sortKey,
  sortOrder,
  sortableHeaders,
}: GenericTableProps<T>) => {
  return (
    <Table>
      {tableCaption && <TableCaption>{tableCaption}</TableCaption>}

      <TableHeader>
        <TableRow>
          {tableHeaders.map((header, i) => {
            const isSortable = sortableHeaders?.includes(header);
            const isActive = sortKey === header;

            return (
              <TableHead
                key={i}
                onClick={() => isSortable && onSortChange?.(header)}
                className={isSortable ? "cursor-pointer select-none" : ""}
              >
                {header}
                {isActive && (sortOrder === "asc" ? " ↑" : " ↓")}
              </TableHead>
            );
          })}
        </TableRow>
      </TableHeader>

      <TableBody>
        {data.map((item, index) => (
          <React.Fragment key={index}>{renderRow(item, index)}</React.Fragment>
        ))}
      </TableBody>
    </Table>
  );
};

export default GenericTable;
