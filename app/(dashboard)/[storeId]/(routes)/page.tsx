// app/[storeId]/(routes)/page.tsx
import { auth } from "@clerk/nextjs/server"; // Clerk'ten server tarafı kimlik doğrulama
import { redirect } from "next/navigation"; // Yönlendirme için
import prismadb from "@/lib/prismadb"; // Prisma DB client'ı için

interface DashboardPageProps {
  params: { storeId: string }; // Dinamik rota parametreleri
}

// DashboardPage bileşeni bir Server Component'tir ve async olarak tanımlanmıştır.
const DashboardPage = async ({ params }: DashboardPageProps) => {
  // Clerk'ten oturum açmış kullanıcının ID'sini al.
  const { userId } = await auth();

  // Eğer kullanıcı ID'si yoksa (oturumu kapalıysa), giriş sayfasına yönlendir.
  if (!userId) {
    redirect("/sign-in");
  }

  // Veritabanından, verilen storeId'ye ve mevcut userId'ye sahip mağazayı bul.
  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId, // params.storeId'ye doğrudan erişim, fonksiyon async olduğu için güvenli.
      userId, // Mağazanın oturum açmış kullanıcıya ait olduğundan emin ol.
    },
  });

  // Eğer mağaza bulunamazsa (geçersiz ID veya kullanıcıya ait değilse), ana sayfaya yönlendir.
  if (!store) {
    redirect("/"); // Veya özel bir hata sayfasına yönlendirilebilir.
  }

  return (
    <div>
      {/* Mağaza adı dinamik olarak gösteriliyor. */}
      Active Store: {store.name}
    </div>
  );
};

export default DashboardPage;