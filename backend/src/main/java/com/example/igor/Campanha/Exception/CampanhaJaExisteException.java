package com.example.igor.Campanha.Exception;

public class CampanhaJaExisteException extends RuntimeException {

    public CampanhaJaExisteException(String nome) {
        super("Já existe uma campanha com o nome: " + nome);
    }
}
