package com.example.igor.Combate;

import com.example.igor.ficha.entity.Efeito;
import com.example.igor.ficha.entity.Ficha;
import com.example.igor.ficha.entity.Monstro;
import com.example.igor.ficha.entity.personagem.Personagem;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Combate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int turno;

    @ManyToMany
    @JoinTable(
            name = "combate_ordem_turno",
            joinColumns = @JoinColumn(name = "combate_id"),
            inverseJoinColumns = @JoinColumn(name = "ficha_id")
    )
    private List<Ficha> ordemTurno;

    @ElementCollection
    @CollectionTable(
            name = "combate_efeitos",
            joinColumns = @JoinColumn(name = "combate_id")
    )
    private List<Efeito> efeitos;

    @ManyToMany
    @JoinTable(
            name = "combate_personagens",
            joinColumns = @JoinColumn(name = "combate_id"),
            inverseJoinColumns = @JoinColumn(name = "personagem_id")
    )
    private List<Personagem> personagens;

    @ManyToMany
    @JoinTable(
            name = "combate_monstros",
            joinColumns = @JoinColumn(name = "combate_id"),
            inverseJoinColumns = @JoinColumn(name = "monstro_id")
    )
    private List<Monstro> monstros;
}