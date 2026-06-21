package com.example.igor.Campanha;

import com.example.igor.Campanha.DTO.CampanhaCombateDTO;
import com.example.igor.Campanha.DTO.CampanhaFichaDTO;
import com.example.igor.Combate.Combate;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/campanha")
public class CampanhaController {
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


    @Operation(
            summary = "Deleta uma campanha",
            description = "Recebe um ID por parâmetro e deleta a campanha correspondente. Retorna 0 em caso de sucesso"
    )
    @DeleteMapping("/{id}")
    private int deletarCampanha(@PathVariable Long id){
        return campanhaService.deletarCampanha(id);
    }


    //Adicionar ficha
    @Operation(
            summary = "Adiciona uma ficha",
            description = "Recebe id de campanha, e id de uma ficha e o tipo da ficha sendo MONSTRO ou PERSONAGEM" +
                    "e adiciona essa ficha na campanha"
    )
    @PostMapping("/ficha/add")
    private Campanha addFicha(@RequestBody CampanhaFichaDTO dto){
        return campanhaService.addFicha(dto);
    }

    //Remove ficha
    @Operation(
            summary = "Remove uma ficha",
            description = "Recebe id de campanha, e id de uma ficha e o tipo da ficha sendo MONSTRO ou PERSONAGEM" +
                    "e remove essa ficha da campanha"
    )
    @PostMapping("/ficha/delete")
    private Campanha removeFicha(@RequestBody CampanhaFichaDTO dto){
        return campanhaService.removerFicha(dto);
    }


    @Operation(
            summary = "Adiciona um combate à campanha",
            description = "Recebe um CampanhaCombateDTO com o id da campanha e o nome do novo combate. Cria o combate e o associa à campanha" +
                    "\n\n o campo de id de combate deve ser null"
    )
    @PostMapping("/combate/add")
    private Campanha addCombate(@RequestBody CampanhaCombateDTO dto){
        return campanhaService.addCombate(dto);
    }


    @Operation(
            summary = "Remove um combate da campanha",
            description = "Recebe um CampanhaCombateDTO com o id da campanha e o id do combate a ser removido"
    )
    @PostMapping("/combate/delete")
    private Campanha removeCombate(@RequestBody CampanhaCombateDTO dto){
        return campanhaService.removerCombate(dto);
    }



    @Operation(
            summary = "Get Campanha do usuario",
            description = "Recebe um id de um usuario e retorna a lista de todas as campanhas dele"
    )
    @GetMapping("/{id}")
    private List<Campanha> getCampanhas(@PathVariable Long id){
        return campanhaService.getCampanhas(id);
    }

    @Operation(
            summary = "Manda todos os combates de uma campanha",
            description = "Recebe o id de uma campanha e devolve todos os combates dela"
    )
    @GetMapping("/combate/{id}")
    private List<Combate> getCombates(@PathVariable Long id){
        return campanhaService.getCombates(id);
    }
}
