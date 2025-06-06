"use client";

// Importações necessárias
import { ClientForm } from "../clientForm"; // Importe o formulário já criado
import { api } from "@/lib/api"; // Configuração do Axios
import { useRouter } from "next/navigation"; // Navegação programática
import { toast } from "sonner"; // Para feedback visual 

export default function NovoClientePage() {
  const router = useRouter(); // Hook para redirecionamento

  // Função chamada ao submeter o formulário
  const handleSubmit = async (data: { nome: string; email: string; status: boolean }) => {
    try {
      // Envia os dados para o backend
      await api.post("/clientes", data);
      
      // Feedback visual 
      toast.success("Cliente cadastrado com sucesso!");
      
      // Redireciona de volta para a lista de clientes
      router.push("/clientes");
    } catch (error) {
      toast.error("Erro ao cadastrar cliente.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Adicionar Cliente</h1>
      {/* Reutiliza o ClientForm, passando a função de submit */}
      <ClientForm onSubmit={async (data) => {
        await api.post("/clientes", data);
        router.push("/clientes");
        }} />
    </div>
  );
}