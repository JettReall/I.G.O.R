package com.example.igor.ficha.entity.personagem;

import jakarta.persistence.*;

@Entity
public class Pericia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    @Embedded
    @AttributeOverride(
            name = "nome",
            column = @Column(name = "atributo_nome")
    )
    private Atributo atributo;

    private String descricao;
}