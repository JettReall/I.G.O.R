package com.example.igor.ficha.Repositories;

import com.example.igor.ficha.entity.Monstro;
import com.example.igor.ficha.entity.personagem.Pericia;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MonstroRepository extends JpaRepository<Monstro, Long> {
}
