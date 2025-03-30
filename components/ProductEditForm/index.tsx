import { ProductSchema } from '@/lib/product';
import api from '@/service';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

interface Props{
    product: Product,
    setIsPending: (value: boolean) => void,
    setIsOpen: (value: boolean) => void
}

export default function ProductEditForm({product,setIsOpen}:Props) {
    const queryClient = useQueryClient();

    const form = useForm<z.infer<typeof ProductSchema>>({
        resolver: zodResolver(ProductSchema),
        defaultValues:{
            name: product?.name,
            description: product?.description,
            price: product?.price.toString(),
            stock: product?.stock.toString(),
        }, 
    });

    const onSubmit = async (values: z.infer<typeof ProductSchema>)=>{
        try{
            const response = await api.patch(
                `/products/update/${product.id}`,
                values
            );

            if(response.status == 200){
                toast("Producto actualizado")
            }

            queryClient.invalidateQueries({ queryKey: ["products"] });
            setIsOpen(false)
        }catch(error){
            console.log(error);
            toast("Error al actualizar")
        }finally{
            setIsOpen(false)
        }
    }
    return (
    <Form {...form}>
        <form id='update-product-form' onSubmit={form.handleSubmit(onSubmit)} className='space-y-5 w-[99%] p-[0.3rem]'>
           <div className='flex justify-between gap-4'>
            <FormField
            control={form.control}
            name="name"
            render={({field})=>(
                <FormItem className='w-full'>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                        <Input placeholder='Nombre' {...field}/>
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="price"
            render={({field})=>(
                <FormItem className='w-full'>
                    <FormLabel>Precio</FormLabel>
                    <FormControl>
                        <Input placeholder='Precio' {...field}/>
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )}
            />
           </div>
           <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripcion</FormLabel>
              <FormControl>
                <Textarea placeholder="Descripcion" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="stock"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Stock</FormLabel>
              <FormControl>
                <Input placeholder="Stock" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        </form>
    </Form>
  )
}
