"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { startTransition, useTransition } from "react";
import { toast } from "sonner";
import { addHighlight } from "@/actions/addHighlight";

const formSchema = z.object({
  videoUrl: z.string().min(2, {
    message: "VideoUrl must be at least 2 characters.",
  }),
  sport: z.string().min(2, {
    message: "Sport must be at least 2 characters.",
  }),
  description: z.string().optional(),
});

interface AddHighlightFormProps {
  sports: string[];
}

function AddHighlightForm({ sports }: AddHighlightFormProps) {
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      videoUrl: "",
      description: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.description === undefined) {
      values.description = ""; 
    }
    const { sport, description, videoUrl } = values;

    startTransition(() => {
      addHighlight(sport, description, videoUrl)
        .then((data) => {
          toast.success("You have added a new highlight to the database!");
          form.reset({
            sport: "",
            description: "",
            videoUrl: "",
          });
        })
        .catch((error) => toast.error(`${error}`));
    });
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-md w-full p-4 bg-slate-500 rounded-md shadow-md">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col space-y-4"
          >
            <FormField
              control={form.control}
              name="sport"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sport</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          className="text-slate-200"
                          placeholder="What sport is the highlight about?"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {sports.map((sport) => (
                        <SelectItem key={sport} value={sport}>
                          {sport}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="videoUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Video URL</FormLabel>
                  <FormControl>
                    <Input
                      className="text-slate-200"
                      placeholder="Video URL"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      className="text-slate-200"
                      placeholder="Describe your highlight!"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default AddHighlightForm;
