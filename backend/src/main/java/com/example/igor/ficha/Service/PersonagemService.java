package com.example.igor.ficha.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.igor.ficha.FichaUtil.Stats;
import com.example.igor.ficha.dto.PersonagemDTO;
import com.example.igor.ficha.entity.personagem.Personagem;
import com.example.igor.ficha.repository.PersonagemRepository;


@Service
public class PersonagemService {

    @Autowired
    private PersonagemRepository personagemRepository;

    //Salva um personagem no banco
    public Personagem criarPersonagem(PersonagemDTO dto) {

        Personagem personagem = new Personagem();
        personagem.setNomePersonagem(dto.getNomePersonagem());
        personagem.setNomeJogador(dto.getNomeJogador());

        personagem.setVida(new Stats());
        personagem.setPe(new Stats());
        personagem.setSanidade(new Stats());

        personagem.setDefesa(10);
        personagem.setEsquiva(0);
        personagem.setNex(0);
        personagem.setDeslocamento(9);

        return personagemRepository.save(personagem);
    }

    //Busca um personagem especifico pelo ID
    public Personagem buscarPorId(Long id) {
        return personagemRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Personagem com id " + id + "não encontrado"));
    }
     
    //Lista os personagens de um jogador
    public List<Personagem> listarPorJogador(String nomeJogador) {
        return personagemRepository.findByNomeJogador(nomeJogador);
    }
}
