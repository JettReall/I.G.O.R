package com.example.igor.ficha.entity;

import com.example.igor.ficha.Util.Elemento;
import com.example.igor.ficha.entity.PreRequisito.PreRequisito;
import jakarta.persistence.*;

import java.util.List;

@Entity
public class Habilidade {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private String classe;
    private int duracao;
    private boolean usoUnico;
    private int contadorUsos;
    @Enumerated(EnumType.STRING)
    private Elemento elemento;
    @ManyToMany
    @JoinTable(
            name = "habilidade_prerequisito",
            joinColumns = @JoinColumn(name = "habilidade_id"),
            inverseJoinColumns = @JoinColumn(name = "prerequisito_id")
    )
    private List<PreRequisito> preRequisitos;
}
