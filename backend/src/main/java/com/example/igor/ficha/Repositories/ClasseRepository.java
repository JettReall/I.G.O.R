package com.example.igor.ficha.Repositories;

import com.example.igor.ficha.entity.personagem.Classe; //outro pacote
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClasseRepository extends JpaRepository<Classe, Long> {

}