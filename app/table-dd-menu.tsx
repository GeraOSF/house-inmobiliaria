"use client";
import Link from "next/link";
import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Property } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import {
  MoreVertical,
  FileText,
  Clipboard,
  CopyCheck,
  Trash,
  Download,
} from "lucide-react";
import { PDFDownloadLink } from "@react-pdf/renderer";

import { cn } from "@/lib/utils";
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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Datasheet from "@/components/datasheet";

export default function TableDropDownMenu({
  property,
}: {
  property: Property;
}) {
  const isAdmin = useContext(IsAdminContext);
  const router = useRouter();
  const { toast } = useToast();
  const { mutateAsync } = useMutation({
    mutationFn: deleteProperty,
    onSuccess: router.refresh,
  });
  const [width, setWidth] = useState(window.innerWidth);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const isMobile = width <= 768;

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Abrir menu</span>
            <MoreVertical className="h-6 w-6" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Menú</DropdownMenuLabel>
          {isMobile ? (
            <DropdownMenuItem className="gap-1 p-0">
              <PDFDownloadLink
                document={<Datasheet property={property} />}
                fileName={`propiedad-${property.id}`}
                className="flex cursor-default items-center gap-1 p-2"
              >
                {({ loading }) => (
                  <>
                    <Download />
                    <span
                      className={cn("transition-opacity", {
                        "opacity-70": loading,
                      })}
                    >
                      {loading
                        ? "Generando ficha técnica"
                        : "Descargar ficha técnica"}{" "}
                    </span>
                  </>
                )}
              </PDFDownloadLink>
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem className="gap-1" asChild>
              <Link href={`/ficha/${property.id}`}>
                <FileText />
                Ver ficha técnica
              </Link>
            </DropdownMenuItem>
          )}
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
              <DialogTrigger asChild>
                <DropdownMenuItem className="gap-1">
                  <Trash />
                  Eliminar
                </DropdownMenuItem>
              </DialogTrigger>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            ¿Seguro que quieres eliminar esta propiedad?
          </DialogTitle>
          <DialogDescription>
            Esta acción no se puede deshacer.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Cancelar</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
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
              variant="destructive"
            >
              Eliminar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
