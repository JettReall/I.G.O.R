package com.example.igor.ficha.entity.acao;

import com.example.igor.ficha.Util.TipoAcao;
import com.example.igor.ficha.entity.Efeito;
import jakarta.persistence.*;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class Acao {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private String descricao;
    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "nome", column = @Column(name = "efeito_nome")),
            @AttributeOverride(name = "descricao", column = @Column(name = "efeito_descricao"))
    })
    private Efeito efeito;
    @Enumerated(EnumType.STRING)
    private TipoAcao acao;
    @Embedded
    private Pe custo;
    private int alcance;

}