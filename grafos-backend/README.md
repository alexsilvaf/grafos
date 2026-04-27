# grafos-backend

API REST em Java + Spring Boot que expõe as operações do sistema de
grafos. A lógica de manipulação é implementada em C e carregada
dinamicamente via JNA.

## Estrutura

    grafos-backend/
    ├── build.gradle
    ├── settings.gradle
    ├── gradlew / gradlew.bat
    ├── logica-c/                          # Lógica do grafo em C
    │   ├── grafo.h
    │   ├── grafo.c
    │   └── Makefile
    └── src/main/java/com/grafos/
        ├── GrafosApplication.java
        ├── config/CorsConfig.java
        ├── controller/                    # Endpoints REST
        ├── service/GrafoService.java      # Ponte com a camada em C
        ├── logica/LogicaGrafoNativa.java  # Interface JNA
        └── model/                         # No, Aresta, Grafo

## Endpoints

| Método | Rota          | Caso de Uso | Descrição                   |
| ------ | ------------- | ----------- | --------------------------- |
| GET    | /api/grafo    | UC-01       | Retorna nós e arestas       |
| POST   | /api/nos      | UC-02       | Cadastra um novo nó         |
| POST   | /api/arestas  | UC-03       | Cadastra aresta com custo   |

## Pré-requisitos

-   **Java 21** (JDK) — verifique com `java -version`.
-   **GCC** (Linux/Mac) ou **MinGW-w64** (Windows) — compilação da
    biblioteca nativa.
-   **Make** — orquestração da compilação em C.
-   O **Gradle Wrapper** (`gradlew` / `gradlew.bat`) já está incluído
    e dispensa a instalação manual do Gradle.

## Instalação

A partir da raiz do repositório, entre na pasta do backend:

    cd grafos-backend

Faça o download das dependências do Gradle (opcional — o `bootRun`
faz isso automaticamente na primeira execução):

    # Linux/Mac
    ./gradlew build -x test

    # Windows
    gradlew.bat build -x test

## Execução

### 1. Compile a lógica em C

A biblioteca nativa precisa estar disponível em `logica-c/` para ser
carregada via JNA. O `Makefile` detecta o sistema operacional e gera
o artefato adequado:

| SO       | Arquivo gerado    |
| -------- | ----------------- |
| Linux    | `libgrafo.so`     |
| macOS    | `libgrafo.dylib`  |
| Windows  | `grafo.dll`       |

Compile com:

    make -C logica-c

Para limpar artefatos anteriores antes de recompilar:

    make -C logica-c clean

### 2. Suba a API

    # Linux/Mac
    ./gradlew bootRun

    # Windows
    gradlew.bat bootRun

A API sobe em `http://localhost:8080`.

> O `bootRun` já injeta `-Djna.library.path` apontando para
> `logica-c/`, portanto não é preciso copiar a biblioteca para outro
> diretório do sistema.

### Outros comandos úteis

    ./gradlew test                              # roda os testes
    ./gradlew bootJar                           # gera o JAR executável
    ./gradlew bootRun --args='--server.port=8081'  # outra porta

## Solução de Problemas

-   **`UnsatisfiedLinkError` ao iniciar:** rode `make -C logica-c` e
    confirme que o arquivo correspondente ao seu SO está em
    `logica-c/`.
-   **`make: command not found` no Windows:** instale o MinGW-w64 ou
    use o WSL.
-   **Porta 8080 ocupada:** suba com
    `./gradlew bootRun --args='--server.port=8081'`.
