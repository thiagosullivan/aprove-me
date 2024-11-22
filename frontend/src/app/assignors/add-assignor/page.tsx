"use client";
import { Button } from "@/app/_components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import { useAuth } from "@/app/context/AuthContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "O nome é obrigatório",
    })
    .max(140),
  document: z
    .string()
    .min(1, {
      message: "O documento é obrigatório",
    })
    .max(30),
  email: z
    .string()
    .email()
    .min(1, {
      message: "O e-mail é obrigatório",
    })
    .max(140),
  phone: z
    .string()
    .trim()
    .min(1, {
      message: "O telefone é obrigatório",
    })
    .max(20),
});

type FormSchema = z.infer<typeof formSchema>;

const AddAssignorsPage = () => {
  const { token } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      document: "",
      email: "",
      phone: "",
    },
  });

  const onSubmit = async (data: FormSchema) => {
    console.log(data, "FORM DATA");
    console.log(token, "TOKEN");

    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3001/integrations/assignor`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );

      if (response.ok) {
        router.push("/assignors/list-assignors");
      } else {
        setNotFound(true);
        console.log("NÃO AUTORIZADO");
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-6 py-4">
      <h2 className="text-center text-2xl font-bold">
        Adicione um novo cedente:
      </h2>

      <div className="mx-auto mt-6 flex w-full max-w-[500px] items-center justify-center rounded-lg border border-solid p-12 shadow-lg">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Nome" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="document"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Documento" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="E-mail" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Phone" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* {notFound && (
              <p className="font-bold text-destructive">
                Usuário não encontrado
              </p>
            )} */}
            <Button type="submit" className="w-full">
              Submit
            </Button>
            {/* {loading ? <Loading /> : ""} */}
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AddAssignorsPage;
