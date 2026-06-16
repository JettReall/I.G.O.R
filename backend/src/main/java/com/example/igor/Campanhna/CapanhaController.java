package com.example.igor.Campanhna;

import com.example.igor.Campanhna.DTO.CampanhaCombateDTO;
import com.example.igor.Campanhna.DTO.CampanhaFichaDTO;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/campanha")
public class CapanhaController {
    @Autowired
    private CampanhaService campanhaService;

    //Criar
    @Operation(
            summary = "Cria uma campanha",
            description = "Recebe um objeto igual a entidade campanha e um ID de usuario,conecta a campanha ao usuario e a salva, retorna o objeto salvo"
    )
    @PostMapping("/{id}")
    private Campanha criarCampanha(@RequestBody Campanha campanha,@PathVariable Long id){
        return campanhaService.CriarCampanha(campanha,id);
    }

    //Deletar campanha
    @DeleteMapping("/{id}")
    private int deletarCampanha(@PathVariable Long id){
        return campanhaService.deletarCampanha(id);
    }

    /*
    //Adicionar ficha
    @PostMapping("/ficha/add")
    private Campanha addFicha(@RequestBody CampanhaFichaDTO dto){
        return campanhaService.addFicha(dto);
    }

    //Remove ficha
    @PostMapping("/ficha/delete")
    private Campanha removeFicha(@RequestBody CampanhaFichaDTO dto){
        return campanhaService.removerFicha(dto);
    }

     */

    //Criar combate
    @PostMapping("/combate/add")
    private Campanha addCombate(@RequestBody CampanhaCombateDTO dto){
        return campanhaService.addCombate(dto);
    }

    //Remove Combate
    @PostMapping("/combate/delete")
    private Campanha removeCombate(@RequestBody CampanhaCombateDTO dto){
        return campanhaService.removerCombate(dto);
    }



}
