// app/[storeId]/billboards/[billboardId]/page.tsx
import prismadb from "@/lib/prismadb";
import { BillboardForm } from "./components/billboard-form";

// BillboardPage bileşeni bir Server Component'tir ve async olarak tanımlanmıştır.
const BillboardPage = async ({
  params,
}: {
  params: { billboardId: string }; // Dinamik rota parametreleri
}) => {
  // Veritabanından, verilen billboardId'ye sahip billboard'ı bul.
  // params.billboardId'ye doğrudan erişim, fonksiyon async olduğu için güvenli.
  const billboard = await prismadb.billboard.findUnique({
    where: {
      id: params.billboardId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        {/* billboard objesini initialData prop'u olarak BillboardForm'a iletiyoruz */}
        <BillboardForm initialData={billboard} />
      </div>
    </div>
  );
};

export default BillboardPage;