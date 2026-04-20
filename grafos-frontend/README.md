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

## Execução

    npm install
    npm start

A aplicação sobe em `http://localhost:4200` e espera a API em
`http://localhost:8080`.
