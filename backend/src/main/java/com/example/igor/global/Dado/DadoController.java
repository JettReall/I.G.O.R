package com.example.igor.global.Dado;

import io.swagger.v3.oas.annotations.Operation;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/Dado")
public class DadoController {

    @Operation(
            summary = "Rola um dado",
            description = "recebe o dado q deseja ser rolado no formato NdX + B\n\n" +
                    "N=Quantidade\n\nX=tamanho(quantidade de faces do dado\n\nB=bonus\n\n" +
                    "devolve a rolagem com todos os detalhes."
    )
    @PostMapping
    private RolagemDado rolagemSimples(@RequestBody DadoRequest info){
        return new RolagemDado(info.getQuantidade(), info.getTamanho(), info.getBonus());
    }
}