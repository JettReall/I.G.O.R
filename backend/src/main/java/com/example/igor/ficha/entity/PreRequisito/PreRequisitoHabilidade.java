package com.example.igor.ficha.entity.PreRequisito;

import com.example.igor.ficha.entity.Habilidade;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;

@Entity
public class PreRequisitoHabilidade extends PreRequisito {

    @ManyToOne
    private Habilidade habilidadeNecessaria;
}
