package com.example.igor.ficha.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.igor.ficha.entity.personagem.PericiaPersonagem;

public interface PericiaPersonagemRepository extends JpaRepository<PericiaPersonagem, Long> {
}
