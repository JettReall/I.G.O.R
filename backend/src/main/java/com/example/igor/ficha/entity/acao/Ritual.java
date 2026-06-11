package com.example.igor.ficha.entity.acao;

import com.example.igor.ficha.Util.Elemento;
import jakarta.persistence.*;

@Entity
public class Ritual extends Acao{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private int dt;
    private boolean ativo;
    private int duracao;
    private int circulo;
    @Enumerated(EnumType.STRING)
    private Elemento elemento;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "ataque_id")
    private Ataque infoAtaque;
}