#ifndef GRAFO_H
#define GRAFO_H

#define GRAFO_SUCESSO 0
#define GRAFO_DUPLICIDADE 1
#define GRAFO_ERRO -1

int adicionar_no(const char *id);

int adicionar_aresta(const char *origem, const char *destino, double custo);

const char *obter_grafo_json(void);

void liberar_string(const char *ptr);

#endif
