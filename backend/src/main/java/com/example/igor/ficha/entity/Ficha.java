package com.example.igor.ficha.entity;

import java.util.List;

import com.example.igor.ficha.FichaUtil.AtributoEnum;
import com.example.igor.ficha.FichaUtil.Stats;
import com.example.igor.ficha.entity.personagem.AtributoPersonagem;
import com.example.igor.ficha.entity.personagem.PericiaPersonagem;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.AttributeOverrides;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.OneToMany;
import lombok.AccessLevel;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class Ficha {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nomePersonagem;

    @Getter(AccessLevel.NONE)
    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "atual", column = @Column(name = "vida_atual")),
            @AttributeOverride(name = "max", column = @Column(name = "vida_max")),
            @AttributeOverride(name = "temporario", column = @Column(name = "vida_temporario"))
    })
    private Stats vida = new Stats(0, 0, -1);


    @Embedded
    private AtributoPersonagem atributos;

    @OneToMany(mappedBy = "ficha", cascade = CascadeType.ALL)
    private List<PericiaPersonagem> pericias;

    @Column(columnDefinition = "integer default 0")
    private int iniciativa;


    public int getValorAtributo(AtributoEnum atributo){
        return switch (atributo){
            case AGILIDADE -> getAtributos().getAgilidade();
            case INTELECTO -> getAtributos().getIntelecto();
            case VIGOR -> getAtributos().getVigor();
            case PRESENCA -> getAtributos().getPresenca();
            case FORCA -> getAtributos().getForca();
        };
    }

    public Stats getVida() {
        System.out.println("VIDA FIELD: " + vida);
        if (vida == null) {
            vida = new Stats(0, 0, 0);
        }
        return vida;
    }



    public int getValorAtributo(AtributoEnum atributo){
        return switch (atributo){
            case AGILIDADE -> getAtributos().getAgilidade();
            case INTELECTO -> getAtributos().getIntelecto();
            case VIGOR -> getAtributos().getVigor();
            case PRESENCA -> getAtributos().getPresenca();
            case FORCA -> getAtributos().getForca();
        };
    }

    public Stats getVida() {
        System.out.println("VIDA FIELD: " + vida);
        if (vida == null) {
            vida = new Stats(0, 0, 0);
        }
        return vida;
    }

}
