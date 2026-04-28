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

static int existe_no() { // William
}

static int existe_aresta() { // Manuela
}

int adicionar_no() { // Yasmin
}

int adicionar_aresta() { // Guilherme
}

const char *obter_grafo_json() { // Alex
}
