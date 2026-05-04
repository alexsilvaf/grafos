#include "grafo.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

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
    if (total_nos >= MAX_NOS) return 0;
    if (existe_no(id)) return 0;

    strcpy(nos[total_nos].id, id);
    total_nos++;
    return 1;
}

int adicionar_aresta(const char *origem, const char *destino, double custo) {
    if (total_arestas >= MAX_ARESTAS) return 0;
    if (!existe_no(origem) || !existe_no(destino)) return 0;
    if (existe_aresta(origem, destino)) return 0;

    strcpy(arestas[total_arestas].origem, origem);
    strcpy(arestas[total_arestas].destino, destino);
    arestas[total_arestas].custo = custo;
    total_arestas++;

    return 1;
}

// Retorna JSON simples
const char *obter_grafo_json() {
    strcpy(buffer_json, "{ \"nos\": [], \"arestas\": [] }");
    return buffer_json;
}