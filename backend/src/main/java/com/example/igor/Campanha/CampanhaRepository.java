package com.example.igor.Campanha;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CampanhaRepository extends JpaRepository<Campanha, Long> {
    boolean existsByNome(String nome);
    List<Campanha> findByUsuarioId(Long id);
}
