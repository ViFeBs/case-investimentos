import { AssetForm } from "../assetForm";
import { api } from "@/lib/api";

export default async function NovoAtivoPage() {
  // Buscar clientes ativos para o formulário
  const getClientesAtivos = async () => {
    try {
      const res = await api.get("/clientesporstatus", { 
            params: {
                status: "ativo"
            }
        });
        return res.data;
        } catch (error) {
        console.error("Erro ao buscar clientes ativos:", error);
        return [];
        }
    };

  const clientes = await getClientesAtivos();

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Cadastrar Novo Ativo</h1>
          <p className="text-sm text-gray-500">
            Preencha os detalhes do ativo e selecione o cliente
          </p>
        </div>
      </div>

      <AssetForm clientes={clientes} />
    </div>
  );
}