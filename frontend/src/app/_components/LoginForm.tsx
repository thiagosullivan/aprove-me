"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  login: z.string().min(1, {
    message: "O login é obrigatório",
  }),
  password: z.string().min(1, {
    message: "A senha é obrigatória",
  }),
});

type FormSchema = z.infer<typeof formSchema>;

const LoginForm = () => {
  const router = useRouter();
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      login: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormSchema) => {
    try {
      const response = await fetch(`http://localhost:3001/integrations/auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const json = await response.json();
        const accessToken = json.access_token; // Acesse o token retornado pela API

        // Salve no localStorage
        if (typeof window !== "undefined") {
          // Certifique-se de estar no lado do cliente
          localStorage.setItem("access_token", accessToken);
          console.log("Token salvo com sucesso no localStorage");
        }
      }
      router.push("/");
    } catch (error) {
      console.log(error);
    }
    // console.log(data.login);
  };

  return (
    <div className="rounded-lg border border-solid p-12 shadow-lg">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-col items-center">
            <Image
              src="/assets/logo-bankme.png"
              alt="Bankme"
              width={30}
              height={30}
            />
            <p className="mt-4 font-bold text-bankmeBlue">Faça seu login</p>
          </div>
          <FormField
            control={form.control}
            name="login"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Login" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Senha" {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
