package com.example.igor.ficha.entity;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class Classe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private StatsClasse hp;
    private StatsClasse pe;
    private StatsClasse san;
    @OneToMany
    private List<Trilha> trilhas;
}
