# Caso de Uso 2 -- Cadastro de Nós

### Ator

Usuário do sistema.

### Objetivo

Permitir que o usuário cadastre novos nós (vértices) no grafo, que
poderão ser posteriormente conectados por arestas.

### Descrição

Este caso de uso permite cadastrar os nós (vértices) que compõem o
grafo. Os nós representam os pontos da rede que poderão ser conectados
por arestas. O acesso a este caso de uso ocorre a partir da tela
principal do sistema (UC-01).

### Pré-condições

-   A aplicação frontend (Angular) deve estar em execução.
-   A API backend (Java + Spring Boot) deve estar disponível.
-   O usuário deve estar na tela principal (UC-01) ou navegar até a tela
    de cadastro de nós.

### Pós-condições

-   O novo nó é armazenado pela camada de lógica em C e passa a integrar
    a estrutura do grafo.
-   Ao retornar à tela principal, o nó cadastrado é exibido no grafo.

### Entrada

O usuário deve informar:

-   Identificador do nó

### Saída

-   Mensagem de confirmação do cadastro.
-   Atualização da estrutura do grafo com o novo nó.

### Fluxo Principal

1.  O usuário acessa a página de cadastro de nós a partir da tela
    principal (UC-01).
2.  O sistema apresenta um formulário para inserir o identificador do
    nó.
3.  O usuário informa o identificador desejado.
4.  O usuário confirma o cadastro.
5.  O frontend valida os dados informados.
6.  O frontend envia a requisição para a API.
7.  A API aciona a camada de lógica em C para registrar o novo nó.
8.  A camada de lógica confirma o registro à API.
9.  A API retorna a confirmação ao frontend.
10. O sistema exibe uma mensagem de sucesso ao usuário.

### Fluxos Alternativos

**FA-01 -- Cancelamento do cadastro**

1.  Entre os passos 2 e 4 do fluxo principal, o usuário opta por
    cancelar a operação.
2.  O sistema descarta os dados informados.
3.  O usuário retorna à tela principal (UC-01) sem que nenhum nó seja
    cadastrado.

**FA-02 -- Cadastro sequencial de nós**

1.  Após o passo 10 do fluxo principal, o usuário opta por cadastrar
    outro nó.
2.  O sistema limpa o formulário e reinicia o fluxo a partir do passo 2.

### Fluxos de Exceção

**FE-01 -- Identificador não informado**

1.  No passo 5 do fluxo principal, o frontend identifica que o campo
    identificador não foi preenchido.
2.  O sistema exibe uma mensagem informando a obrigatoriedade do campo.
3.  O fluxo retorna ao passo 3 do fluxo principal.

**FE-02 -- Identificador já existente**

1.  No passo 7 do fluxo principal, a camada de lógica identifica que o
    identificador informado já está cadastrado.
2.  A API retorna um erro de duplicidade ao frontend.
3.  O sistema exibe uma mensagem informando que o nó já existe.
4.  O fluxo retorna ao passo 3 do fluxo principal.

**FE-03 -- Falha de comunicação com a API**

1.  No passo 6 do fluxo principal, o frontend não obtém resposta da API.
2.  O sistema exibe uma mensagem informando a indisponibilidade do
    serviço.
3.  O caso de uso é encerrado sem que o nó seja cadastrado.

**FE-04 -- Falha na camada de lógica em C**

1.  No passo 7 do fluxo principal, a camada de lógica não consegue
    registrar o nó.
2.  A API retorna um erro ao frontend.
3.  O sistema exibe uma mensagem de erro ao usuário.
4.  O caso de uso é encerrado sem que o nó seja cadastrado.

### Regras de Negócio

-   Cada nó deve possuir um identificador único dentro do grafo.
-   O identificador do nó é obrigatório.
-   A persistência do nó é responsabilidade da camada de lógica em C.

### Resultado Esperado

O nó é cadastrado com sucesso e passa a fazer parte da estrutura do
grafo, podendo ser utilizado como origem ou destino em cadastros de
arestas (UC-03).

### Casos de Uso Relacionados

-   UC-01 -- Exibição do Grafo
-   UC-03 -- Cadastro de Arestas e Custos
