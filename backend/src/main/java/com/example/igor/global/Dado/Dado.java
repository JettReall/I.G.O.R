package com.example.igor.global.Dado;


import lombok.NoArgsConstructor;

import java.util.concurrent.ThreadLocalRandom;

@NoArgsConstructor
public class Dado implements Rolar{
    public int tamanho;
    public int valor;
    public Dado(int tamanho){
        this.tamanho = tamanho;
        this.valor = ThreadLocalRandom.current().nextInt(1, tamanho+1);
    }
    @Override
    public Dado rolar(int tamanho){
        return new Dado(tamanho);
    }
}