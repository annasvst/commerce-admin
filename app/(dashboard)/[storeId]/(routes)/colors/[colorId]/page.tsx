
import prismadb from "@/lib/prismadb";
import { ColorForm } from "./components/color-form";

// SizePage bileşeni bir Server Component'tir ve async olarak tanımlanmıştır.
const ColorPage = async ({
  params,
}: { params: Promise<{ colorId: string }> }) => {
  const { colorId } = await params;
  // Veritabanından, verilen billboardId'ye sahip billboard'ı bul.
  // params.billboardId'ye doğrudan erişim, fonksiyon async olduğu için güvenli.
  const color = await prismadb.color.findUnique({
    where: {
      id: colorId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        {/* billboard objesini initialData prop'u olarak BillboardForm'a iletiyoruz */}
        <ColorForm initialData={color} />
      </div>
    </div>
  );
};

export default ColorPage;