# Caso de Uso 1 -- Exibição do Grafo

### Ator

Usuário do sistema.

### Objetivo

Permitir que o usuário visualize, em uma tela principal, todos os nós e
arestas cadastrados no sistema, além de disponibilizar o acesso às
funcionalidades de cadastro de nós (UC-02) e cadastro de arestas e
custos (UC-03).

### Descrição

Este caso de uso representa a tela principal da aplicação. Ao acessar o
sistema, o usuário visualiza graficamente o grafo construído, composto
pelos nós (vértices), pelas arestas (conexões) e pelos custos (pesos)
associados a cada ligação. A tela principal também concentra os pontos
de entrada para os demais casos de uso do sistema.

### Pré-condições

-   A aplicação frontend (Angular) deve estar em execução.
-   A API backend (Java + Spring Boot) deve estar disponível.
-   A camada de lógica em C deve estar acessível à API.

### Pós-condições

-   O grafo é exibido na tela com os nós, arestas e custos atualmente
    cadastrados.
-   O usuário pode navegar para os casos de uso UC-02 e UC-03 a partir
    da tela principal.

### Entrada

Nenhuma entrada é exigida do usuário para a exibição do grafo. A
exibição ocorre automaticamente ao carregar a tela principal.

### Saída

-   Representação visual do grafo contendo os nós, arestas e custos.
-   Botões ou menus de acesso aos casos de uso de cadastro.

### Fluxo Principal

1.  O usuário acessa a aplicação pelo navegador.
2.  O frontend solicita à API a lista de nós e arestas cadastradas.
3.  A API aciona a camada de lógica em C para recuperar a estrutura
    atual do grafo.
4.  A camada de lógica retorna os dados à API.
5.  A API envia a resposta ao frontend com os nós, arestas e custos.
6.  O frontend renderiza o grafo na tela principal.
7.  O sistema exibe os botões de acesso para UC-02 (Cadastro de Nós) e
    UC-03 (Cadastro de Arestas e Custos).

### Fluxos Alternativos

**FA-01 -- Grafo vazio**

1.  No passo 5 do fluxo principal, a API retorna uma lista vazia de nós
    e arestas.
2.  O frontend exibe uma mensagem informando que o grafo ainda não
    possui elementos cadastrados.
3.  O sistema mantém disponíveis os botões de acesso ao UC-02 e UC-03
    para que o usuário possa iniciar o cadastro.

**FA-02 -- Acesso ao cadastro de nós**

1.  O usuário seleciona a opção de cadastro de nós na tela principal.
2.  O sistema redireciona para o fluxo definido no UC-02.

**FA-03 -- Acesso ao cadastro de arestas e custos**

1.  O usuário seleciona a opção de cadastro de arestas na tela
    principal.
2.  O sistema redireciona para o fluxo definido no UC-03.

**FA-04 -- Atualização da visualização**

1.  Após retornar de um cadastro (UC-02 ou UC-03), o frontend solicita
    novamente os dados à API.
2.  O grafo é renderizado novamente já contendo os novos elementos.

### Fluxos de Exceção

**FE-01 -- Falha de comunicação com a API**

1.  Durante o passo 2 do fluxo principal, o frontend não obtém resposta
    da API.
2.  O sistema exibe uma mensagem informando a indisponibilidade do
    serviço.
3.  O caso de uso é encerrado sem exibição do grafo.

**FE-02 -- Falha na camada de lógica em C**

1.  No passo 3 do fluxo principal, a camada de lógica não consegue
    processar a estrutura do grafo.
2.  A API retorna um erro ao frontend.
3.  O frontend exibe uma mensagem de erro ao usuário.
4.  O caso de uso é encerrado sem exibição do grafo.

**FE-03 -- Falha na renderização**

1.  No passo 6 do fluxo principal, o frontend não consegue renderizar o
    grafo.
2.  O sistema exibe uma mensagem informando a falha de renderização.
3.  O caso de uso é encerrado.

### Regras de Negócio

-   A tela principal é o ponto central de navegação do sistema.
-   A visualização deve refletir o estado atual do grafo armazenado pela
    camada de lógica.
-   Os botões de acesso ao UC-02 e UC-03 devem estar sempre visíveis,
    mesmo quando o grafo estiver vazio.

### Casos de Uso Relacionados

-   UC-02 -- Cadastro de Nós
-   UC-03 -- Cadastro de Arestas e Custos

------------------------------------------------------------------------

# Estrutura do Grafo

A estrutura do grafo é composta por três elementos principais:

**Nós (Vértices)**\
Representam os pontos da rede cadastrados pelo usuário.

**Arestas**\
Representam as conexões entre dois nós do grafo.

**Custos (Pesos)**\
Representam o valor associado a cada conexão entre dois nós.

Essa estrutura será utilizada pela lógica do sistema para manipulação e
análise das conexões entre os elementos do grafo.

------------------------------------------------------------------------

# Considerações Finais

O sistema permite ao usuário construir a estrutura de um grafo através
do cadastro de nós e arestas. A separação entre frontend, API e lógica
de processamento permite que o sistema seja organizado e facilite
futuras expansões ou implementação de novos algoritmos de análise de
grafos.
