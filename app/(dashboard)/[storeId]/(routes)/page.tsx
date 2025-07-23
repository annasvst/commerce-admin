import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";

interface DashboardPageProps {
  params: { storeId: string };
}

const DashboardPage = async ({ params }: DashboardPageProps) => {
  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
    },
  });

  if (!store) {
    redirect("/"); // veya bir hata sayfasına yönlendir
  }

  return (
    <div>
      Active Store: {store.name}
    </div>
  );
};

export default DashboardPage;
