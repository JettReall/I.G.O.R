package com.example.igor.ficha.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.igor.ficha.entity.personagem.Personagem;

@Repository
public interface PersonagemRepository extends JpaRepository<Personagem, Long> {
    // Retorna uma lista de personagens que pertencem a um jogador específico.
    List<Personagem> findByNomeJogador(String nomeJogador);
}