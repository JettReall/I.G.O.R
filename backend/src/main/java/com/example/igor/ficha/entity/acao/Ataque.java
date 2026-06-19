package com.example.igor.ficha.entity.acao;

import com.example.igor.Acao.AcoesChave;
import com.example.igor.Combate.DTO.ContextoAcao;
import com.example.igor.ficha.FichaUtil.TipoDano;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Ataque extends Acao{
    private int quantidadedadoritual;
    private int tamanhoDado;
    private int flatDano;
    @Enumerated(EnumType.STRING)
    private TipoDano tipoDano;
    private int criticoRange;
    private int criticoMult;

    @Override
    public AcoesChave getTipo() {
        return getAcaochave();
    }

    @Override
    public ContextoAcao usarAcao(ContextoAcao contexto) {
        return null;
    }
}
