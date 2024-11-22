"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { navigate } from "../actions/actions";
import Loading from "../loading";
import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Input } from "./ui/input";

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
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      login: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormSchema) => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3001/integrations/auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const json = await response.json();
        const accessToken = json.access_token;
        localStorage.setItem("access_token", accessToken);

        setTimeout(() => {
          setLoading(false);
          navigate("/");
        }, 2000);

        console.log(accessToken);
      }
    } catch (error) {
      console.log(error);
    }
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
          {loading ? (
            <Loading />
          ) : (
            <>
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
                    <div className="relative">
                      <FormControl>
                        <Input
                          placeholder="Senha"
                          {...field}
                          type={showPassword ? "text" : "password"}
                        />
                      </FormControl>
                      <button
                        className="absolute right-2 top-2"
                        type="button"
                        onClick={handleShowPassword}
                      >
                        {showPassword ? <EyeOff /> : <Eye />}
                      </button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Submit
              </Button>
            </>
          )}
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
