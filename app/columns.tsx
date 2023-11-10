"use client";
import Link from "next/link";
import { Property, Subtype, Operation } from "@prisma/client";
import { MoreVertical, FileText, Clipboard } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const translations: Record<Subtype | Operation, string> = {
  HOUSE: "Casa",
  APARTMENT: "Departamento",
  LAND: "Terreno",
  SALE: "Venta",
  RENT: "Renta",
  TRANSFER: "Traspaso",
};

export const columns: ColumnDef<Property>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "address",
    header: "Dirección",
  },
  {
    accessorKey: "commission",
    header: "Comisión",
    cell: ({ row }) => <div>{row.getValue("commission")}%</div>,
  },
  {
    accessorKey: "subtype",
    header: "Subtipo",
    cell: ({ row }) => {
      const subtype: Subtype = row.getValue("subtype");
      return <div>{translations[subtype]}</div>;
    },
  },
  {
    accessorKey: "operation",
    header: "Operación",
    cell: ({ row }) => {
      const operation: Operation = row.getValue("operation");
      return <div>{translations[operation]}</div>;
    },
  },
  {
    accessorKey: "images",
    header: "Preview",
    cell: ({ row }) => {
      const images: string[] = row.getValue("images");
      return (
        <picture>
          <img
            className="h-40 w-40 rounded object-cover"
            src={images[0]}
            alt="Preview de la propiedad"
          />
        </picture>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Precio (MXN)",
    cell: ({ row }) => {
      const price = parseInt(row.getValue("price"));
      const formatted = new Intl.NumberFormat("es-MX", {
        style: "currency",
        currency: "MXN",
        maximumFractionDigits: 0,
      }).format(price);
      return <div>{formatted}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const property = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreVertical className="h-6 w-6" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Menú</DropdownMenuLabel>
            <Link href={`/ficha/${property.id}`}>
              <DropdownMenuItem className="gap-1">
                <FileText />
                Ver ficha técnica
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(property.id.toString())
              }
              className="gap-1"
            >
              <Clipboard />
              Copiar ID
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
