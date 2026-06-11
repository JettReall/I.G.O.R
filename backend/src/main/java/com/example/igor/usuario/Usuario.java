package com.example.igor.usuario;

import com.example.igor.ficha.entity.Personagem;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private String senha;
    private String email;
    @OneToMany(cascade = CascadeType.ALL)
    private List<Personagem> personagemList;
}