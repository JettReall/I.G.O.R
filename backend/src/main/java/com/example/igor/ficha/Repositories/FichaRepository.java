package com.example.igor.ficha.Repositories;

import com.example.igor.ficha.entity.Ficha;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FichaRepository extends JpaRepository<Ficha, Long> {
}
