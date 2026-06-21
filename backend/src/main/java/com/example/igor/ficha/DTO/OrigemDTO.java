package com.example.igor.ficha.dto;

import java.util.List;

import com.example.igor.ficha.entity.personagem.Origem;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Setter
@Getter
@NoArgsConstructor

public class OrigemDTO
{
    private List<Origem> origens;
    public OrigemDTO(List<Origem> origens) {
        this.origens = origens;
    }
}