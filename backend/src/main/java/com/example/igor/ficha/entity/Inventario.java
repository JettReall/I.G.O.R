package com.example.igor.ficha.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Embeddable;
import jakarta.persistence.ManyToMany;

import java.util.List;

@Embeddable
public class Inventario {
    @ManyToMany
    private List<Item> item;
}
