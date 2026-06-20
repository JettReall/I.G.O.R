package com.example.igor.ficha.entity.personagem;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Embeddable
public class AtributoPersonagem {
    private Integer agilidade;
    private Integer intelecto;
    private Integer vigor;
    private Integer presenca;
    private Integer forca;
}
