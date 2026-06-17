package com.example.igor.ficha.dto;

public class PersonagemDTO {

    private String nomePersonagem;
    private String nomeJogador;

    public PersonagemDTO() {
    }

    public PersonagemDTO(String nomePersonagem, String nomeJogador) {
        this.nomePersonagem = nomePersonagem;
        this.nomeJogador = nomeJogador;
    }

    public String getNomePersonagem() {
        return nomePersonagem;
    }

    public void setNomePersonagem(String nomePersonagem) {
        this.nomePersonagem = nomePersonagem;
    }

    public String getNomeJogador() {
        return nomeJogador;
    }

    public void setNomeJogador(String nomeJogador) {
        this.nomeJogador = nomeJogador;
    }
}