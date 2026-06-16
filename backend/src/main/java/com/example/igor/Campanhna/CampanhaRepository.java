package com.example.igor.Campanhna;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CampanhaRepository extends JpaRepository<Campanha, Long> {
    boolean existsByNome(String nome);
}
