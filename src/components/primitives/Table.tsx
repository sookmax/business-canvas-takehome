import { Table as TablePrimitive, TableProps } from "antd";
import { AnyObject } from "antd/es/_util/type";
export type { TableColumnsType, TableColumnType, TableProps } from "antd";
export type { FilterDropdownProps } from "antd/es/table/interface";

export type TableRowSelection<T extends object = object> =
  TableProps<T>["rowSelection"];

export function Table<Row = AnyObject>(props: TableProps<Row>) {
  return <TablePrimitive {...props} />;
}
