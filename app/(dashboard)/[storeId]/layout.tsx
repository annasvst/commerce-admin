// app/[storeId]/layout.tsx
import { auth } from "@clerk/nextjs/server"; // Server tarafı Clerk auth
import { redirect } from "next/navigation";
import Navbar from "@/components/navbar"; // Güncellenmiş Navbar'ı import ediyoruz
import prismadb from "@/lib/prismadb";

interface DashboardLayoutProps {
  children: React.ReactNode;
  params: {
    storeId: string;
  };
}

export default async function DashboardLayout({
  children,
  params,
}: DashboardLayoutProps) {
  const storeId = params.storeId; // params.storeId'yi doğrudan kullanıyoruz

  const { userId } = await auth(); // Clerk'ten userId'yi sunucu tarafında alıyoruz

  if (!userId) {
    redirect("/sign-in");
  }

  // Kullanıcının sahip olduğu tüm mağazaları çekiyoruz
  const stores = await prismadb.store.findMany({
    where: {
      userId,
    },
  });

  // Gelen storeId'ye sahip mağazanın gerçekten mevcut ve bu kullanıcıya ait olup olmadığını kontrol ediyoruz.
  // Bu, hatalı URL'ler için güvenli bir yönlendirme sağlar.
  const currentStore = stores.find((store) => store.id === storeId);
  if (!currentStore) {
    redirect("/"); // Kullanıcıya ait olmayan veya mevcut olmayan mağaza ID'si durumunda ana sayfaya yönlendir
  }

  return (
    <>
      {/* Navbar'a userId ve stores prop'larını geçiyoruz. */}
      {/* Navbar'ın bir Client Component olacağını varsayarak bu verileri aktarıyoruz. */}
      <Navbar userId={userId} stores={stores} />
      {children}
    </>
  );
}