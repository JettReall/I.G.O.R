package com.example.igor.Combate.Repositories;

import com.example.igor.Campanha.Campanha;
import com.example.igor.Combate.Combate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CombateRepository extends JpaRepository<Combate, Long> {
    @Query("SELECT c FROM Combate c WHERE c.id IN (SELECT comb.id FROM Campanha camp JOIN camp.combates comb WHERE camp.id = :campanhaId)")
    List<Combate> findByCampanhaId(@Param("campanhaId") Long campanhaId);

}
