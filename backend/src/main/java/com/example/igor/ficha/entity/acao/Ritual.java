package com.example.igor.ficha.entity.acao;

import com.example.igor.Acao.AcoesChave;
import com.example.igor.Combate.DTO.ContextoAcao;
import com.example.igor.ficha.FichaUtil.Elemento;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Ritual extends Acao{
    private int dt;
    private boolean ativo;
    private int duracao;
    private int circulo;
    @Enumerated(EnumType.STRING)
    private Elemento elemento;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "ataque_id")
    private Ataque infoAtaque;

    @Override
    public AcoesChave getTipo() {
        return getAcaochave();
    }

    @Override
    public ContextoAcao usarAcao(ContextoAcao contexto) {
        return null;
    }
}