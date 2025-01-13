# ViaCEP App

## Função

O ViaCEP App é uma aplicação web que permite aos usuários consultar endereços a partir de um CEP utilizando a API ViaCEP. Além disso, o sistema permite gerenciar essas informações, como salvar, listar e editar os dados de endereços no banco de dados. O projeto foi desenvolvido utilizando o modelo arquitetural **MVC** (Model-View-Controller), separando claramente as responsabilidades entre os dados, a lógica de negócios e a interface do usuário.

---

## Funcionamento

1. **Consulta de Endereço:**

   - O usuário insere um CEP no formulário e a aplicação realiza uma chamada à API ViaCEP para buscar os dados do endereço.
   - Os dados retornados incluem logradouro, bairro, cidade e estado.

2. **Gerenciamento de Dados:**

   - O sistema salva os endereços consultados em um banco de dados.
   - Permite listar, editar e atualizar as informações diretamente na interface.

---

## Tecnologias Utilizadas

### Backend

- **Java** com o framework **Spring Boot**:
  - Gerenciamento de requisições HTTP.
  - Integração com a API ViaCEP.
  - Persistência de dados utilizando **Spring Data JPA** e banco de dados **MySQL**.
  - Auxílio no gerenciamento de dependências e build utilizando **Maven**.

### Frontend

- **React** com **Vite**:
  - Construção de uma interface responsiva e interativa para os usuários.
  - Ambiente de desenvolvimento rápido e otimizado.
- **ShadCN**:
  - Uso de componentes estilizados para uma interface moderna e consistente.

---

## Instruções de Instalação

1. Clone o repositório do GitHub para o seu ambiente local:

   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd viacep-app
   ```

2. Configure e inicie o **Frontend**:

   - Navegue até o diretório `frontend`:
     ```bash
     cd frontend
     ```
   - Instale as dependências do React:
     ```bash
     npm install
     ```
   - Inicie o servidor de desenvolvimento do React:
     ```bash
     npm run dev
     ```

3. Configure e inicie o **Backend**:

   - Retorne ao diretório principal do projeto:
     ```bash
     cd ..
     ```
   - Compile o projeto utilizando o Maven:
     ```bash
     mvn clean install
     ```
   - Inicie o servidor Spring Boot:
     ```bash
     mvn spring-boot:run
     ```

---

## Estrutura Básica do Projeto

Abaixo está a estrutura do projeto para facilitar a navegação e compreensão:

```
viacep-app/
├── frontend/
│   ├── node_modules/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── App.jsx
│       ├── api.js
│       ├── index.js
│       └── ...
├── src/
│   └── main/
│       ├── java/com/example/
│       │   ├── config/
│       │   ├── controller/
│       │   ├── model/
│       │   ├── repository/
│       │   └── service/
│       ├── resources/
│       │   ├── static/
│       │   ├── templates/
│       │   └── application.properties
├── target/
├── pom.xml
├── README.md
└── ...
```
