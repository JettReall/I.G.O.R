package com.example.igor.ficha.controller;
 
import com.example.igor.ficha.dto.PersonagemDTO;
import com.example.igor.ficha.entity.personagem.Personagem;
import com.example.igor.ficha.service.PersonagemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/personagens") //mapeia o endpoint
public class PersonagemController {

    @Autowired
    private PersonagemService personagemService;

    //converte o json em um objeto perso dto para criar um personagem novo
    @PostMapping
    public ResponseEntity<Personagem> criarPersonagem(@RequestBody PersonagemDTO dto)
    {
        Personagem novoPersonagem = personagemService.criarPersonagem(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoPersonagem);
    }

    //retorna o personagem cadastrado com algum id especifico
    @GetMapping("/{id}") 
    public ResponseEntity<Personagem> buscarPorId(@PathVariable Long id) 
    {
        Personagem personagem = personagemService.buscarPorId(id);
        return ResponseEntity.ok(personagem);
    }

    //retorna todos os personagens de um jogador
    @GetMapping
    public ResponseEntity<List<Personagem>> listarPorJogador(@RequestParam String jogador) {
        List<Personagem> personagens = personagemService.listarPorJogador(jogador);
        return ResponseEntity.ok(personagens);
    }
}