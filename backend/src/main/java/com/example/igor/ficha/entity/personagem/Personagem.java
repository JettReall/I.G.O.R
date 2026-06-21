package com.example.igor.ficha.entity.personagem;

import java.util.List;

import com.example.igor.ficha.FichaUtil.Stats;
import com.example.igor.ficha.entity.Efeito;
import com.example.igor.ficha.entity.Ficha;
import com.example.igor.ficha.entity.acao.Habilidade;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.AttributeOverrides;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PostLoad;
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

    private String nomeJogador;

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

    @ManyToMany
    private List<Habilidade> habilidades;

    /*
    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;
    //Não sei se vai precisar dessa parte ainda.
    */   

    @ElementCollection
    private List<Efeito> efeito;

    @Embedded
    private Anotacoes anotacoes;

    @ManyToOne
    private Origem origem;

    @ManyToOne
    @JoinColumn(name = "classe_id")
    private Classe classe;

    @ManyToOne
    @JoinColumn(name = "trilha_id")
    private Trilha trilha;

    @Embedded
    private Inventario inventario;

    @PostLoad
    public void initPersonagemEmbeddeds() {
        if (pe == null) {
            pe = new Stats(0, 0, 0);
        }
        if (sanidade == null) {
            sanidade = new Stats(0, 0, 0);
        }
    }

}