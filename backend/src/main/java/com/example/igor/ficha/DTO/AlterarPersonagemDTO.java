package com.example.igor.ficha.DTO;

import java.util.List;

import com.example.igor.ficha.dto.AtributosDTO;
import com.example.igor.ficha.entity.personagem.Anotacoes;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class AlterarPersonagemDTO {
    private String nome;
    private String jogador;
    private AtributosDTO atributos;
    private List<Long> periciaLista;
        
    private Integer esquiva;
    private Integer deslocamento;

    private Integer vidaAtual;
    private Integer peAtual;
    private Integer sanidadeAtual;
    private Anotacoes anotacoes;
    //não deu tempo implementar private Inventario inventario;
    private String proeficiencia;
}