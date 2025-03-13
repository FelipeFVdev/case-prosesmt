# Case Prosesmt

Este é um projeto desenvolvido com [Next.js](https://nextjs.org), criado para gerenciar e exibir dados relacionados à COVID-19 no Brasil e no mundo. Ele utiliza APIs públicas para buscar informações atualizadas sobre casos, mortes, recuperações e outras estatísticas importantes.

## Funcionalidades

- **Busca por Estados do Brasil**: Permite consultar dados específicos de cada estado brasileiro.
- **Busca por Data**: Exibe informações de casos em uma data específica.
- **Busca Global**: Mostra dados de diferentes países ao redor do mundo.
- **Visualização de JSON**: Exibe os dados em formato JSON para facilitar a análise.
- **Feedback Visual**: Utiliza notificações (toasts) para informar o status das requisições (carregando, sucesso ou erro).
- **Interface Responsiva**: Adaptada para diferentes tamanhos de tela, garantindo uma boa experiência em dispositivos móveis e desktops.

## Tecnologias Utilizadas

- **Next.js**: Framework React para renderização no lado do servidor e construção de aplicações web modernas.
- **React Hook Form**: Gerenciamento de formulários com validação simplificada.
- **Zod**: Biblioteca para validação de esquemas de dados.
- **Sonner**: Biblioteca para exibição de notificações (toasts).
- **Tailwind CSS**: Framework CSS para estilização rápida e responsiva.
- **Lucide Icons**: Ícones modernos e personalizáveis.

## Como Iniciar o Projeto

Primeiro, instale as dependências:

```bash
npm install
# ou
yarn install
# ou
pnpm install
```

Depois, inicie o servidor de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador para visualizar o projeto.

## Estrutura do Projeto

- **`components`**: Contém os componentes reutilizáveis, como botões, cards e modais.
- **`app`**: Diretório principal do Next.js, onde estão as páginas e rotas do projeto.
- **`context`**: Gerencia o estado global, como os dados de estados brasileiros.
- **`lib`**: Contém utilitários e funções auxiliares.
- **`styles`**: Configurações de estilos globais.

## Funcionalidades em Detalhe

### Busca por Estados

- O usuário pode selecionar um estado brasileiro para visualizar dados específicos, como número de casos, mortes e recuperações.

### Busca por Data

- Permite consultar dados de COVID-19 em uma data específica, utilizando um campo de entrada formatado.

### Busca Global

- Exibe informações de diferentes países, permitindo comparar estatísticas globais.

### Visualização de JSON

- Um modal exibe os dados em formato JSON, permitindo copiar as informações para análise ou uso externo.

### Feedback Visual

- Notificações são exibidas para informar o status das requisições:
  - **Carregando**: Indica que os dados estão sendo buscados.
  - **Sucesso**: Informa que os dados foram carregados com sucesso.
  - **Erro**: Notifica caso ocorra algum problema na requisição.

## Aprenda Mais

Para saber mais sobre Next.js, confira os seguintes recursos:

- [Documentação do Next.js](https://nextjs.org/docs) - Saiba mais sobre as funcionalidades e API do Next.js.
- [Tutorial Interativo de Next.js](https://nextjs.org/learn) - Um tutorial interativo para aprender Next.js.

## Deploy na Vercel

A maneira mais fácil de fazer o deploy do seu aplicativo Next.js é usando a [Plataforma Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme), criada pelos desenvolvedores do Next.js.

Confira nossa [documentação de deploy do Next.js](https://nextjs.org/docs/app/building-your-application/deploying) para mais detalhes.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests no repositório.

## Licença

Este projeto está licenciado sob a [MIT License](https://opensource.org/licenses/MIT).
