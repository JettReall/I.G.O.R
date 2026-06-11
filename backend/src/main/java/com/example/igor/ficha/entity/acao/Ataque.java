package com.example.igor.ficha.entity.acao;

import com.example.igor.ficha.Util.TipoDano;
import jakarta.persistence.*;

@Entity
public class Ataque extends Acao{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private int dano;
    @Enumerated(EnumType.STRING)
    private TipoDano tipoDano;
    private int criticoRange;
    private int criticoMult;
}
