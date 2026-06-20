package com.example.igor.ficha.entity.PreRequisito;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import jakarta.persistence.*;


@Entity
@Inheritance(strategy = InheritanceType.JOINED)

@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.PROPERTY, property = "tipo")
@JsonSubTypes({
    @JsonSubTypes.Type(value = PreRequisitoNex.class, name = "NEX"),
    @JsonSubTypes.Type(value = PreRequisitoAtributo.class, name = "ATRIBUTO"),
    @JsonSubTypes.Type(value = PreRequisitoHabilidade.class, name = "HABILIDADE"),
    @JsonSubTypes.Type(value = PreRequisitoClasse.class, name = "CLASSE")
})

public abstract class PreRequisito {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
}
