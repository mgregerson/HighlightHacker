"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import React, { useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { addSport } from "@/actions/addSport";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  imageUrl: z.string().min(2, {
    message: "ImageUrl must be at least 2 characters.",
  }),
});

function AddSportForm() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      imageUrl: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(() => {
      addSport(values.name, values.imageUrl)
        .then((data) => {
          toast.success(`You have added ${data.name} to the database!`, {
            duration: 2000,
          });
        })
        .catch((error) => toast.error(`${error}`));
    });
  }

  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="max-w-md w-full p-4 bg-slate-500 rounded-md shadow-md">
        <Form {...form}>
          {/* Use flex and justify-center to center the form vertically and horizontally */}
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} className="w-full" />
                  </FormControl>
                  <FormDescription>
                    What is the name of your sport?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} className="w-full" />
                  </FormControl>
                  <FormDescription>
                    Add an image to represent your sport!
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="w-1/4">
              <Button type="submit" className="w-full" disabled={isPending}>
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default AddSportForm;
