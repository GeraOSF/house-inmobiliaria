"use client";
import { useState } from "react";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useUploadThing } from "@/lib/uploadthing";
import { formSchema } from "@/app/validations";
import MultiUploader from "@/components/multi-uploader";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";

export default function AddForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const { startUpload } = useUploadThing("imageUploader");

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setSubmitting(true);
      const utResponse = await startUpload(files);
      const urls = utResponse?.map((img) => img.url);
      await fetch("/api/property", {
        method: "POST",
        body: JSON.stringify({
          ...values,
          images: urls,
        }),
      });
      revalidatePath("/");
      router.push("/");
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description:
          "Ocurrió un error al agregar la propiedad, intente de nuevo.",
        variant: "destructive",
      });
      setSubmitting(false);
    }
  }

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 pt-4"
        >
          {/* Images */}
          <MultiUploader setFiles={setFiles} />
          {/* Operation */}
          <FormField
            control={form.control}
            name="operation"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue
                        className="text-muted-foreground"
                        placeholder="Venta, renta o traspaso"
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SALE">Venta</SelectItem>
                      <SelectItem value="RENT">Renta</SelectItem>
                      <SelectItem value="TRANSFER">Traspaso</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Subtype */}
          <FormField
            control={form.control}
            name="subtype"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Tipo de propiedad" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="HOUSE">Casa</SelectItem>
                      <SelectItem value="APARTMENT">Departamento</SelectItem>
                      <SelectItem value="LAND">Terreno</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Rooms */}
          <FormField
            control={form.control}
            name="bedrooms"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    onChange={(e) => field.onChange(+e.target.value)}
                    placeholder="Número de habitaciones"
                    type="number"
                    id={field.name}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Bathrooms */}
          <FormField
            control={form.control}
            name="bathrooms"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    onChange={(e) => field.onChange(+e.target.value)}
                    placeholder="Número de baños"
                    type="number"
                    id={field.name}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Price */}
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    onChange={(e) => field.onChange(+e.target.value)}
                    placeholder="Precio (MXN)"
                    type="number"
                    id={field.name}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Address */}
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Dirección"
                    type="text"
                    id={field.name}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Descripción"
                    id={field.name}
                  />
                </FormControl>
                <FormDescription>
                  Incluye detalles, como los servicios incluidos, las
                  instalaciones, los depósitos necesarios y la disponibilidad.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Commission */}
          <FormField
            control={form.control}
            name="commission"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    onChange={(e) => field.onChange(+e.target.value)}
                    placeholder="Comisión (%)"
                    type="number"
                    id={field.name}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Separator />
          <div className="flex items-baseline justify-between">
            <span className="text-lg font-semibold">Opciones adicionales</span>
            <span className="text-sm text-muted-foreground">Opcional</span>
          </div>
          {/* Area */}
          <FormField
            control={form.control}
            name="area"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    onChange={(e) => field.onChange(+e.target.value)}
                    placeholder="Metros cuadrados"
                    type="number"
                    id={field.name}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Washing */}
          <FormField
            control={form.control}
            name="washing"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Tipo de lavadero" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UNIT">
                        Lavadero en la unidad
                      </SelectItem>
                      <SelectItem value="BUILDING">
                        Lavadero en el edificio
                      </SelectItem>
                      <SelectItem value="AVAILABLE">
                        Lavadero disponible
                      </SelectItem>
                      <SelectItem value="NONE">Ninguno</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Parking */}
          <FormField
            control={form.control}
            name="parking"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Tipo de estacionamiento" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="COVERED">
                        Estacionamiento cubierto
                      </SelectItem>
                      <SelectItem value="PUBLIC">
                        Estacionamiento en la vía pública
                      </SelectItem>
                      <SelectItem value="PRIVATE">
                        Estacionamiento privado
                      </SelectItem>
                      <SelectItem value="AVAILABLE">
                        Estacionamiento disponible
                      </SelectItem>
                      <SelectItem value="NONE">Ninguno</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Aircon */}
          <FormField
            control={form.control}
            name="aircon"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Tipo de aire acondicionado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CENTRAL">
                        Aire acondicionado central
                      </SelectItem>
                      <SelectItem value="AVAILABLE">
                        Aire acondicionado disponible
                      </SelectItem>
                      <SelectItem value="NONE">Ninguno</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Heating */}
          <FormField
            control={form.control}
            name="heating"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Tipo de calefacción" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CENTRAL">
                        Calefacción central
                      </SelectItem>
                      <SelectItem value="ELECTRIC">
                        Calefacción eléctrica
                      </SelectItem>
                      <SelectItem value="GAS">Calefacción de gas</SelectItem>
                      <SelectItem value="RADIATORS">
                        Calefacción por radiadores
                      </SelectItem>
                      <SelectItem value="AVAILABLE">
                        Calefacción disponible
                      </SelectItem>
                      <SelectItem value="NONE">Ninguno</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Separator />
          <Button disabled={submitting} type="submit">
            Agregar
          </Button>
        </form>
      </Form>
    </div>
  );
}
