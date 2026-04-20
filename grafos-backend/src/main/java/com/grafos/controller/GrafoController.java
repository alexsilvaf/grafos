package com.grafos.controller;

import com.grafos.model.Grafo;
import com.grafos.service.GrafoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/grafo")
public class GrafoController {

    private final GrafoService grafoService;

    public GrafoController(GrafoService grafoService) {
        this.grafoService = grafoService;
    }

    @GetMapping
    public ResponseEntity<Grafo> obterGrafo() {
        return ResponseEntity.ok(grafoService.obterGrafo());
    }
}
