"use client";
import { Button } from "@/app/_components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { useAuth } from "@/app/context/AuthContext";
import { fetchAssignors } from "@/app/utils/fetchAssignors";
import { DataType } from "@/app/utils/fetchIndividualPayable";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  value: z
    .string()
    .min(1, {
      message: "O nome é obrigatório",
    })
    .max(60),
  emissionDate: z
    .string()
    .min(1, {
      message: "A data é obrigatório",
    })
    .max(60),
  assignorId: z
    .string()
    .min(1, {
      message: "O cedente é obrigatório",
    })
    .max(140),
});

type FormSchema = z.infer<typeof formSchema>;

const AddPayablesPage = () => {
  const { token } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [assignors, setAssignors] = useState<DataType[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const currentDate = new Date().toISOString();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      value: "",
      emissionDate: currentDate,
      assignorId: "",
    },
  });

  useEffect(() => {
    const loadData = async () => {
      if (!token) {
        setError("Token não encontrado");
        setLoading(false);
        router.push("/login");
        return;
      }

      try {
        const result = await fetchAssignors(token);
        setAssignors(result);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [token, router]);

  const onSubmit = async (data: FormSchema) => {
    setLoading(true);
    const formatValue = Number(data.value);

    const requestData = {
      ...data,
      value: formatValue,
    };

    try {
      const response = await fetch(
        `http://localhost:3001/integrations/payable`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        },
      );

      if (response.ok) {
        router.push("/payables/list-payable");
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
        Adicione um novo Recebível:
      </h2>

      <div className="mx-auto mt-6 flex w-full max-w-[500px] items-center justify-center rounded-lg border border-solid p-12 shadow-lg">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite o valor" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="assignorId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cedente</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um cedente" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {assignors?.map((option) => (
                        <SelectItem key={option.id} value={option.id}>
                          {option.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Enviar</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AddPayablesPage;
