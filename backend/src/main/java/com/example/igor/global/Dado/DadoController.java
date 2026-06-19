package com.example.igor.global.Dado;

import io.swagger.v3.oas.annotations.Operation;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/Dado")
public class DadoController {

    @Operation(
            summary = "Realiza uma rolagem de dados",
            description = "Recebe quantidade de dados, tamanho do dado e bônus. Retorna a rolagem completa com todos os dados, soma total, maior dado e resultado final (soma + bônus)"
    )
    @PostMapping
    private RolagemDado rolagemSimples(@RequestBody DadoRequest info){
        return new RolagemDado(info.getQuantidade(), info.getTamanho(), info.getBonus());
    }
}