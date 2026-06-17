package com.example.igor.ficha.entity;

import com.example.igor.ficha.entity.personagem.AtributoPersonagem;
import com.example.igor.ficha.entity.personagem.PericiaPersonagem;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class Ficha {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Embedded
    private AtributoPersonagem atributos;

    @OneToMany(mappedBy = "ficha", cascade = CascadeType.ALL)
    private List<PericiaPersonagem> pericias;

    @Column(columnDefinition = "integer default 0")
    private int iniciativa;
}
