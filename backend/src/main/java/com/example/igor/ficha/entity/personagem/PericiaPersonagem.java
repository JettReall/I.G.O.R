package com.example.igor.ficha.entity.personagem;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
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