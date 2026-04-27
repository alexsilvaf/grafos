# grafos-frontend

Aplicação Angular responsável pela interação com o usuário do sistema
de grafos.

## Estrutura

    grafos-frontend/
    └── src/app/
        ├── app.component.*            # Layout base
        ├── app.routes.ts              # Rotas dos casos de uso
        ├── models/                    # Tipos: No, Aresta, Grafo
        ├── services/grafo.service.ts  # Cliente HTTP da API
        └── pages/
            ├── grafo/                 # UC-01: tela principal
            ├── cadastro-no/           # UC-02
            └── cadastro-aresta/       # UC-03

## Rotas

| Rota              | Componente              | Caso de Uso |
| ----------------- | ----------------------- | ----------- |
| /                 | GrafoComponent          | UC-01       |
| /cadastro-no      | CadastroNoComponent     | UC-02       |
| /cadastro-aresta  | CadastroArestaComponent | UC-03       |

## Pré-requisitos

-   **Node.js 18+** e **npm** — verifique com `node -v` e `npm -v`.
-   **Angular CLI 21+** *(opcional)* — útil para usar o comando `ng`
    diretamente:

        npm install -g @angular/cli

-   **Backend rodando** em `http://localhost:8080`. Veja
    [../grafos-backend/README.md](../grafos-backend/README.md).

## Instalação

A partir da raiz do repositório, entre na pasta do frontend e instale
as dependências:

    cd grafos-frontend
    npm install

## Execução

Em modo desenvolvimento (com recarga automática):

    ng serve

Para abrir o navegador automaticamente após o build:

    ng serve -o

A aplicação sobe em `http://localhost:4200` e espera a API em
`http://localhost:8080`.

> Sem o Angular CLI instalado globalmente, use `npx ng serve` ou
> `npm start` (atalho equivalente definido em `package.json`).

### Outros comandos úteis

    ng build                     # build de produção em dist/
    ng build --watch             # build incremental em modo dev
    ng serve --port 4300         # sobe em outra porta
    ng test                      # roda os testes unitários

## Solução de Problemas

-   **Erros de CORS no console:** confirme que o backend está rodando
    em `http://localhost:8080` e que `CorsConfig` permite a origem
    `http://localhost:4200`.
-   **`ng: command not found`:** instale o Angular CLI globalmente
    (`npm install -g @angular/cli`) ou use `npx ng <comando>`.
-   **Porta 4200 ocupada:** rode com `ng serve --port 4300`.
-   **Falha em `npm install`:** apague `node_modules/` e
    `package-lock.json` e tente novamente. Confirme a versão do
    Node.js (18+).
