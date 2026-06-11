package com.example.igor.ficha.entity;

import com.example.igor.ficha.Util.TipoOrigem;
import jakarta.persistence.*;

import java.util.List;

@Entity
public class Origem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private TipoOrigem nome;

    @ManyToMany
    private List<Pericia> pericias;
}