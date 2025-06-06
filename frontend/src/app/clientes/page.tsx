import { ClientTable } from "./clientTable";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ClientesPage() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Clientes</h1>
          <p className="text-sm text-gray-500">Lista de todos os clientes cadastrados</p>
        </div>
        
        <div className="flex gap-2">
          {/* Botão Voltar para Home */}
          <Link href="/">
            <Button variant="outline">Voltar para Home</Button>
          </Link>
          
          <Link href="/clientes/novo">
            <Button>Adicionar Cliente</Button>
          </Link>
        </div>
      </div>
      
      <ClientTable />
    </div>
  );
}