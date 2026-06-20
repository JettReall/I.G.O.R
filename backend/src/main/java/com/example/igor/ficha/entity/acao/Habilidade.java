package com.example.igor.ficha.entity.acao;

import com.example.igor.Acao.AcoesChave;
import com.example.igor.Combate.DTO.ContextoAcao;
import com.example.igor.ficha.FichaUtil.Elemento;
import com.example.igor.ficha.entity.PreRequisito.PreRequisito;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Habilidade extends Acao{
    private String classe;
    private int duracao;
    private boolean usoUnico;
    private int contadorUsos;
    @Enumerated(EnumType.STRING)
    private Elemento elemento;
    @ManyToMany(cascade = CascadeType.ALL) //salvar a habilidade e os requisitos junto.
    @JoinTable(
            name = "habilidade_prerequisito",
            joinColumns = @JoinColumn(name = "habilidade_id"),
            inverseJoinColumns = @JoinColumn(name = "prerequisito_id")
    )
    private List<PreRequisito> preRequisitos;

    @Override
    public AcoesChave getTipo() {
        return getAcaochave();
    }

    @Override
    public ContextoAcao usarAcao(ContextoAcao contexto) {
        return null;
    }
}
