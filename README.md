# 🎫 Processo seletivo Neki - Frontend

Interface web para gerenciamento de eventos com autenticação de administradores.

## 🚀 Tecnologias

- React
- HTML5
- CSS3
- JavaScript (ES6+)

## 📋 Funcionalidades

- ✅ Tela de login de administrador
- ✅ Tela de cadastro de administrador
- ✅ Home com listagem de eventos
- ✅ Criar novos eventos
- ✅ Editar eventos existentes
- ✅ Excluir eventos
- ✅ Interface responsiva e intuitiva

## 🔧 Pré-requisitos

Antes de começar, você precisa ter instalado:

- [Node.js](https://nodejs.org/) (versão 14 ou superior)
- [npm](https://www.npmjs.com/)
- [VSCode](https://code.visualstudio.com/) (recomendado)

## 📦 Como Usar

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/aprimora-frontend.git
cd aprimora-frontend
```

### 2. Instale as dependências

Usando npm:
```bash
npm install
```

### 3. Configure a conexão com o backend

Certifique-se de que o backend da Plataforma Aprimora está rodando. Por padrão, a API deve estar disponível em:
```
http://localhost:8080
```

Se necessário, ajuste a URL da API no arquivo de configuração do projeto.

### 4. Execute o projeto

Usando npm:
```bash
npm start
```

O projeto será aberto automaticamente no navegador em:
```
http://localhost:3000
```

### 5. Acesse as funcionalidades

- **Login**: Acesse a tela de login e entre com suas credenciais
- **Cadastro**: Crie uma nova conta de administrador
- **Home**: Visualize todos os eventos cadastrados
- **Gerenciar Eventos**: Crie, edite ou exclua eventos conforme necessário

## 🎨 Estrutura do Projeto

```
aprimora-frontend/
├── public/
├── src/
│   ├── components/     # Componentes React
│   ├── pages/         # Páginas da aplicação
│   ├── services/      # Serviços de API
│   ├── styles/        # Arquivos CSS
│   └── App.js         # Componente principal
├── package.json
└── README.md
```

## 🔐 Fluxo de Autenticação

1. Cadastre um administrador na tela de cadastro
2. Faça login com as credenciais criadas
3. O token JWT será armazenado automaticamente
4. Acesse a home e gerencie os eventos

## 🛠️ Scripts Disponíveis

- `npm start` - Inicia o servidor de desenvolvimento
- `npm build` - Cria a versão de produção otimizada
- `npm test` - Executa os testes
- `npm eject` - Ejeta as configurações do Create React App (irreversível)

## 🌐 Integração com Backend

Este frontend consome a API REST do Processo seletivo Neki - Backend. Certifique-se de:

- O backend está rodando em `http://localhost:8080`
- As rotas da API estão acessíveis
- O CORS está configurado corretamente no backend

## 📱 Telas Disponíveis

### Login
Tela de autenticação onde administradores fazem login no sistema.

### Cadastro
Tela para registro de novos administradores.

### Home
Dashboard principal com:
- Lista de todos os eventos
- Botão para criar novo evento
- Opções de editar e excluir para cada evento

## 👨‍💻 Autor

**Alexandre Lício da Silva Morais**

Desenvolvido como parte do processo seletivo Residência NEKI 2025.

## 📄 Licença

Este projeto está sob a licença MIT.
