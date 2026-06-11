package com.example.igor.ficha.entity.personagem;

import jakarta.persistence.Embeddable;

@Embeddable
public class Atributo {
    private String nome;
    private String valor;
}
