package com.example.igor.ficha.Repositories;

import com.example.igor.ficha.entity.personagem.Personagem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PersonagemRepository extends JpaRepository<Personagem, Long> {
}