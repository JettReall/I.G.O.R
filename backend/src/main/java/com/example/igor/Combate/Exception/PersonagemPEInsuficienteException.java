package com.example.igor.Combate.Exception;

public class PersonagemPEInsuficienteException extends RuntimeException {
    public PersonagemPEInsuficienteException(String message) {
        super("O personagem atual não possui PE o suficiente para usar esse ataque");
    }
}
