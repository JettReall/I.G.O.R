package com.example.igor.global.Dado;

import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/Dado")
public class DadoController {

    @PostMapping
    private RolagemDado rolagemSimples(@RequestBody DadoRequest info){
        return new RolagemDado (info.getQuantidade(),info.getTamanho(),info.getBonus());
    }
}
