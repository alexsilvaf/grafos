# Sistema de Grafos

## 1. Descrição do Sistema

O sistema tem como objetivo permitir o cadastro de nós e arestas de um
grafo, possibilitando a construção de uma rede de conexões entre
diferentes pontos. A partir dessas informações será possível representar
a estrutura do grafo e posteriormente aplicar algoritmos de análise de
caminhos.

A aplicação será desenvolvida utilizando uma arquitetura dividida em
três camadas:

-   **Frontend:** interface web desenvolvida em Angular, responsável
    pela interação com o usuário.
-   **Backend (API):** serviço desenvolvido com Java e Spring Boot
    responsável por processar as requisições do sistema.
-   **Camada de Lógica:** implementação da lógica de manipulação e
    processamento do grafo desenvolvida na linguagem C.

Essa separação de responsabilidades permite maior organização,
manutenção e escalabilidade do sistema.

------------------------------------------------------------------------

## 2. Arquitetura do Sistema

O funcionamento do sistema ocorre da seguinte forma:

1.  O usuário acessa a aplicação através da interface web.
2.  O frontend envia requisições para a API.
3.  A API recebe os dados e processa as solicitações.
4.  A lógica implementada em C realiza o processamento das estruturas de
    grafos.
5.  Os resultados são retornados para a API.
6.  A API envia a resposta para o frontend, que apresenta as informações
    ao usuário.

------------------------------------------------------------------------

## 3. Estrutura do Projeto

    grafos/
    ├── documentacao/        # Casos de uso (UC-01, UC-02, UC-03)
    ├── grafos-backend/      # API Spring Boot + lógica em C
    ├── grafos-frontend/     # Aplicação Angular
    └── telas-referencia/    # Imagens de referência das telas

------------------------------------------------------------------------

## 4. Casos de Uso

-   [UC-01 -- Exibição do Grafo](documentacao/uc-01--exibicao-do-grafo.md)
-   [UC-02 -- Cadastro de Nós](documentacao/uc-02--cadastro-de-nos.md)
-   [UC-03 -- Cadastro de Arestas e Custos](documentacao/uc-03--cadastro-de-arestas-e-custos.md)

------------------------------------------------------------------------

## 5. Pré-requisitos

Antes de começar, instale as ferramentas abaixo:

-   **Git** 2.30+ — controle de versão
-   **Java 21** (JDK) — execução do backend
-   **GCC** (Linux/Mac) ou **MinGW-w64** (Windows) — compilação da
    lógica em C
-   **Make** — orquestração da compilação em C
-   **Node.js 18+** e **npm** — execução do frontend
-   **Angular CLI 21+** *(opcional, instalado globalmente)*:
    `npm install -g @angular/cli`

> O Gradle Wrapper (`gradlew` / `gradlew.bat`) já está incluído no
> projeto e dispensa a instalação manual do Gradle.

------------------------------------------------------------------------

## 6. Clonando o Repositório

Clone o projeto a partir do GitHub:

    git clone https://github.com/alexsilvaf/grafos.git
    cd grafos

Caso prefira usar SSH:

    git clone git@github.com:alexsilvaf/grafos.git
    cd grafos

------------------------------------------------------------------------

## 7. Execução

O sistema é composto por duas aplicações que devem ser executadas em
terminais separados. **Suba o backend primeiro**, pois o frontend
depende da API.

### 7.1. Backend

Instruções detalhadas em
[grafos-backend/README.md](grafos-backend/README.md).

    cd grafos-backend
    # Compila a lógica em C (gera libgrafo.so / grafo.dll / libgrafo.dylib)
    make -C logica-c
    # Executa a API (Linux/Mac)
    ./gradlew bootRun
    # Executa a API (Windows)
    gradlew.bat bootRun

A API ficará disponível em `http://localhost:8080`.

### 7.2. Frontend

Instruções detalhadas em
[grafos-frontend/README.md](grafos-frontend/README.md).

    cd grafos-frontend
    npm install
    ng serve        # ou: ng serve -o  (abre o navegador automaticamente)

O frontend ficará disponível em `http://localhost:4200`.

------------------------------------------------------------------------

## 8. Fluxo de Trabalho com Git

Esta seção resume os comandos mais usados para colaborar no projeto.

### 8.1. Atualizar o repositório local

Antes de começar a trabalhar, sincronize o branch local com o remoto:

    git checkout main
    git pull origin main

### 8.2. Criar um branch para uma nova tarefa

Use um nome descritivo, idealmente seguindo o padrão `tipo/descricao`:

    git checkout -b feat/cadastro-aresta

### 8.3. Verificar o que foi alterado

    git status            # arquivos modificados / não rastreados
    git diff              # mudanças ainda não adicionadas ao stage
    git diff --staged     # mudanças já no stage

### 8.4. Adicionar e commitar mudanças

    git add caminho/do/arquivo        # adiciona arquivos específicos
    git commit -m "feat(frontend): adiciona cadastro de aresta"

> Prefira commits pequenos e descritivos. O histórico do projeto segue
> o padrão `tipo(escopo): descrição` (`feat`, `fix`, `chore`, `build`,
> `docs`, `refactor`, `test`).

### 8.5. Enviar mudanças para o remoto

Primeiro push do branch (registra o tracking com o remoto):

    git push -u origin feat/cadastro-aresta

Pushes seguintes:

    git push

### 8.6. Atualizar um branch a partir do main

Para incorporar as últimas mudanças do `main` no branch atual:

    git fetch origin
    git merge origin/main
    # ou, se preferir histórico linear:
    git rebase origin/main

### 8.7. Abrir um Pull Request

Após o push, acesse o repositório no GitHub e abra um Pull Request do
seu branch para `main`. Garanta que:

-   Backend e frontend sobem sem erros.
-   Os endpoints e telas afetados foram testados manualmente.
-   A descrição do PR cita o(s) caso(s) de uso impactado(s).

------------------------------------------------------------------------

## 9. Solução de Problemas

-   **`make: command not found` no Windows:** instale o MinGW-w64 ou
    use o WSL.
-   **API sobe mas o frontend recebe erro de CORS:** verifique se o
    backend está em `http://localhost:8080` e se a configuração de CORS
    em `grafos-backend/src/main/java/com/grafos/config/CorsConfig.java`
    permite a origem `http://localhost:4200`.
-   **`UnsatisfiedLinkError` ao subir o backend:** confirme que o
    `make -C logica-c` foi executado e que o arquivo
    `libgrafo.so` / `grafo.dll` / `libgrafo.dylib` está dentro de
    `grafos-backend/logica-c/`.
-   **Porta 4200 ou 8080 ocupada:** finalize o processo que está
    usando a porta ou rode com outra porta
    (`ng serve --port 4300` / `./gradlew bootRun --args='--server.port=8081'`).
