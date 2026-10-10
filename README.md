# Sistema de Estacionamento — Frontend

Front-End mobile desenvolvido para a disciplina de **Programação para Dispositivos Móveis II**.

A aplicação foi construída utilizando **React Native com Expo e TypeScript**, consumindo uma API REST desenvolvida em **Node.js, Express, Sequelize e MySQL**.

O sistema permite realizar o gerenciamento completo de **Proprietários** e **Veículos**, incluindo o relacionamento entre as duas entidades.

## Tecnologias utilizadas

- React Native
- Expo
- Expo Router
- TypeScript
- Axios
- React Native Picker

## Funcionalidades

### Proprietários

- Listar proprietários cadastrados;
- Cadastrar proprietário;
- Editar proprietário;
- Excluir proprietário.

### Veículos

- Listar veículos cadastrados;
- Cadastrar veículo;
- Editar veículo;
- Excluir veículo;
- Associar um veículo a um proprietário;
- Exibir o nome do proprietário relacionado ao veículo.

## Estrutura do projeto

A aplicação foi organizada separando telas, componentes, configurações e lógica de acesso à API.

```text
src/
├── app/
│   ├── _layout.tsx
│   ├── index.tsx
│   │
│   ├── proprietario/
│   │   ├── index.tsx
│   │   ├── form.tsx
│   │   └── edit.tsx
│   │
│   └── veiculo/
│       ├── index.tsx
│       ├── form.tsx
│       └── edit.tsx
│
├── components/
│   ├── AppButton.tsx
│   └── FormInput.tsx
│
├── constants/
│   ├── api.ts
│   ├── homeStyles.ts
│   ├── proprietarioStyles.ts
│   └── veiculoStyles.ts
│
└── hooks/
    ├── useProprietarios.ts
    └── useVeiculos.ts
```

## Organização das pastas

### `app`

Contém as telas e rotas da aplicação utilizando o **Expo Router**.

A tela principal está em:

```text
src/app/index.tsx
```

Ela permite acessar as áreas de Proprietários e Veículos.

As telas de CRUD estão separadas em:

```text
src/app/proprietario/
src/app/veiculo/
```

Cada entidade possui:

```text
index.tsx → listagem
form.tsx  → cadastro
edit.tsx  → edição
```

### `components`

Contém componentes reutilizáveis da interface.

#### `AppButton.tsx`

Componente de botão utilizado em diferentes telas da aplicação.

Possui variações para ações como:

- ação principal;
- edição;
- exclusão.

#### `FormInput.tsx`

Componente reutilizável para os campos de formulário.

Centraliza elementos como:

- label;
- campo de entrada;
- estilos;
- propriedades do `TextInput`.

### `constants`

Contém configurações e estilos utilizados pela aplicação.

#### `api.ts`

Define o endereço utilizado para comunicação com o Back-End.

A aplicação diferencia automaticamente a execução Web e Android Emulator.

```ts
import { Platform } from 'react-native';

export const apiBaseUrl =
  Platform.OS === 'web'
    ? 'http://localhost:8081'
    : 'http://10.0.2.2:8081';
```

Na Web:

```text
http://localhost:8081
```

No Android Emulator:

```text
http://10.0.2.2:8081
```

#### Arquivos de estilos

Os estilos das telas estão separados em arquivos específicos:

```text
homeStyles.ts
proprietarioStyles.ts
veiculoStyles.ts
```

### `hooks`

Contém a lógica reutilizável responsável pela comunicação com a API.

#### `useProprietarios.ts`

Implementa as operações:

```text
GET
POST
PUT
DELETE
```

para Proprietários.

#### `useVeiculos.ts`

Implementa as operações:

```text
GET
POST
PUT
DELETE
```

para Veículos.

Essa separação evita colocar chamadas Axios diretamente dentro das telas.

## Integração com a API

A aplicação utiliza o **Axios** para realizar requisições HTTP.

O fluxo principal é:

```text
React Native
     ↓
Components / Screens
     ↓
Hooks
     ↓
Axios
     ↓
Node.js + Express
     ↓
Sequelize
     ↓
MySQL
```

Por exemplo, a consulta dos proprietários é feita pelo hook utilizando:

```ts
axios.get(`${apiBaseUrl}/proprietario`);
```

O resultado é armazenado no estado da aplicação e exibido através de uma `FlatList`.

## Relacionamento entre Proprietário e Veículo

Cada veículo possui uma referência ao proprietário através do campo:

```text
fk_proprietario
```

Durante o cadastro e edição de um veículo, a aplicação busca os proprietários existentes e apresenta as opções em um `Picker`.

Exemplo:

```text
Proprietários cadastrados

1 → Felipe
2 → João
3 → Maria
```

Ao selecionar:

```text
João
```

a aplicação envia:

```text
fk_proprietario = 2
```

para o Back-End.

Na listagem de veículos, o Front-End relaciona essa chave com os proprietários carregados e exibe o nome correspondente.

## Rotas do Front-End

O Expo Router utiliza a estrutura de arquivos para definir as rotas.

```text
/                    → Tela inicial

/proprietario        → Lista de Proprietários
/proprietario/form   → Cadastro de Proprietário
/proprietario/edit   → Edição de Proprietário

/veiculo             → Lista de Veículos
/veiculo/form        → Cadastro de Veículo
/veiculo/edit        → Edição de Veículo
```

## Instalação

Clone o repositório e acesse a pasta do projeto.

Instale as dependências:

```bash
npm install
```

Caso seja necessário instalar o Axios:

```bash
npm install axios
```

Para o componente de seleção utilizado no cadastro e edição dos veículos:

```bash
npx expo install @react-native-picker/picker
```

## Executando o projeto

Antes de iniciar o Front-End, certifique-se de que o Back-End esteja funcionando na porta:

```text
8081
```

Depois execute:

```bash
npx expo start
```

O Expo permitirá executar a aplicação em diferentes plataformas.

### Web

Pressione:

```text
w
```

ou abra a opção Web disponibilizada pelo Expo.

A aplicação utilizará:

```text
http://localhost:8081
```

para acessar a API.

### Android Emulator

Com o Android Emulator aberto, execute a aplicação pelo Expo.

Nesse ambiente, a API será acessada através de:

```text
http://10.0.2.2:8081
```

O endereço `10.0.2.2` permite que o emulador Android acesse o `localhost` do computador hospedeiro.

## Back-End

O Front-End consome a API desenvolvida separadamente para o Sistema de Estacionamento.

Repositório:

https://github.com/Felipe-SMZ/sistema-de-estacionamento-backend

Principais tecnologias do Back-End:

- Node.js
- Express
- Sequelize
- MySQL

## Fluxo do sistema

```text
Tela Inicial
   │
   ├── Proprietários
   │      ├── Listar
   │      ├── Cadastrar
   │      ├── Editar
   │      └── Excluir
   │
   └── Veículos
          ├── Listar
          ├── Cadastrar
          ├── Editar
          ├── Excluir
          └── Associar Proprietário
```

## Status do projeto

- [x] Estrutura com Expo Router
- [x] TypeScript
- [x] Integração com Axios
- [x] CRUD de Proprietários
- [x] CRUD de Veículos
- [x] Associação de Veículo com Proprietário
- [x] Componentes reutilizáveis
- [x] Hooks para acesso à API
- [x] Separação dos estilos
- [x] Navegação entre telas
- [x] Execução Web
- [x] Suporte ao Android Emulator

## Disciplina

**Programação para Dispositivos Móveis II**

Projeto desenvolvido como atividade prática utilizando:

`React Native` • `Expo` • `TypeScript` • `Axios` • `Node.js` • `Express` • `Sequelize` • `MySQL`