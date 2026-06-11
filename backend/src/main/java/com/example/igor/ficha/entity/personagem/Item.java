package com.example.igor.ficha.entity.personagem;

import com.example.igor.ficha.entity.Efeito;
import jakarta.persistence.*;

@Entity
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private String descricao;
    @Embedded
    @AttributeOverrides({
            @AttributeOverride(
                    name = "nome",
                    column = @Column(name = "efeito_nome")
            ),
            @AttributeOverride(
                    name = "descricao",
                    column = @Column(name = "efeito_descricao")
            )
    })
    private Efeito efeito;
    private int espaco;
    private String categoria;
}
