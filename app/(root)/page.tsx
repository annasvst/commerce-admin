'use client';


import { Modal } from "@/components/ui/modal";

const SetupPage = () => {

   return (
   <div className="p-4">
    <Modal title="test" description="test" isOpen={true} onClose={() => {}}>
      <h2>Modal Title</h2>
      <p>Modal Description</p>
    </Modal>
   </div>
  );

}
 

export default SetupPage;