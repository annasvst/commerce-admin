"use client";

import * as zod from "zod";
import { useStoreModal } from "@/hooks/use-store-modal";
import { Modal } from "../ui/modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


const formSchema = zod.object({
  name: zod.string().min(2).max(100),
});

export const StoreModal = () => {
  const storeModal = useStoreModal();

  const form = useForm<zod.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: zod.infer<typeof formSchema>) => {
    // Buraya store oluşturma API isteği gelecek
    alert(`Store created: ${values.name}`);
    storeModal.onClose();
  };

  return (
    <Modal
      title="Create Store"
      description="Create a new store"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <div className="space-y-4 py-2 pb-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="E-commerce" {...field} />
                  </FormControl>
                 
                </FormItem>
              )}
            />

            <div className="pt-6 space-x-2 items-center justify-end">
              <Button variant='outline'>Cancel</Button>
              <Button>Continue</Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  );
};
