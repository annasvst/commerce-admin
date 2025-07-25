"use client"

import { ColumnDef } from "@tanstack/react-table"
import { string } from "zod"


export type BillboardColumn = {
  
  id: string;
  label : string;
  createdAt: string;

}

export const columns: ColumnDef<BillboardColumn>[] = [
  {
    accessorKey: "label",
    header: "label",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
 
]