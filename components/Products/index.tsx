"use client";
import { getProducts } from "@/helpers/getProducts";
import useTitle from "@/hooks/useTitle";
import { useQuery } from "@tanstack/react-query";
import ProductDataTable from "../ProductDataTable";
import ProductActions from "../ProductActions";

export default function Products() {
  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  useTitle("Productos");
  return (
    <section className="flex flex-col gap-8 w-full">
      <h1 className="text-center mt-2">Productos</h1>
      <div className="ml-20">
      <ProductActions />
      </div>
      
      <ProductDataTable data={data ? data.product : []} isLoading={isLoading} />
    </section>
  );
}
