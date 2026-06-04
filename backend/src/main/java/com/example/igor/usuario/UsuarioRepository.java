package com.example.igor.usuario;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    Usuario findByNome(String nome);
    Usuario findByEmail(String email);
    boolean existsByNome(String nome);
    boolean existsByEmail(String email);

}