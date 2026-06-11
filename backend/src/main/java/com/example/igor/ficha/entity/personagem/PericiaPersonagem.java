package com.example.igor.ficha.entity.personagem;

import jakarta.persistence.*;

@Entity
public class PericiaPersonagem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Personagem personagem;

    @ManyToOne
    private Pericia pericia;

    private int treino;
    private int bonus;
    private int outro;
}