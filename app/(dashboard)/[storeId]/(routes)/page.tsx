
import { auth } from "@clerk/nextjs/server"; 
import { redirect } from "next/navigation"; 
import prismadb from "@/lib/prismadb"; 

interface DashboardPageProps {
  params: { storeId: string }; 
}


const DashboardPage = async ({ params }: DashboardPageProps) => {
  
  const { userId } = await auth();

  
  if (!userId) {
    redirect("/sign-in");
  }

  
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