package com.example.igor.usuario;

import com.example.igor.Campanha.Campanha;
import com.example.igor.ficha.entity.Monstro;
import com.example.igor.ficha.entity.personagem.Personagem;
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
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private String senha;
    private String email;
    @OneToMany(cascade = CascadeType.ALL)
    private List<Personagem> personagemList;
    @OneToMany(cascade = CascadeType.ALL)
    private List<Monstro> monstroList;
    @OneToMany(mappedBy = "usuario")
    private List<Campanha> campanhas;
}