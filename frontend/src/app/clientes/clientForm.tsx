"use client";

// Importações de bibliotecas e componentes
import { useForm } from "react-hook-form"; // Para gerenciar formulários
import { zodResolver } from "@hookform/resolvers/zod"; // Integração do Zod com react-hook-form
import { z } from "zod"; // Validação de esquemas
import { Button } from "@/components/ui/button"; // Componente de botão do ShadCN
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form"; // Componentes de formulário do ShadCN
import { Input } from "@/components/ui/input"; // Componente de input do ShadCN
import { Cliente } from "@/types/types";

// 1. Definição do Esquema de Validação com Zod
const formSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"), // Nome deve ter pelo menos 1 caractere
  email: z.string().email("E-mail inválido"), // Deve ser um e-mail válido
  status: z.boolean(),
});

// 2. Tipagem das Props do Componente
type ClientFormProps = {
  onSubmit: (data: { nome: string; email: string; status: boolean }) => void;
  defaultValues?: Partial<Cliente>; // Função chamada ao submeter
  isEditing?: boolean; // Flag para indicar modo de edição
};

// 3. Componente Principal
export function ClientForm({ onSubmit, defaultValues, isEditing = false  }: ClientFormProps) {
  // Configuração do formulário com react-hook-form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema), // Integra Zod com react-hook-form
    defaultValues: defaultValues || { // Valores iniciais para evitar erro
      nome: "",
      email: "",
      status: true,
    },
  });

  // 4. Renderização do Formulário
  return (
    <Form {...form}> {/* Provider do formulário */}
      <form 
        onSubmit={form.handleSubmit(onSubmit)} // Submete os dados validados
        className="space-y-4" // Espaçamento entre os campos
      >
        {/* Campo do Nome */}
        <FormField
          control={form.control} // Controle do react-hook-form
          name="nome" // Nome do campo no esquema
          render={({ field }) => ( // Renderização do campo
            <FormItem>
              <FormLabel>Nome</FormLabel> {/* Rótulo do campo */}
              <FormControl>
                <Input 
                  placeholder="Nome" 
                  {...field} // Spread das props do react-hook-form (onChange, onBlur, value)
                />
              </FormControl>
              <FormMessage /> {/* Exibe mensagens de erro */}
            </FormItem>
          )}
        />

        {/* Campo do E-mail */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input 
                  placeholder="exemplo@email.com" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Botão de Submissão */}
        <Button type="submit">
          {isEditing ? "Atualizar Cliente" : "Cadastrar Cliente"}
        </Button>
      </form>
    </Form>
  );
}