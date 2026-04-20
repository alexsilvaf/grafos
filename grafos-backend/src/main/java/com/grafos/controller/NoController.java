package com.grafos.controller;

import com.grafos.model.No;
import com.grafos.service.GrafoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/nos")
public class NoController {

    private final GrafoService grafoService;

    public NoController(GrafoService grafoService) {
        this.grafoService = grafoService;
    }

    @PostMapping
    public ResponseEntity<No> cadastrarNo(@RequestBody No no) {
        grafoService.cadastrarNo(no);
        return ResponseEntity.ok(no);
    }
}
