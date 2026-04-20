package com.grafos.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.grafos.logica.LogicaGrafoNativa;
import com.grafos.model.Aresta;
import com.grafos.model.Grafo;
import com.grafos.model.No;
import org.springframework.stereotype.Service;

@Service
public class GrafoService {

    private static final int CODIGO_SUCESSO = 0;
    private static final int CODIGO_DUPLICIDADE = 1;

    private final LogicaGrafoNativa logica;
    private final ObjectMapper objectMapper;

    public GrafoService() {
        this.logica = LogicaGrafoNativa.INSTANCE;
        this.objectMapper = new ObjectMapper();
    }

    public Grafo obterGrafo() {
        String json = logica.obter_grafo_json();
        try {
            return objectMapper.readValue(json, Grafo.class);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Falha ao interpretar o grafo retornado pela camada nativa", e);
        }
    }

    public void cadastrarNo(No no) {
        int resultado = logica.adicionar_no(no.getId());
        if (resultado == CODIGO_DUPLICIDADE) {
            throw new IllegalStateException("Nó já cadastrado: " + no.getId());
        }
        if (resultado != CODIGO_SUCESSO) {
            throw new RuntimeException("Falha ao cadastrar nó na camada nativa");
        }
    }

    public void cadastrarAresta(Aresta aresta) {
        int resultado = logica.adicionar_aresta(
                aresta.getOrigem(),
                aresta.getDestino(),
                aresta.getCusto()
        );
        if (resultado == CODIGO_DUPLICIDADE) {
            throw new IllegalStateException("Aresta já cadastrada entre " +
                    aresta.getOrigem() + " e " + aresta.getDestino());
        }
        if (resultado != CODIGO_SUCESSO) {
            throw new RuntimeException("Falha ao cadastrar aresta na camada nativa");
        }
    }
}
