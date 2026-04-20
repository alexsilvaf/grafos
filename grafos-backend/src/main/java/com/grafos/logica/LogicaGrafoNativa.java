package com.grafos.logica;

import com.sun.jna.Library;
import com.sun.jna.Native;

public interface LogicaGrafoNativa extends Library {

    LogicaGrafoNativa INSTANCE = Native.load("grafo", LogicaGrafoNativa.class);

    int adicionar_no(String id);

    int adicionar_aresta(String origem, String destino, double custo);

    String obter_grafo_json();

    void liberar_string(String ptr);
}
