package com.grafos.controller;

import com.grafos.model.Aresta;
import com.grafos.service.GrafoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/arestas")
public class ArestaController {

    private final GrafoService grafoService;

    public ArestaController(GrafoService grafoService) {
        this.grafoService = grafoService;
    }

    @PostMapping
    public ResponseEntity<Aresta> cadastrarAresta(@RequestBody Aresta aresta) {
        grafoService.cadastrarAresta(aresta);
        return ResponseEntity.ok(aresta);
    }
}
