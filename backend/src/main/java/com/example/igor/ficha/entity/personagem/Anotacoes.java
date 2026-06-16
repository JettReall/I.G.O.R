package com.example.igor.ficha.entity.personagem;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class Anotacoes {
    private String historia;
    private String aparencia;
    private String outro;
}
