"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

// Schema de validação
const formSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  valorAtual: z.coerce.number().min(0.01, "Valor deve ser maior que zero"),
  clienteId: z.string().min(1, "Selecione um cliente"),
});

export function AssetForm({ clientes }: { clientes: any[] }) {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      valorAtual: 0,
      clienteId: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await api.post(`/ativos/${data.clienteId}`, {
        nome: data.nome,
        valorAtual: Number(data.valorAtual),
      });
      router.push("/ativos");
    } catch (error) {
      console.error("Erro ao criar ativo:", error);
      alert("Ocorreu um erro ao cadastrar o ativo. Por favor, tente novamente.");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="nome"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome do Ativo</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Ex: AAPL, BTC, PETR4"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="valorAtual"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Valor Atual (R$)</FormLabel>
              <FormControl>
                <Input 
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="clienteId"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Cliente</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="border rounded-lg p-4 max-h-60 overflow-y-auto"
                >
                  {clientes.map((cliente) => (
                    <div key={cliente.id} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded">
                      <RadioGroupItem value={String(cliente.id)} id={`cliente-${cliente.id}`} />
                      <label htmlFor={`cliente-${cliente.id}`} className="flex-1">
                        <div className="flex justify-between items-center">
                          <span>{cliente.nome}</span>
                          <span className="text-sm text-gray-500">{cliente.email}</span>
                        </div>
                      </label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Cadastrar Ativo</Button>
      </form>
    </Form>
  );
}