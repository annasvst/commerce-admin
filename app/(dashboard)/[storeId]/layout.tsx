import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

interface DashboardLayoutProps {
  children: React.ReactNode;
  params: { storeId: string };
}

export default async function DashboardLayout({
  children,
  params,
}: DashboardLayoutProps) {
  const { userId } = await auth(); 

  if (!userId) {
    redirect('/sign-in');
    
  }

  const store = await prisma?.store.findFirst({
    where:{
      id:params.storeId,
      userId
    }
  });

  if(!store){
    redirect('/');
  }

  return (
    <>
      <div>This will be a navbar</div>
      {children}
    </>
  );
}
