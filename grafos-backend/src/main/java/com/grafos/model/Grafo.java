package com.grafos.model;

import java.util.List;

public class Grafo {
    private List<No> nos;
    private List<Aresta> arestas;

    public Grafo() {}

    public Grafo(List<No> nos, List<Aresta> arestas) {
        this.nos = nos;
        this.arestas = arestas;
    }

    public List<No> getNos() {
        return nos;
    }

    public void setNos(List<No> nos) {
        this.nos = nos;
    }

    public List<Aresta> getArestas() {
        return arestas;
    }

    public void setArestas(List<Aresta> arestas) {
        this.arestas = arestas;
    }
}
