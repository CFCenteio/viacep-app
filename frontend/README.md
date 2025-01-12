
# Consulta CEP App - Frontend

Esta é a aplicação frontend da solução de Consulta de CEP e Gerenciamento de Endereços. Ela permite ao usuário inserir um CEP para buscar automaticamente o endereço usando a API ViaCEP, preencher dados pessoais (nome e CPF) e visualizar uma listagem de endereços salvos. A aplicação utiliza React, TanStack Query para gerenciamento de dados assíncronos e Axios para requisições HTTP.

## Tecnologias Utilizadas

- [React](https://reactjs.org/)
- [TanStack Query (@tanstack/react-query)](https://tanstack.com/query/latest)
- [Axios](https://axios-http.com/)
- CSS para estilização

## Instalação

1. **Clone o repositório:**
   ```bash
   git clone <URL-DO-SEU-REPOSITORIO>
   cd consulta-cep-app
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

## Configuração de Ambiente

Crie um arquivo `.env` na raiz do projeto para definir variáveis de ambiente, se necessário. Por exemplo:
```
REACT_APP_API_URL=http://localhost:8080
```
Essa variável será usada para configurar a URL base da API backend no arquivo `src/api.js`.

## Execução em Ambiente de Desenvolvimento

Para iniciar a aplicação:
```bash
npm start
```
O servidor de desenvolvimento iniciará em [http://localhost:3000](http://localhost:3000).

## Estrutura do Projeto

```
consulta-cep-app/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── AddressForm.jsx
│   │   └── AddressList.jsx
│   ├── api.js
│   ├── App.jsx
│   ├── App.css
│   ├── index.js
│   └── index.css
├── .env
├── package.json
└── README.md
```

- **src/components/AddressForm.jsx:**  
  Formulário para entrada de CEP, nome, CPF. Busca automaticamente os dados do endereço via API ViaCEP e envia para o backend.

- **src/components/AddressList.jsx:**  
  Lista de endereços salvos. Utiliza TanStack Query para buscar dados da API ou usar dados mock caso o backend esteja offline. Permite a exclusão de itens.

- **src/api.js:**  
  Configuração do Axios para definir a URL base e cabeçalhos para as requisições HTTP.

- **src/App.jsx:**  
  Componente raiz que incorpora `AddressForm` e `AddressList`.

- **src/index.js:**  
  Ponto de entrada da aplicação. Configura o React Query Provider e renderiza o componente `App`.

## Funcionalidades

- **Consulta de CEP:** Ao inserir um CEP válido, os campos de logradouro, bairro, cidade e estado são preenchidos automaticamente usando a API ViaCEP.
- **Formulário de Dados Pessoais:** Permite inserir nome e CPF junto com os dados do endereço.
- **Listagem de Endereços:** Exibe uma lista de endereços salvos com opções para exclusão.
- **Dados Mock:** Se o backend estiver offline, a aplicação utiliza dados mock para exibir exemplos na lista.
- **Gerenciamento de Estado com TanStack Query:** Simplifica requisições assíncronas, cache e atualização de dados.

## Scripts Disponíveis

No diretório do projeto, você pode executar:

### `npm start`
Inicia o servidor de desenvolvimento e abre a aplicação em [http://localhost:3000](http://localhost:3000).

### `npm run build`
Cria a versão de produção da aplicação no diretório `build`.

## Observações

- Certifique-se de que o backend esteja em execução e acessível na URL configurada em `REACT_APP_API_URL`. Caso contrário, o componente `AddressList` exibirá dados mock.
- As atualizações e exclusões usam a API definida no backend. Se estiver offline, apenas a listagem usará dados simulados.

## Licença

Este projeto está licenciado sob a MIT License.
