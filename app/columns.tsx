"use client";
import Link from "next/link";
import { Property, Subtype, Operation } from "@prisma/client";
import {
  MoreVertical,
  FileText,
  Clipboard,
  CopyCheck,
  ArrowUpDown,
} from "lucide-react";
import { ColumnDef, Column } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";

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
    header: ({ column }) => <SortButton column={column}>Id</SortButton>,
  },
  {
    accessorKey: "address",
    header: "Dirección",
  },
  {
    accessorKey: "commission",
    header: ({ column }) => <SortButton column={column}>Comisión</SortButton>,
    cell: ({ row }) => <div>{row.getValue("commission")}%</div>,
  },
  {
    accessorKey: "subtype",
    header: ({ column }) => <SortButton column={column}>Subtipo</SortButton>,
    cell: ({ row }) => {
      const subtype: Subtype = row.getValue("subtype");
      return <div>{translations[subtype]}</div>;
    },
  },
  {
    accessorKey: "operation",
    header: ({ column }) => <SortButton column={column}>Operación</SortButton>,
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
    header: ({ column }) => (
      <SortButton column={column}>Precio (MXN)</SortButton>
    ),
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
      const Menu = () => {
        const { toast } = useToast();
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Abrir menu</span>
                <MoreVertical className="h-6 w-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Menú</DropdownMenuLabel>
              <DropdownMenuItem className="gap-1" asChild>
                <Link href={`/ficha/${property.id}`}>
                  <FileText />
                  Ver ficha técnica
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  navigator.clipboard.writeText(property.id.toString());
                  toast({
                    description: (
                      <div className="flex items-center gap-2">
                        <CopyCheck />
                        Id {property.id} copiada
                      </div>
                    ),
                  });
                }}
                className="gap-1"
              >
                <Clipboard />
                Copiar ID
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      };
      return <Menu />;
    },
  },
];

function SortButton({
  column,
  children,
}: {
  column: Column<Property>;
  children: React.ReactNode;
}) {
  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      className="flex gap-2 whitespace-nowrap text-base"
    >
      {children}
      <ArrowUpDown className="h-4 w-4" />
    </Button>
  );
}
