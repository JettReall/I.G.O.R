package com.example.igor.ficha.LevelUp.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class NexUpDTO {
    private int nexNovo;
    private boolean ganhaHabilidadeTrilha;   // nex 10,40,65,99
    private boolean ganhaPoderClasse;        // nex 15,30,45,60,75,90 (múltiplos de 15)
    private boolean ganhaAtributo;           // nex 20,50,80,95
    private boolean ganhaTreinoPericia;      // nex 35,70
    private boolean ehNexEspecial50;         // nex 50: trilha OU classe + atributo + afinidade
}