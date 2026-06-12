package com.example.igor.global.Dado;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Setter
@Getter
@NoArgsConstructor
public class RolagemDado {

    private List<Dado> dados;

    private int quantidade;

    private int bonus;

    private int somaTotal;

    private Dado maiorDado;

    private int resultadoTotal = somaTotal + bonus;

    //construtor
    public RolagemDado(int quantidade, int tamanho, int bonus){
        this();
        //quantidade = 0 implica em rolagem vazia
        if(quantidade<=0) {
            return;
        }else{

            this.bonus = bonus;
            this.quantidade = quantidade;

            this.dados = new ArrayList<>();
            int soma = 0;
            int maiorvalor = 0;
            int maiorindice = 0;
            //roda todes os dades
            for (int i = 0; i < quantidade; i++) {

                this.dados.add(new Dado(tamanho));
                soma += this.dados.get(i).valor;
                //salva o maior dado
                if (this.dados.get(i).valor > maiorvalor) {
                    maiorvalor = this.dados.get(i).valor;
                    maiorindice = i;
                }

            }

            this.somaTotal = soma;
            this.maiorDado = this.dados.get(maiorindice);
        }
    }

    public int getResultadoTotal() {
        return somaTotal + bonus;
    }
}