import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8">
      <h1 className="text-4xl font-bold text-center">Sistema de Gestão de Investimentos</h1>
      
      <div className="flex flex-col gap-4 w-full max-w-md">
        <Link href="/clientes" className="w-full">
          <Button className="w-full py-6 text-lg">Ver Clientes</Button>
        </Link>
        
        <Link href="/ativos" className="w-full">
          <Button className="w-full py-6 text-lg">Ver Ativos</Button>
        </Link>
      </div>
      
      <div className="mt-8 text-center text-gray-500">
        <p>Sistema para gerenciamento de clientes e ativos financeiros</p>
      </div>
    </div>
  );
}