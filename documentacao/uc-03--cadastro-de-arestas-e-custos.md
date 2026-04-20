# Caso de Uso 3 -- Cadastro de Arestas e Custos

### Ator

Usuário do sistema.

### Objetivo

Permitir que o usuário registre conexões (arestas) entre dois nós
previamente cadastrados, atribuindo a cada conexão um custo (peso) que
representa o valor da ligação.

### Descrição

Este caso de uso permite registrar conexões entre dois nós do grafo.
Cada conexão possui um custo associado, que representa o peso da
ligação entre os nós. O acesso a este caso de uso ocorre a partir da
tela principal do sistema (UC-01).

### Pré-condições

-   A aplicação frontend (Angular) deve estar em execução.
-   A API backend (Java + Spring Boot) deve estar disponível.
-   Devem existir pelo menos dois nós cadastrados no sistema (UC-02).
-   O usuário deve estar na tela principal (UC-01) ou navegar até a tela
    de cadastro de arestas.

### Pós-condições

-   A nova aresta é armazenada pela camada de lógica em C com o custo
    informado.
-   Ao retornar à tela principal, a aresta cadastrada é exibida no
    grafo, juntamente com seu custo.

### Entrada

O usuário deve informar:

-   Nó de origem
-   Nó de destino
-   Custo da conexão

### Saída

-   Mensagem de confirmação do cadastro.
-   Atualização da estrutura do grafo com a nova aresta e seu custo.

### Fluxo Principal

1.  O usuário acessa a página de cadastro de arestas a partir da tela
    principal (UC-01).
2.  O sistema apresenta um formulário para inserção das informações da
    aresta.
3.  O sistema carrega a lista de nós disponíveis a partir da API.
4.  O usuário seleciona o nó de origem.
5.  O usuário seleciona o nó de destino.
6.  O usuário informa o custo da ligação.
7.  O usuário confirma o cadastro.
8.  O frontend valida os dados informados.
9.  O frontend envia a requisição para a API.
10. A API aciona a camada de lógica em C para registrar a nova aresta.
11. A camada de lógica confirma o registro à API.
12. A API retorna a confirmação ao frontend.
13. O sistema exibe uma mensagem de sucesso ao usuário.

### Fluxos Alternativos

**FA-01 -- Cancelamento do cadastro**

1.  Entre os passos 2 e 7 do fluxo principal, o usuário opta por
    cancelar a operação.
2.  O sistema descarta os dados informados.
3.  O usuário retorna à tela principal (UC-01) sem que nenhuma aresta
    seja cadastrada.

**FA-02 -- Cadastro sequencial de arestas**

1.  Após o passo 13 do fluxo principal, o usuário opta por cadastrar
    outra aresta.
2.  O sistema limpa o formulário e reinicia o fluxo a partir do passo 2.

**FA-03 -- Redirecionamento para cadastro de nós**

1.  No passo 3 do fluxo principal, a lista de nós retornada pela API
    possui menos de dois elementos.
2.  O sistema exibe uma mensagem informando a necessidade de cadastrar
    mais nós.
3.  O sistema oferece ao usuário a opção de acessar o UC-02 (Cadastro de
    Nós).

### Fluxos de Exceção

**FE-01 -- Campos obrigatórios não preenchidos**

1.  No passo 8 do fluxo principal, o frontend identifica que um ou mais
    campos não foram preenchidos.
2.  O sistema exibe uma mensagem informando a obrigatoriedade dos
    campos.
3.  O fluxo retorna ao passo 4 do fluxo principal.

**FE-02 -- Nó de origem igual ao nó de destino**

1.  No passo 8 do fluxo principal, o frontend identifica que o nó de
    origem e o nó de destino são iguais.
2.  O sistema exibe uma mensagem informando que origem e destino devem
    ser diferentes.
3.  O fluxo retorna ao passo 4 do fluxo principal.

**FE-03 -- Custo inválido**

1.  No passo 8 do fluxo principal, o frontend identifica que o custo
    informado é inválido (valor não numérico ou fora do intervalo
    aceito).
2.  O sistema exibe uma mensagem informando o formato esperado para o
    custo.
3.  O fluxo retorna ao passo 6 do fluxo principal.

**FE-04 -- Aresta já cadastrada**

1.  No passo 10 do fluxo principal, a camada de lógica identifica que a
    aresta entre os nós informados já existe.
2.  A API retorna um erro de duplicidade ao frontend.
3.  O sistema exibe uma mensagem informando a duplicidade.
4.  O fluxo retorna ao passo 4 do fluxo principal.

**FE-05 -- Falha de comunicação com a API**

1.  No passo 9 do fluxo principal, o frontend não obtém resposta da API.
2.  O sistema exibe uma mensagem informando a indisponibilidade do
    serviço.
3.  O caso de uso é encerrado sem que a aresta seja cadastrada.

**FE-06 -- Falha na camada de lógica em C**

1.  No passo 10 do fluxo principal, a camada de lógica não consegue
    registrar a aresta.
2.  A API retorna um erro ao frontend.
3.  O sistema exibe uma mensagem de erro ao usuário.
4.  O caso de uso é encerrado sem que a aresta seja cadastrada.

### Regras de Negócio

-   O nó de origem e o nó de destino devem estar previamente cadastrados
    no sistema.
-   O nó de origem deve ser diferente do nó de destino.
-   O custo deve ser um valor numérico válido.
-   A persistência da aresta é responsabilidade da camada de lógica em
    C.

### Resultado Esperado

A aresta é cadastrada com sucesso e passa a representar uma conexão
entre dois nós com um custo associado, tornando-se visível na tela
principal do sistema (UC-01).

### Casos de Uso Relacionados

-   UC-01 -- Exibição do Grafo
-   UC-02 -- Cadastro de Nós
