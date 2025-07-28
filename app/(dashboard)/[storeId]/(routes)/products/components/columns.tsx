"use client"

import { ColumnDef } from "@tanstack/react-table"

import { CellAction } from "./cell-action";


export type ProductColumn = {
  
  id: string;
  name: string;
  price: string;
  size:string;
  category:string;
  color:string;
  isFeatured: boolean;
  isArchived: boolean;
  createdAt: string;

}

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "label",
    header: "label",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({row}) => <CellAction data={row.original}/>,
  },
 
]