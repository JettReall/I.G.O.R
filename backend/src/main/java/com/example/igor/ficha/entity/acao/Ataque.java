package com.example.igor.ficha.entity.acao;

import com.example.igor.ficha.FichaUtil.TipoDano;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
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
