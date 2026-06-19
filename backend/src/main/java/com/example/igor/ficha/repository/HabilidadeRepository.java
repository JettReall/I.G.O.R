package com.example.igor.ficha.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.igor.ficha.entity.acao.Habilidade;

@Repository
public interface HabilidadeRepository extends JpaRepository<Habilidade, Long> {

}