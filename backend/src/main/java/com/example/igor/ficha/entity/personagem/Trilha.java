package com.example.igor.ficha.entity.personagem;

import com.example.igor.ficha.entity.acao.Habilidade;
import jakarta.persistence.*;

import java.util.List;

@Entity
public class Trilha {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    @ManyToMany
    private List<Habilidade> habilidades;
    @ManyToOne
    private Classe classe;
}
