## Bankme teste

Olá,
sou o Thiago Santos e esse é meu teste para o Bank me

# Backend

Para rodar o backend basta entrar na pasta de backend
Rodar o comando para rodar as dependências necessárias

```sh
npm install
```

Em seguida rodar o comando para iniciar o servidor

```sh
npm run start:dev
```

O backend estará rodando na

```sh
porta 3001
```

# Frontend

Para rodar o frontend basta entrar na pasta de frontend
Rodar o comando para rodar as dependências necessárias

```sh
npm install
```

Em seguida rodar o comando para iniciar o servidor

```sh
npm run dev
```

O frontend estará rodando na

```sh
porta 3000
```

# Tecnologias

O backend foi feito NestJS, utilizando o Prisma como ORM e o SQLite como bando de dados.
No sistema de login um JWT é gerado com um prazo de validação de 1 minuto antes de expirar,
As rotas estão sendo protegidas e só poderão serem acessadas depois do login
Também possui um arquivo de docker caso seja necessario

O frontend foi feito em NextJS, utilizando Tailwind para a estilização e Shadcn para a componentezição de algumas coisas.
Foi utilizado Zod e React Hook Form para as validações dos formulários

Para acessar a aplicação pode ser usado:

```sh
login: aprovame
password: aprovame
```

Contato: thiago.sullivan.dev@gmail.com
