package com.example.igor.ficha.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.igor.ficha.entity.personagem.Origem;

@Repository
public interface OrigemRepository extends JpaRepository<Origem, Long> {

}