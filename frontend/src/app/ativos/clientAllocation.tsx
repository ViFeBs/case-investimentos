"use client";

import { Progress } from "@/components/ui/progress";
import { Ativo } from "@/types/types"; // Importe o tipo

export function AssetAllocation({ 
  ativo, 
  valorTotalPortfolio 
}: {
  ativo: Ativo; // Use o tipo definido
  valorTotalPortfolio: number;
}) {
  // Calcular a alocação percentual
  const alocacaoPercentual = valorTotalPortfolio > 0 
    ? (ativo.valorAtual / valorTotalPortfolio) * 100 
    : 0;

  return (
    <div className="border rounded-lg p-3">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium">{ativo.nome}</h3>
          <p className="text-sm text-gray-500">
            Valor: {ativo.valorAtual.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL"
            })}
          </p>
        </div>
        <p className="font-medium">
          {alocacaoPercentual.toFixed(2)}%
        </p>
      </div>
      
      <div className="mt-2">
        <div className="flex justify-between text-xs mb-1">
          <span>Alocação no Portfólio</span>
          <span>{alocacaoPercentual.toFixed(2)}%</span>
        </div>
        <Progress value={alocacaoPercentual} className="h-2" />
      </div>
    </div>
  );
}