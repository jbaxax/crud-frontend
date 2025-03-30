import {z} from "zod";

const requiredErrorMsg = "Este campono puede estar vacio";

export const ProductSchema = z.object({
    name: z.string().min(1,{message: requiredErrorMsg}),
    description: z.string().min(1,{message: requiredErrorMsg}),
    price: z.string().min(1,{message: requiredErrorMsg}),
    stock: z.string().min(1,{message: requiredErrorMsg}),
})