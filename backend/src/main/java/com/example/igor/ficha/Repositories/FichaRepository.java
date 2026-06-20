package com.example.igor.ficha.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.igor.ficha.entity.Ficha;

public interface FichaRepository extends JpaRepository<Ficha, Long> {
}
