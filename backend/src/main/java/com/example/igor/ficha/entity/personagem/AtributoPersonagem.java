package com.example.igor.ficha.entity.personagem;

import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Embeddable
public class AtributoPersonagem {
    private int agilidade;
    private int intelecto;
    private int vigor;
    private int presenca;
    private int forca;
}
