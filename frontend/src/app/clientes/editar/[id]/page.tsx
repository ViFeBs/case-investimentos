"use client";

// Página de edição de cliente
import { ClientForm } from "../../clientForm";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { use, useEffect, useState } from "react";
import { Cliente } from "@/types/types";
import { boolean, string } from "zod";

// Tipagem para as props do componente
interface PageParams {
    id:string;
}


export default function EditarClientePage({
   params,
}: {
  params: Promise<PageParams>;
}) { 
  const { id } = use(params) as PageParams;
  const router = useRouter();
  const [cliente, setCliente] = useState<{
    nome: string;
    email: string;
    status: boolean;
  } | null>(null); // Tipagem para o estado
  const [loading, setLoading] = useState<boolean>(true); // Tipagem para o loading

  //DEBUG: verifica o id recebido
  console.log("ID RECEBIDO NOS PARAMS:", id);

  // Busca os dados do cliente ao carregar a página
  useEffect(() => {
    async function fetchCliente() {
      try {
        const response = await api.get(`/clientes/${id}`); // Tipagem da resposta
        setCliente(response.data);
      } catch (error) {
        console.error("Erro ao buscar cliente:", error);
        toast.error("Cliente não encontrado");
        router.push("/clientes");
      } finally {
        setLoading(false);
      }
    }
    if (id) { //Garantir que id existe antes de fazer a requisição
      fetchCliente();
    }
  }, [id, router]);

  // Função para lidar com a submissão do formulário
  const handleSubmit = async (data: { nome: string; email: string; status: boolean }) => {
        try {
            const url = `/clientes/${id}`;
            console.log("URL da requisição:", url);
            console.log("Dados enviados:", data);
            await api.put(`/clientes/${id}`, data );
            toast.success("Cliente atualizado com sucesso!");
            router.push("/clientes");
        } catch (error) {
            console.error("Erro ao atualizar cliente:", error);
            toast.error("Erro ao atualizar cliente");
        }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!cliente) {
    return <div>Cliente não encontrado</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Editar Cliente</h1>
      <ClientForm 
        onSubmit={handleSubmit} 
        defaultValues={cliente} 
        isEditing={true} 
      />
    </div>
  );
}