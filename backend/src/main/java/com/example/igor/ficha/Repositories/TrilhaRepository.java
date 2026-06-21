package com.example.igor.ficha.Repositories;

import java.util.List;

import com.example.igor.ficha.entity.acao.Habilidade;
import org.springframework.data.jpa.repository.JpaRepository; //outro pacote
import org.springframework.stereotype.Repository;

import com.example.igor.ficha.entity.personagem.Trilha;

@Repository
public interface TrilhaRepository extends JpaRepository<Trilha, Long> {
    List<Trilha> findByClasseId(Long classeId);
    boolean existsByHabilidadesContaining(Habilidade habilidade);
}