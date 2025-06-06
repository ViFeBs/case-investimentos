# case-investimentos /n
projeto fullstack para cadastrar e listar clientes de um banco de investimento /n

#SETUP /n
o backend e o banco de dados estão em containers, então para rodar a aplicação basta um docker compose up 
eu já configurei o migration do prisma no dockerfile então assim que o compose for usado, a aplicação já
estara funcionando. /n

já o frontend basta abrir um terminal na pasta e rodar um npm run dev /n

#PORTAS /n
Backend rodando na 3333 /n
DB na 3306 (a porta local é 3307 por que a 06 não estava disponivel no meu dispositivo) /n
Frontend na 3000 /n

#ROTAS
Backend:
get /clientes Busca todos os clientes
get /clientesporstatus Busca clientes com o status ativo
get /clientes/:id Busca um cliente expecifico
post /clientes cadastra um cliente
put /clientes/:id edita um cliente
patch /clientes/:id/inativar inativa um cliente
patch /clientes/:id/ativar ativa um cliente
get /ativos lista os ativos por cliente
get /clientes/:id/ativos lista ativos de um cliente expecifico
post /ativos/:id cadastra ativos de um cliente

Frontend
http://localhost:3000 tela home
http://localhost:3000/clientes lista clientes
http://localhost:3000/clientes/novo adiciona cliente
http://localhost:3000/clientes/editar/(id) edita um cliente
http://localhost:3000/ativos lista ativos por cliente
http://localhost:3000/ativos/novo adiciona um novo ativo
