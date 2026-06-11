package com.example.igor.ficha.entity;

import com.example.igor.ficha.Util.Stats;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
public class Personagem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

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

    @OneToMany(mappedBy = "personagem", cascade = CascadeType.ALL)
    private List<PericiaPersonagem> pericias;

    @Embedded
    private Inventario inventario;
}