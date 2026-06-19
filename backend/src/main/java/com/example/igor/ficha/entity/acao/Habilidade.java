package com.example.igor.ficha.entity.acao;

import java.util.List;

import com.example.igor.ficha.FichaUtil.Elemento;
import com.example.igor.ficha.entity.PreRequisito.PreRequisito;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
}
