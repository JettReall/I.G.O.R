package com.example.igor.repository;

import com.example.igor.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    Usuario findByNome(String nome);
    boolean existsByNome(String nome);
}