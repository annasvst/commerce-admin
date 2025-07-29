// app/(dashboard)/[storeId]/(routes)/products/[productId]/page.tsx

import prismadb from "@/lib/prismadb";
import { ProductForm } from "./components/product-form";
import { notFound } from "next/navigation";

const ProductPage = async ({
  params,
}: {
  params: { storeId: string; productId: string };
}) => {
  let product = null;

  if (params.productId !== "new") {
    product = await prismadb.product.findUnique({
      where: {
        id: params.productId,
      },
      include: {
        images: true,
        category: true,
        size: true,
        color: true,
      },
    });
  }

  if (params.productId !== "new" && !product) {
    return notFound();
  }

  const formattedProduct = product ? {
    id: product.id,
    name: product.name,
    price: product.price.toNumber(), // ✅ Decimal → number dönüşümü
    isFeatured: product.isFeatured,
    isArchived: product.isArchived,
    categoryId: product.categoryId,
    sizeId: product.sizeId,
    colorId: product.colorId,
    images: product.images,
    category: product.category,
    size: product.size,
    color: product.color,
    createdAt: product.createdAt.toISOString(),
    updatedAt: product.updatedAt.toISOString(),
  } : null;

  const categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const sizes = await prismadb.size.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const colors = await prismadb.color.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductForm
          initialData={formattedProduct}
          categories={categories}
          sizes={sizes}
          colors={colors}
        />
      </div>
    </div>
  );
};

export default ProductPage;
