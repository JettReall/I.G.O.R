package com.example.igor.ficha.entity;

import com.example.igor.ficha.Util.Stats;
import jakarta.persistence.*;

@Entity
public class Monstro {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "atual", column = @Column(name = "vida_atual")),
            @AttributeOverride(name = "max", column = @Column(name = "vida_max")),
            @AttributeOverride(name = "temporario", column = @Column(name = "vida_temporario"))
    })
    private Stats vida;
}
