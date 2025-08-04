
import prismadb from "@/lib/prismadb";
import { CategoryForm } from "./components/category-form";

// BillboardPage bileşeni bir Server Component'tir ve async olarak tanımlanmıştır.
const CategoryPage = async ({
  params,
}: { params: Promise<{ categoryId: string ; storeId: string }> }) => {
  const { categoryId, storeId } = await params; // Destructure and await params
  // Veritabanından, verilen billboardId'ye sahip billboard'ı bul.
  // params.billboardId'ye doğrudan erişim, fonksiyon async olduğu için güvenli.
  const category = await prismadb.category.findUnique({
    where: {
      id: categoryId,
    },
  });

  const billboards = await prismadb.billboard.findMany({
    where:{
      storeId: storeId 
    }
  })

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        {/* billboard objesini initialData prop'u olarak BillboardForm'a iletiyoruz */}
        <CategoryForm billboards={billboards} initialData={category} />
      </div>
    </div>
  );
};

export default CategoryPage;