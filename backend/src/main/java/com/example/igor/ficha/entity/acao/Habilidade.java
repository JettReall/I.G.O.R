package com.example.igor.ficha.entity.acao;

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
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String classe;
    private int duracao;
    private boolean usoUnico;
    private int contadorUsos;
    @Enumerated(EnumType.STRING)
    private Elemento elemento;
    @ManyToMany
    @JoinTable(
            name = "habilidade_prerequisito",
            joinColumns = @JoinColumn(name = "habilidade_id"),
            inverseJoinColumns = @JoinColumn(name = "prerequisito_id")
    )
    private List<PreRequisito> preRequisitos;
}
