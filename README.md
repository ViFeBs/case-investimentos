# case-investimentos <br /> 
projeto fullstack para cadastrar e listar clientes de um banco de investimento <br /> 

#SETUP <br /> 
o backend e o banco de dados estão em containers, então para rodar a aplicação basta um docker compose up 
eu já configurei o migration do prisma no dockerfile então assim que o compose for usado, a aplicação já
estara funcionando. <br /> 

já o frontend basta abrir um terminal na pasta e rodar um npm run dev <br /> 

#PORTAS <br /> 
Backend rodando na 3333 <br /> 
DB na 3306 (a porta local é 3307 por que a 06 não estava disponivel no meu dispositivo) <br /> 
Frontend na 3000 <br /> 

#ROTAS <br /> 
Backend: <br /> 
get /clientes Busca todos os clientes <br /> 
get /clientesporstatus Busca clientes com o status ativo <br /> 
get /clientes/:id Busca um cliente expecifico <br /> 
post /clientes cadastra um cliente <br /> 
put /clientes/:id edita um cliente <br /> 
patch /clientes/:id/inativar inativa um cliente <br /> 
patch /clientes/:id/ativar ativa um cliente <br /> 
get /ativos lista os ativos por cliente <br /> 
get /clientes/:id/ativos lista ativos de um cliente expecifico <br /> 
post /ativos/:id cadastra ativos de um cliente <br /> 

Frontend <br /> 
http://localhost:3000 tela home <br /> 
http://localhost:3000/clientes lista clientes <br /> 
http://localhost:3000/clientes/novo adiciona cliente <br /> 
http://localhost:3000/clientes/editar/(id) edita um cliente <br /> 
http://localhost:3000/ativos lista ativos por cliente <br /> 
http://localhost:3000/ativos/novo adiciona um novo ativo <br /> 
