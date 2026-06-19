package com.example.igor.Combate.Exception;

public class PericiaSemPersonagem extends RuntimeException {
    public PericiaSemPersonagem() {
        super("O usuario passado nao eh um personagem");
    }
}
