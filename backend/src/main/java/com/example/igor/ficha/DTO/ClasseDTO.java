package com.example.igor.ficha.dto;


import com.example.igor.ficha.entity.personagem.Classe;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Setter
@Getter
@NoArgsConstructor

public class ClasseDTO
{
    private Long id;
    private String nome;
    private int numero_Pericias_Iniciais;
 
    // Converter a entidade Classe para usar apenas o que eu preciso.
    public ClasseDTO(Classe classe) {
        this.id = classe.getId();
        this.nome = classe.getNome();
        this.numero_Pericias_Iniciais = classe.getNumeroPericiasIniciais();
    }
}