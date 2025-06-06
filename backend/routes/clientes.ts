import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function clienteRoutes(app: FastifyInstance) {
  //Buscar Clientes
  app.get('/clientes', async () => {
    return prisma.cliente.findMany({ include: { ativos: true }, orderBy: [
      { status: 'desc' }, // Ativos primeiro (status true)
      { nome: 'asc' }     // Ordena por nome
    ]})
  })

  //Buscar com status ativo
  app.get('/clientesporstatus', async (request) => {
    const querySchema = z.object({
      status: z.enum(['ativo', 'inativo']).optional(),
    });

    // Validar query params
    const { status } = querySchema.parse(request.query);

    // Converter status para booleano
    let statusBool: boolean | undefined;
    if (status === 'ativo') statusBool = true;
    if (status === 'inativo') statusBool = false;

    return prisma.cliente.findMany({
      where: statusBool !== undefined ? { status: statusBool } : undefined,
      include: {
        ativos: {
          select: {
            id: true,
            nome: true,
            valorAtual: true,
          }
        }
      }
    });
  });

  //busca clientes especificos
  app.get('/clientes/:id', async (request) => {
    const paramsSchema = z.object({
      id: z.string().transform(Number), // Converte string para number
    });
    
    // Extrai e valida o ID da URL
    const { id } = paramsSchema.parse(request.params);

    // Busca o cliente específico pelo ID
    const cliente = await prisma.cliente.findUnique({
      where: { id }, // Filtra pelo ID
      include: { ativos: true }, // Inclui os ativos relacionados
    });

    // Se não encontrar o cliente, retorna 404
    if (!cliente) {
      throw new Error('Cliente não encontrado');
    }

    return cliente;
  })

  //Cadastrar clientes
  app.post('/clientes', async (request, reply) => {
    const bodySchema = z.object({
      nome: z.string(),
      email: z.string().email(),
      status: z.boolean(),
    })

    const data = bodySchema.parse(request.body)

    const cliente = await prisma.cliente.create({ data })
    return reply.code(201).send(cliente)
  })

  //Editar
  app.put('/clientes/:id', async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string().transform(Number),
    })

    const bodySchema = z.object({
      nome: z.string(),
      email: z.string().email(),
      status: z.boolean(),
    })

    const { id } = paramsSchema.parse(request.params)
    const data = bodySchema.parse(request.body)

    const cliente = await prisma.cliente.update({
      where: { id },
      data,
    })

    return reply.send(cliente)
  })

  // inativar
  app.patch('/clientes/:id/inativar', async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string().transform(Number),
    });
    
    const { id } = paramsSchema.parse(request.params);

    try {
      const cliente = await prisma.cliente.update({
        where: { id },
        data: { status: false },
      });

      return reply.send(cliente);
    } catch (error) {
      return reply.status(404).send({ error: "Cliente não encontrado" });
    }
  });

  //ativar
  app.patch('/clientes/:id/ativar', async (request, reply) => {
  const paramsSchema = z.object({
    id: z.string().transform(Number),
  });
  
  const { id } = paramsSchema.parse(request.params);

  try {
    const cliente = await prisma.cliente.update({
      where: { id },
      data: { status: true },
    });

    return reply.send(cliente);
  } catch (error) {
    return reply.status(404).send({ error: "Cliente não encontrado" });
  }
});
}