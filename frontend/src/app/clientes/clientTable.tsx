"use client";

// 1. Imports de bibliotecas e componentes
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api"; // Cliente HTTP (Axios)
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Cliente } from "@/types/types";
import { toast } from "sonner";

export function ClientTable() {

  const queryClient = useQueryClient();
  // Função para inativar cliente
  const handleInactivate = async (id: number) => {
    if (confirm("Tem certeza que deseja inativar este cliente?")) {
      try {
        await api.patch(`/clientes/${id}/inativar`);
        toast.success("Cliente inativado com sucesso");
        queryClient.invalidateQueries({ queryKey: ["clientes"] });
      } catch (error) {
        toast.error("Erro ao inativar cliente");
      }
    }
  };

  // Função para ativar cliente
  const handleActivate = async (id: number) => {
    if (confirm("Tem certeza que deseja ativar este cliente?")) {
      try {
        await api.patch(`/clientes/${id}/ativar`);
        toast.success("Cliente ativado com sucesso");
        queryClient.invalidateQueries({ queryKey: ["clientes"] });
      } catch (error) {
        toast.error("Erro ao ativar cliente");
      }
    }
  };

  // 2. Busca os clientes do backend usando React Query
  const { data: clients, isLoading } = useQuery({
    queryKey: ["clientes"], // Chave de cache
    queryFn: async () => {
      const res = await api.get("/clientes"); // Endpoint do seu backend

      // Ordena clientes: ativos primeiro, inativos no final
      return res.data.sort((a, b) => { //aponta erro mas está funcionando 
        if (a.status === b.status) // Se mesmo status, ordena por nome
          return a.nome.localeCompare(b.nome);
        return a.status ? -1 : 1;
      }); // Retorna os dados (array de Cliente[])
    },
  });

   // 3. Estado de carregamento
  if (isLoading) return <div>Carregando clientes...</div>;

   // 4. Renderização da tabela
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead>E-mail</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {clients?.map((cliente : Cliente) => (
          <TableRow key={cliente.id}>
            <TableCell>{cliente.nome}</TableCell>
            <TableCell>{cliente.email}</TableCell>
            <TableCell>
              <Badge variant={cliente.status ? "default" : "secondary"}>
                {cliente.status ? "Ativo" : "Inativo"}
              </Badge>
            </TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Link href={`/clientes/editar/${cliente.id}`}>
                  <Button variant="outline" size="sm">
                    Editar
                  </Button>
                </Link>
                {cliente.status ? (
                  // Botão Inativar para clientes ativos
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => handleInactivate(cliente.id)}
                  >
                    Inativar
                  </Button>
                ) : (
                  // Botão Ativar para clientes inativos
                  <Button 
                    variant="success" 
                    size="sm"
                    onClick={() => handleActivate(cliente.id)}
                  >
                    Ativar
                  </Button>
                )}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}