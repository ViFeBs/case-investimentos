import { AssetTable } from "./assetTable";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";
import { Cliente } from "@/types/types"; 

export default async function AtivosPage() {
  const getClientesComAtivos = async (): Promise<Cliente[]> => {
        try {
        const res = await api.get("/clientes?include=ativos");
        return res.data;
        } catch (error) {
        console.error("Erro ao buscar clientes:", error);
        return [];
        }
  };

  const clientes = await getClientesComAtivos();

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Ativos Financeiros por Cliente</h1>
          <p className="text-sm text-gray-500">
            Visualize os ativos e alocações de cada cliente
          </p>
        </div>
        
        <div className="flex gap-2">
            <Link href="/">
            <Button variant="outline">Voltar para Home</Button>
            </Link>
            <Link href="/ativos/novo">
            <Button>Novo Ativo</Button>
            </Link>
        </div>
      </div>
      
      <div className="space-y-6">
        {clientes.map((cliente) => (
          <AssetTable key={cliente.id} cliente={cliente} />
        ))}
        
        {clientes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              Nenhum cliente cadastrado ou com ativos
            </p>
          </div>
        )}
      </div>
    </div>
  );
}