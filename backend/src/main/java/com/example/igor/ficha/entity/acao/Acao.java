package com.example.igor.ficha.entity.acao;

import com.example.igor.Acao.AcoesChave;
import com.example.igor.Combate.Util.UsarAcao;
import com.example.igor.ficha.FichaUtil.AtributoEnum;
import com.example.igor.ficha.FichaUtil.TipoAcao;
import com.example.igor.ficha.entity.Efeito;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class Acao implements UsarAcao{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private String descricao;
    @Enumerated(EnumType.STRING)
    private AtributoEnum atributo;
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
    @Enumerated(EnumType.STRING)
    private AcoesChave acaochave;
}