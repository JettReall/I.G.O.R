package com.example.igor.ficha.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.igor.ficha.entity.personagem.Trilha; //outro pacote

@Repository
public interface TrilhaRepository extends JpaRepository<Trilha, Long> {

}