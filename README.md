# Projeto API

## Visão Geral
Este projeto é uma API construída com Node.js e Express. Ela fornece endpoints para gerenciar linguagens de programação e autenticação de usuários. A API interage com um banco de dados para realizar operações CRUD em dados de linguagens e informações de usuários.

## Estrutura do Projeto
```
API
├── database
│   ├── cadLanguage.js   # Definição do modelo para linguagens de programação
│   ├── cadUser.js       # Definição do modelo para usuários
│   └── database.js      # Configuração da conexão com o banco de dados
├── index.js             # Ponto de entrada da aplicação
└── README.md            # Documentação do projeto
```

## Funcionalidades
- **Gerenciamento de Linguagens**: Criar, ler, atualizar e deletar linguagens de programação.
- **Autenticação de Usuários**: Registrar e autenticar usuários utilizando tokens JWT.
- **Suporte a CORS**: Permite requisições de origens diferentes para a API.

## Instalação
1. Clone o repositório:
   ```
   git clone <repository-url>
   ```
2. Navegue até o diretório do projeto:
   ```
   cd API
   ```
3. Instale as dependências necessárias:
   ```
   npm install
   ```

## Uso
1. Inicie o servidor:
   ```
   node index.js
   ```
   A API estará disponível em `http://localhost:1234`.

2. Use ferramentas como Postman ou Thunder Client para interagir com os endpoints da API.

## Endpoints da API
### Linguagens
- `GET /languages`: Recupera todas as linguagens de programação.
- `GET /language/:id`: Recupera uma linguagem específica pelo ID.
- `POST /language`: Cria uma nova linguagem de programação.
- `PUT /language/:id`: Atualiza uma linguagem existente pelo ID.
- `DELETE /language/:id`: Deleta uma linguagem pelo ID.

### Autenticação
- `POST /auth`: Autentica um usuário e retorna um token JWT.

## Banco de Dados
O projeto utiliza uma conexão com banco de dados definida em `database/database.js`. Certifique-se de que seu banco de dados está configurado corretamente antes de executar a aplicação.

## Licença
Este projeto está licenciado sob a Licença MIT. Consulte o arquivo LICENSE para mais detalhes.