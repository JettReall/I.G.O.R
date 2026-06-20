package com.example.igor.ficha.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class PersonagemDTO {
    private String nome;
    private String jogador;
    private Long origemId;
    private Long trilhaId;
    private Long classeId;
    private List<AtributosDTO> atributos;
    private List<Long> periciaLista;
}