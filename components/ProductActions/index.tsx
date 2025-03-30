"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "../ui/dialog";
import { Loader2 } from "lucide-react";
import ProductForm from "../ProductForm";

export default function ProductActions() {
  const [isPending, setIsPending] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-32">Crear Producto</Button>
      </DialogTrigger>
      <DialogContent className="gap-8">
        <DialogHeader>
          <DialogTitle>Nuevo Producto</DialogTitle>
          <DialogDescription>
            En este formulario puedes crear un nuevo Producto
          </DialogDescription>
        </DialogHeader>
        <ProductForm setIsPending={setIsPending} setIsOpen={setIsOpen} />
        <DialogFooter className="grid lg:grid-cols-2 grid-cols-1 ">
          <DialogClose asChild>
            <Button className="w-full order-2 lg:order-1" variant="outline">
              Cerrar
            </Button>
          </DialogClose>
          <Button
            className="w-full order-1 lg:order-2"
            disabled={isPending}
            type="submit"
            form="add-product-form"
          >
            {isPending && (
              <Loader2
                className="mr-2 h-4 w-4 animate-spin"
                aria-hidden="true"
              />
            )}
            Agregar
            <span className="sr-only">Agrega nuevo producto</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
