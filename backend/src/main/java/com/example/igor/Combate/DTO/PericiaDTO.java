package com.example.igor.Combate.DTO;


import com.example.igor.global.Dado.RolagemDado;


public class PericiaDTO {
    public Long idPericia;
    public Long idPersonagem;
    public RolagemDado rolagem;

    public PericiaDTO(Long idPericia, Long idPersonagem) {
        this.idPericia = idPericia;
        this.idPersonagem = idPersonagem;
    }
}