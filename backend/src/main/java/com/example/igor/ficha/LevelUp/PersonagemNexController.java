package com.example.igor.ficha.LevelUp;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.igor.ficha.FichaUtil.AtributoEnum;
import com.example.igor.ficha.LevelUp.DTO.NexUpDTO;
import com.example.igor.ficha.entity.acao.Habilidade;
import com.example.igor.ficha.entity.personagem.Personagem;

import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("/personagens/{id}/nex")
public class PersonagemNexController {

    @Autowired
    private PersonagemNexService personagemNexService;

    @Operation(
            summary = "Sobe o NEX do personagem",
            description = "Incrementa o nex em 1, aplica os ganhos automáticos de vida, PE e sanidade, e retorna quais decisões esse novo nex libera (habilidade de trilha, poder de classe, atributo, treino de perícia)"
    )
    @PutMapping
    public ResponseEntity<NexUpDTO> subirNex(@PathVariable Long id) {
        return ResponseEntity.ok(personagemNexService.subirNex(id));
    }

    @Operation(
            summary = "Lista poderes de classe disponíveis",
            description = "Retorna os poderes de classe que o personagem ainda não possui e já atende aos pré-requisitos"
    )
    @GetMapping("/poderes")
    public ResponseEntity<List<Habilidade>> listarPoderesDisponiveis(@PathVariable Long id) {
        return ResponseEntity.ok(personagemNexService.listarPoderesDisponiveis(id));
    }

    @Operation(
            summary = "Lista habilidades de trilha disponíveis",
            description = "Retorna as habilidades da trilha escolhida pelo personagem que ele ainda não possui e já atende aos pré-requisitos"
    )
    @GetMapping("/trilha")
    public List<Habilidade> listarHabilidadesTrilhaDisponiveis(@PathVariable Long id) {
        return personagemNexService.listarHabilidadesTrilhaDisponiveis(id);
    }

    @Operation(
            summary = "Adiciona uma habilidade ao personagem",
            description = "Recebe o id de uma habilidade (poder de classe ou de trilha) e a adiciona ao personagem, validando os pré-requisitos antes"
    )
    @PostMapping("/habilidade/{habilidadeId}")
    public ResponseEntity<Personagem> adicionarHabilidade(@PathVariable Long id, @PathVariable Long habilidadeId) {
        return ResponseEntity.ok(personagemNexService.adicionarHabilidade(id, habilidadeId));
    }

    @Operation(
            summary = "Aumenta um atributo do personagem",
            description = "Recebe o atributo escolhido e aumenta seu valor em +1, respeitando o limite máximo de 5"
    )
    @PutMapping("/atributo/{atributo}")
    public ResponseEntity<Personagem> aumentarAtributo(@PathVariable Long id, @PathVariable AtributoEnum atributo) {
        return ResponseEntity.ok(personagemNexService.aumentarAtributo(id, atributo));
    }

    @Operation(
            summary = "Treina uma perícia do personagem",
            description = "Recebe o id de uma perícia e aumenta o grau de treinamento dela em +1, respeitando o limite máximo"
    )
    @PutMapping("/pericia/{periciaId}")
    public ResponseEntity<Personagem> treinarPericia(@PathVariable Long id, @PathVariable Long periciaId) {
        return ResponseEntity.ok(personagemNexService.treinarPericia(id, periciaId));
    }
}