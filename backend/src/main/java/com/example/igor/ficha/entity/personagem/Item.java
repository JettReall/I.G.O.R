package com.example.igor.ficha.entity.personagem;

import com.example.igor.ficha.entity.Efeito;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
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
