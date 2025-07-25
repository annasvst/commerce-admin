
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

export default async function DashboardLayout({
  children,
  params,
}: DashboardLayoutProps) {
  const storeId = params.storeId; 

  const { userId } = await auth(); 

  if (!userId) {
    redirect("/sign-in");
  }


  const stores = await prismadb.store.findMany({
    where: {
      userId,
    },
  });

  
  
  const currentStore = stores.find((store) => store.id === storeId);
  if (!currentStore) {
    redirect("/"); 
  }

  return (
    <>
      
     
      <Navbar userId={userId} stores={stores} />
      {children}
    </>
  );
}