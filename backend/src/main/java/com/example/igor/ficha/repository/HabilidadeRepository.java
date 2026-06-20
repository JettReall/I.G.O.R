package com.example.igor.ficha.repository;

import com.example.igor.ficha.entity.acao.Habilidade;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HabilidadeRepository extends JpaRepository<Habilidade, Long> {

}