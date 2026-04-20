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

## Execução

Compile a lógica em C antes de subir a API:

    make -C logica-c

Em seguida, execute a aplicação usando o Gradle Wrapper:

    # Linux/Mac
    ./gradlew bootRun

    # Windows
    gradlew.bat bootRun

A API sobe em `http://localhost:8080`.
