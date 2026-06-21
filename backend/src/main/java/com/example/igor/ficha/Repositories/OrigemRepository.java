package com.example.igor.ficha.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.igor.ficha.entity.personagem.Origem;

@Repository
public interface OrigemRepository extends JpaRepository<Origem, Long> {
    @Query("SELECT DISTINCT o FROM Origem o LEFT JOIN FETCH o.pericias")
    List<Origem> findAllComPericias();
}