import { redirect } from "next/navigation";
import { MainNav } from "./main-nav";
import StoreSwitcher from "./store-switcher";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import prismadb from "@/lib/prismadb";

const Navbar = async () =>{
  const { userId } = await auth();

  if(!userId){
    redirect('/sign-in');
  }
  const stores= await prismadb.store.findMany({
    where:{
      userId
    }
  })

  return(
    <div className="border-b">
     <div className="flex h-16 items-center px-4">
        <StoreSwitcher items={stores}/>
        <MainNav/>
        <div className="ml-auto flex items-center space-x-4">
        <UserButton afterSignOutUrl="/"/>
        </div>
     </div>
    </div>
  );
}
export default Navbar;
