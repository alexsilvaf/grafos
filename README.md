# Sistema de Grafos

## 1. Descrição do Sistema

O sistema tem como objetivo permitir o cadastro de nós e arestas de um
grafo, possibilitando a construção de uma rede de conexões entre
diferentes pontos. A partir dessas informações será possível representar
a estrutura do grafo e posteriormente aplicar algoritmos de análise de
caminhos.

A aplicação será desenvolvida utilizando uma arquitetura dividida em
três camadas:

-   Frontend: interface web desenvolvida em Angular, responsável pela
    interação com o usuário.
-   Backend (API): serviço desenvolvido com Java e Spring Boot
    responsável por processar as requisições do sistema.
-   Camada de Lógica: implementação da lógica de manipulação e
    processamento do grafo desenvolvida na linguagem C.

Essa separação de responsabilidades permite maior organização,
manutenção e escalabilidade do sistema.

------------------------------------------------------------------------

# 2. Arquitetura do Sistema

O funcionamento do sistema ocorre da seguinte forma:

1.  O usuário acessa a aplicação através da interface web.
2.  O frontend envia requisições para a API.
3.  A API recebe os dados e processa as solicitações.
4.  A lógica implementada em C realiza o processamento das estruturas de
    grafos.
5.  Os resultados são retornados para a API.
6.  A API envia a resposta para o frontend, que apresenta as informações
    ao usuário.