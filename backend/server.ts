import Fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import { clienteRoutes } from './routes/clientes';
import { ativoRoutes } from './routes/ativos';

const app = Fastify();

app.register(fastifyCors, {
  origin: 'http://localhost:3000', // Permite apenas o frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
  credentials: true, // Permite cookies e autenticação
});
app.register(clienteRoutes);
app.register(ativoRoutes);

app.listen({ port: 3333, host: '0.0.0.0' }, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log('🚀 Servidor backend rodando na porta 3333')
});