package com.example.igor.ficha.entity.personagem;

import java.util.List;

import com.example.igor.ficha.FichaUtil.Stats;
import com.example.igor.ficha.entity.Efeito;
import com.example.igor.ficha.entity.Ficha;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.AttributeOverrides;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Embedded;
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
public class Personagem extends Ficha {

    private String nomePersonagem;

    private String nomeJogador;

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "atual", column = @Column(name = "vida_atual")),
            @AttributeOverride(name = "max", column = @Column(name = "vida_max")),
            @AttributeOverride(name = "temporario", column = @Column(name = "vida_temporario"))
    })
    private Stats vida;


    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "atual", column = @Column(name = "pe_atual")),
            @AttributeOverride(name = "max", column = @Column(name = "pe_max")),
            @AttributeOverride(name = "temporario", column = @Column(name = "pe_temporario"))
    })
    private Stats pe;


    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "atual", column = @Column(name = "sanidade_atual")),
            @AttributeOverride(name = "max", column = @Column(name = "sanidade_max")),
            @AttributeOverride(name = "temporario", column = @Column(name = "sanidade_temporario"))
    })
    private Stats sanidade;

    @Embedded
    private AtributoPersonagem atributos;


    private int defesa;

//  PROTECAO ENUM

    private int esquiva;

//resistencias

    private String proeficiencia;

    private int nex;

    private int deslocamento;

//patente

//afinidade

    @ElementCollection
    private List<Efeito> efeito;

    @Embedded
    private Anotacoes anotacoes;

    @ManyToOne
    private Origem origem;



    @Embedded
    private Inventario inventario;
}