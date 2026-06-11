package com.example.igor.Campanhna;

import com.example.igor.Combate.Combate;
import com.example.igor.ficha.entity.Monstro;
import com.example.igor.ficha.entity.personagem.Personagem;
import com.example.igor.usuario.Usuario;
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
public class Campanha {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    @Column(length = 10000)
    private String anotacao;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "campanha_id")
    private List<Combate> combates;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "campanha_id")
    private List<Personagem> personagens;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "campanha_id")
    private List<Monstro> monstros;
}
