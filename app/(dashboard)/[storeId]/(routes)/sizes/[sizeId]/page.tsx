
import prismadb from "@/lib/prismadb";
import { SizeForm } from "./components/size-form";

// SizePage bileşeni bir Server Component'tir ve async olarak tanımlanmıştır.
const SizePage = async ({
  params,
}: { params: Promise<{ sizeId: string }> }) => {
  const { sizeId } = await params;
  // Veritabanından, verilen billboardId'ye sahip billboard'ı bul.
  // params.billboardId'ye doğrudan erişim, fonksiyon async olduğu için güvenli.
  const size = await prismadb.size.findUnique({
    where: {
      id: sizeId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        {/* billboard objesini initialData prop'u olarak BillboardForm'a iletiyoruz */}
        <SizeForm initialData={size} />
      </div>
    </div>
  );
};

export default SizePage;