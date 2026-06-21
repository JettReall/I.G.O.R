package com.example.igor.ficha.dto;

import com.example.igor.ficha.entity.personagem.Trilha;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TrilhaDTO {

    private Long id;
    private String nome;

    public TrilhaDTO(Trilha trilha) {
        this.id = trilha.getId();
        this.nome = trilha.getNome();
    }
}