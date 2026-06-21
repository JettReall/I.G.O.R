package com.example.igor.ficha.controller;
 
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.igor.ficha.dto.OrigemDTO;
import com.example.igor.ficha.dto.PersonagemDTO;
import com.example.igor.ficha.entity.personagem.Personagem;
import com.example.igor.ficha.service.PersonagemService;

import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("/personagens") //mapeia o endpoint
public class PersonagemController {

    @Autowired
    private PersonagemService personagemService;

        @Operation(
            summary = "Cria um Personagem no banco, vincula a um usuario e salva.",
            description = "Recebe um json com : nome, jogador, origemId, TrilhaId, classeId, atributos, periciaLista." +
            "Ao receber estes dados inicializa um personagem com todas as informações de vida, sanidade, pe, especificas de cada classe" +
            "e também com todas as outras informações que são genericas(bases) para todos os personagens. Ele também vincula um personagem a um usuario"
    )//converte o json em um objeto perso dto para criar um personagem novo
    @PostMapping("/{id}")
    public ResponseEntity<Personagem> criarPersonagem(@PathVariable Long id, @RequestBody PersonagemDTO dto)
    {
        Personagem novoPersonagem = personagemService.criarPersonagem(dto, id);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoPersonagem);
    }

    @Operation(
            summary = "Busca personagem por Id",
            description = "Busca um personagem especifico, no banco, que tem o Id informado e devolve ele"
    )//retorna o personagem cadastrado com algum id especifico
    @GetMapping("/{id}") 
    public ResponseEntity<Personagem> buscarPorId(@PathVariable Long id) 
    {
        Personagem personagem = personagemService.buscarPorId(id);
        return ResponseEntity.ok(personagem);
    }

    @Operation(
            summary = "Lista todos os personagens de um Usuario",
            description = "Busca todos os personagens, no banco, que tem o Id do Usuário informado e devolve todos eles"
    )//retorna todos os personagens de um jogador
    @GetMapping("/get/all/{id}")
    public ResponseEntity<List<Personagem>> listarPorJogador(@PathVariable Long id) {
        List<Personagem> personagens = personagemService.listarPorUsuario(id);
        return ResponseEntity.ok(personagens);
    }

    @Operation(
            summary = "Lista de todas as origens",
            description = "Manda uma lista com todas as origens e as pericias associadas a elas"
    )//manda todas as origens pro front
    @GetMapping("/origens")
    public ResponseEntity<OrigemDTO> listarOrigens() {
        OrigemDTO origens = personagemService.listarOrigens();
        return ResponseEntity.ok(origens);
    }
}