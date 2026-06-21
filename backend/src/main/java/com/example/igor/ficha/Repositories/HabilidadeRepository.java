package com.example.igor.ficha.Repositories;

import com.example.igor.ficha.entity.acao.Habilidade;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HabilidadeRepository extends JpaRepository<Habilidade, Long> {
    List<Habilidade> findByClasse(String classe);
}