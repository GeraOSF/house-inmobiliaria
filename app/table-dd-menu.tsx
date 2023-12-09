import Link from "next/link";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import { Property } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import {
  MoreVertical,
  FileText,
  Clipboard,
  CopyCheck,
  Trash,
} from "lucide-react";

import { IsAdminContext } from "./data-table";
import { useToast } from "@/components/ui/use-toast";
import { deleteProperty } from "@/app/actions";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function TableDropDownMenu({
  property,
}: {
  property: Property;
}) {
  const router = useRouter();
  const { toast } = useToast();
  const { mutateAsync } = useMutation({
    mutationFn: deleteProperty,
    onSuccess: router.refresh,
  });
  const isAdmin = useContext(IsAdminContext);

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
        {isAdmin && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={async () => {
                await mutateAsync(property.id);
                toast({
                  description: (
                    <div className="flex items-center gap-2">
                      <Trash />
                      Propiedad con id {property.id} eliminada.
                    </div>
                  ),
                });
              }}
              className="gap-1"
            >
              <Trash />
              Eliminar propiedad
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
