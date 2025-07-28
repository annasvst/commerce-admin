// app/[storeId]/billboards/[billboardId]/page.tsx
import prismadb from "@/lib/prismadb";
import { ProductForm} from "./components/product-form";

// BillboardPage bileşeni bir Server Component'tir ve async olarak tanımlanmıştır.
const ProductPage = async ({
  params,
}: {
  params: { productId: string, storeId: string }; // Dinamik rota parametreleri
}) => {
  // Veritabanından, verilen productId'ye sahip ürünü bul.
  // params.productId'ye doğrudan erişim, fonksiyon async olduğu için güvenli.
  const product = await prismadb.product.findUnique({
    where: {
      id: params.productId,
    },
    include:{
      images:true,

    }
  });

  const categories = await prismadb.category.findMany({
    where:{
      storeId: params.storeId,

    }
  });


   const sizes = await prismadb.size.findMany({
    where:{
      storeId: params.storeId,

    }
  });

    const colors = await prismadb.color.findMany({
    where:{
      storeId: params.storeId,

    }
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        {/* product objesini initialData prop'u olarak ProductForm'a iletiyoruz */}
        <ProductForm
          initialData={product}
          categories={categories}
          sizes={sizes}
          colors={colors}
        />
      </div>
    </div>
  );
};

export default ProductPage;