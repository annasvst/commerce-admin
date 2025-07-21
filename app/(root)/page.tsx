'use client';



import { useStoreModal } from "@/hooks/use-store-modal";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";


  const SetupPage = () =>{
    const onOpen = useStoreModal ((state) => state.onOpen);
    const isOpen = useStoreModal((state) => state.isOpen);
  
    useEffect(() =>{
      if(!isOpen){
        onOpen();
      }
    }, [isOpen, onOpen]);

   return (
   <div className="p-4">
    Root PAge
    <Button onClick={() => toast.success('Test Toast!')}>Show Test Toast</Button>
   </div>
  );

}
 

export default SetupPage;