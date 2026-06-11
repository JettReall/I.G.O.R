package com.example.igor.ficha.entity;

import jakarta.persistence.Embeddable;

@Embeddable
public class Atributo {
    private String nome;
    private String valor;
}
