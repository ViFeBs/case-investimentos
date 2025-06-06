import { FastifyInstance } from 'fastify'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'

const prisma = new PrismaClient()

export async function ativoRoutes(app: FastifyInstance) {
  // Listar todos os ativos com nome do cliente
  app.get('/ativos', async () => {
    return prisma.ativo.findMany({
      include: { cliente: true },
    })
  })

  // Listar ativos por cliente
  app.get('/clientes/:id/ativos', async (request) => {
    const paramsSchema = z.object({
      id: z.string().transform(Number),
    })

    const { id } = paramsSchema.parse(request.params)

    const ativos = await prisma.ativo.findMany({
      where: { clienteId: id },
    })

    return ativos
  })

  // Criar novo ativo para um cliente
  app.post('/ativos/:id', async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string().transform(Number),
    })

    const bodySchema = z.object({
      nome: z.string(),
      valorAtual: z.number(),
    })

    const { id: clienteId } = paramsSchema.parse(request.params)
    const data = bodySchema.parse(request.body)

    const cliente = await prisma.cliente.findUnique({ where: { id: clienteId } })

    if (!cliente) {
      return reply.status(404).send({ message: 'Cliente não encontrado' })
    }

    const ativo = await prisma.ativo.create({
      data: {
        nome: data.nome,
        valorAtual: data.valorAtual,
        clienteId,
      },
    })

    return reply.code(201).send(ativo)
  })
}