package com.example.igor.ficha.entity.PreRequisito;

import com.example.igor.ficha.entity.Classe;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;

@Entity
public class PreRequisitoClasse extends PreRequisito {

    @ManyToOne
    private Classe classeNecessaria;
}
