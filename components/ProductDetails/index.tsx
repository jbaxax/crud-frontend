import api from '@/service';
import { useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react'
import { toast } from 'sonner';
import { SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from '../ui/sheet';
import ProductEditForm from '../ProductEditForm';
import { Button } from '../ui/button';
import { Pencil, X } from 'lucide-react';

interface Props {
    product: Product;
    open: boolean;
    setIsOpen: (value: boolean) => void;
}


export default function ProductDetails({product,setIsOpen}:Props) {
  
  const [isPending,setIsPending] = useState(false);
  const queryClient = useQueryClient()

  const deletedProduct = async () =>  {
    setIsPending(true);
    try {
        const response = await api.delete(`/products/delete/${product.id}`);

        if(response.status === 200){
            toast("Producto eliminado correctamente")
        }
        
        setIsPending(false);
        queryClient.invalidateQueries({ queryKey: ["products"] });
    
    } catch (error) {
        console.log(error);
        toast("Error al eliminar el product")
    }finally{
        setIsPending(false)
    }
  }
    return (
        <SheetContent>
        <SheetHeader>
          <SheetTitle>Informacion del producto</SheetTitle>
          <SheetDescription>
          </SheetDescription>
        </SheetHeader>
        <ProductEditForm product={product}  setIsPending={setIsPending} setIsOpen={setIsOpen}/>
        <SheetFooter>
            <Button type='submit' form='update-product-form' disabled={isPending}>
                <Pencil  className='mr-2 h-4 w-4'/> 
                Aplicar
            </Button>
            <Button variant="destructive" onClick={deletedProduct}>
                <X className='mr-2 h-4 w-4'/>
                Eliminar
            </Button>
        </SheetFooter>
      </SheetContent>
  )
}
