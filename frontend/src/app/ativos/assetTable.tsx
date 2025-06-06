"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AssetAllocation } from "./clientAllocation";
import { Cliente } from "@/types/types"; // Importe o tipo

export function AssetTable({ cliente }: { cliente: Cliente }) {
  // Calcular o valor total do portfólio (soma de todos os valores dos ativos)
  const valorTotalPortfolio = cliente.ativos.reduce(
    (total, ativo) => total + ativo.valorAtual,
    0
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center gap-2">
              {cliente.nome}
              <Badge variant={cliente.status ? "default" : "secondary"}>
                {cliente.status ? "Ativo" : "Inativo"}
              </Badge>
            </CardTitle>
            <p className="text-sm text-gray-500">{cliente.email}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium mb-2">Ativos do Cliente</p>
            <div className="space-y-3">
              {cliente.ativos.map((ativo) => (
                <AssetAllocation 
                  key={ativo.id}
                  ativo={ativo}
                  valorTotalPortfolio={valorTotalPortfolio}
                />
              ))}
              
              {cliente.ativos.length === 0 && (
                <p className="text-gray-500 text-center py-4">
                  Este cliente não possui ativos financeiros
                </p>
              )}
            </div>
          </div>
          
          {cliente.ativos.length > 0 && (
            <div className="flex justify-between border-t pt-3">
              <p className="font-medium">Valor Total do Portfólio</p>
              <p className="font-medium">
                {valorTotalPortfolio.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL"
                })}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}