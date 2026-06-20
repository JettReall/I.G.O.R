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

import com.example.igor.ficha.dto.PersonagemDTO;
import com.example.igor.ficha.entity.personagem.Personagem;
import com.example.igor.ficha.service.PersonagemService;

@RestController
@RequestMapping("/personagens") //mapeia o endpoint
public class PersonagemController {

    @Autowired
    private PersonagemService personagemService;

    //converte o json em um objeto perso dto para criar um personagem novo
    @PostMapping("/{id}")
    public ResponseEntity<Personagem> criarPersonagem(@PathVariable Long id, @RequestBody PersonagemDTO dto)
    {
        Personagem novoPersonagem = personagemService.criarPersonagem(dto, id);
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
    @GetMapping("/get/all/{id}")
    public ResponseEntity<List<Personagem>> listarPorJogador(@PathVariable Long id) {
        List<Personagem> personagens = personagemService.listarPorUsuario(id);
        return ResponseEntity.ok(personagens);
    }
}