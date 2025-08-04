"use client";

import * as zod from "zod";
import { useState } from "react";
import axios from 'axios';

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
import { toast } from 'react-hot-toast';


const formSchema = zod.object({
  name: zod.string().min(2).max(100),
});

export const StoreModal = () => {
  const storeModal = useStoreModal();

  const [Loading, setLoading] = useState(false);


  const form = useForm<zod.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: zod.infer<typeof formSchema>) => {
    try{
      setLoading(true);

      const response = await axios.post('/api/stores', values);
      window.location.assign(`/${response.data.id}`);
      toast.success('Store created');
    }catch(_error){
      console.log(_error);
      toast.error('Something went wrong');
    }finally{
      setLoading(false);
    }
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
                    <Input disabled={Loading} placeholder="E-commerce" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="pt-6 space-x-2 items-center justify-end">
              <Button variant='outline' disabled={Loading} onClick={storeModal.onClose}>Cancel</Button>
              <Button type="submit" disabled={Loading}>Continue</Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  );
};
