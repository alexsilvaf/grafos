package com.grafos.model;

public class Aresta {
    private String origem;
    private String destino;
    private double custo;

    public Aresta() {}

    public Aresta(String origem, String destino, double custo) {
        this.origem = origem;
        this.destino = destino;
        this.custo = custo;
    }

    public String getOrigem() {
        return origem;
    }

    public void setOrigem(String origem) {
        this.origem = origem;
    }

    public String getDestino() {
        return destino;
    }

    public void setDestino(String destino) {
        this.destino = destino;
    }

    public double getCusto() {
        return custo;
    }

    public void setCusto(double custo) {
        this.custo = custo;
    }
}
