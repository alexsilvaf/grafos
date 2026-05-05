#include "grafo.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <locale.h>

#define MAX_NOS 128
#define MAX_ARESTAS 512
#define TAM_ID 64
#define TAM_JSON 8192

typedef struct {
    char id[TAM_ID];
} No;

typedef struct {
    char origem[TAM_ID];
    char destino[TAM_ID];
    double custo;
} Aresta;

static No nos[MAX_NOS];
static int total_nos = 0;

static Aresta arestas[MAX_ARESTAS];
static int total_arestas = 0;

static char buffer_json[TAM_JSON];

// Funções auxiliares simples (pra não dar erro)
static int existe_no(const char *id) {
    for (int i = 0; i < total_nos; i++) {
        if (strcmp(nos[i].id, id) == 0) return 1;
    }
    return 0;
}

static int existe_aresta(const char *origem, const char *destino) {
    for (int i = 0; i < total_arestas; i++) {
        if (strcmp(arestas[i].origem, origem) == 0 &&
            strcmp(arestas[i].destino, destino) == 0) {
            return 1;
        }
    }
    return 0;
}

// Implementação correta
int adicionar_no(const char *id) {
    if (id == NULL || strlen(id) == 0) return GRAFO_ERRO;
    if (total_nos >= MAX_NOS) return GRAFO_ERRO;
    if (existe_no(id)) return GRAFO_DUPLICIDADE;

    strncpy(nos[total_nos].id, id, TAM_ID - 1);
    nos[total_nos].id[TAM_ID - 1] = '\0';
    total_nos++;
    return GRAFO_SUCESSO;
}

int adicionar_aresta(const char *origem, const char *destino, double custo) {
    if(origem == NULL || destino == NULL) return GRAFO_ERRO;
    if (total_arestas >= MAX_ARESTAS) return GRAFO_ERRO;
    if (!existe_no(origem) || !existe_no(destino)) return GRAFO_ERRO;
    if (existe_aresta(origem, destino)) return GRAFO_DUPLICIDADE;

    strncpy(arestas[total_arestas].origem, origem, TAM_ID - 1);
    arestas[total_arestas].origem[TAM_ID - 1] = '\0';

    strncpy(arestas[total_arestas].destino, destino, TAM_ID - 1);
    arestas[total_arestas].destino[TAM_ID - 1] = '\0';

    arestas[total_arestas].custo = custo;
    total_arestas++;

    return GRAFO_SUCESSO;
}

void liberar_string(const char *ptr) {
    (void)ptr;
}

// Retorna JSON do grafo completo
const char *obter_grafo_json() {
    char *locale_anterior = setlocale(LC_NUMERIC, NULL);
    setlocale(LC_NUMERIC, "C");

    int escrito = 0;
    escrito += snprintf(buffer_json + escrito, TAM_JSON - escrito, "{\"nos\":[");
    for (int i = 0; i < total_nos; i++) {
        escrito += snprintf(buffer_json + escrito, TAM_JSON - escrito,
                            "%s{\"id\":\"%s\"}", i > 0 ? "," : "", nos[i].id);
    }
    escrito += snprintf(buffer_json + escrito, TAM_JSON - escrito, "],\"arestas\":[");
    for (int i = 0; i < total_arestas; i++) {
        escrito += snprintf(buffer_json + escrito, TAM_JSON - escrito,
                            "%s{\"origem\":\"%s\",\"destino\":\"%s\",\"custo\":%.2f}",
                            i > 0 ? "," : "",
                            arestas[i].origem,
                            arestas[i].destino,
                            arestas[i].custo);
    }
    snprintf(buffer_json + escrito, TAM_JSON - escrito, "]}");
    setlocale(LC_NUMERIC, locale_anterior);
    return buffer_json;
}