package com.example.igor.ficha.Repositories;

import com.example.igor.ficha.entity.personagem.Trilha; //outro pacote
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TrilhaRepository extends JpaRepository<Trilha, Long> {

}