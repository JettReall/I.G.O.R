package com.example.igor.ficha.entity.PreRequisito;

import com.example.igor.ficha.entity.personagem.Classe;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class PreRequisitoClasse extends PreRequisito {

    @ManyToOne
    private Classe classeNecessaria;
}
