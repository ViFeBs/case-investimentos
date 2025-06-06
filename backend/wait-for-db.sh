#!/bin/sh

host="$1"
port="$2"
shift 2
cmd="$@"

until nc -z "$host" "$port"; do
  echo "Esperando o banco de dados em $host:$port..."
  sleep 1
done

echo "Banco de dados está pronto - executando comando: $cmd"
exec $cmd