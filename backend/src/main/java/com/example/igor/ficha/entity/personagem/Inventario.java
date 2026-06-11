package com.example.igor.ficha.entity.personagem;

import jakarta.persistence.Embeddable;
import jakarta.persistence.ManyToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class Inventario {
    @ManyToMany
    private List<Item> item;
}
