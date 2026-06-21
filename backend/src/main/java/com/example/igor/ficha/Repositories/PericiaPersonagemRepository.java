package com.example.igor.ficha.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.igor.ficha.entity.personagem.PericiaPersonagem;
import com.example.igor.ficha.entity.personagem.Personagem;

public interface PericiaPersonagemRepository extends JpaRepository<PericiaPersonagem, Long> {
    List<PericiaPersonagem> findByFicha(Personagem ficha);
}
