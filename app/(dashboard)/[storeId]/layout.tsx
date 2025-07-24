import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Navbar from "@/components/navbar";
import prismadb from "@/lib/prismadb";

interface DashboardLayoutProps {
  children: React.ReactNode;
  params: {
    storeId: string;
  };
}

export default async function DashboardLayout(props: DashboardLayoutProps) {
  const { children, params } = props; // 👈 burada al
  const { storeId } = params;         // 👈 burada destructure et

  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }



  const store = await prismadb.store.findFirst({
    where: {
      id: storeId,
      userId,
    },
  });

  if (!store) {
    redirect("/");
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
