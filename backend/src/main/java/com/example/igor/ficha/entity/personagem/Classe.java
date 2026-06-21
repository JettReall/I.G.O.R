package com.example.igor.ficha.entity.personagem;

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
public class Classe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; //1- Combatente, 2- Especialista, 3- Ocultista
    private String nome;
    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "inicial", column = @Column(name = "hp_inicial")),
            @AttributeOverride(name = "adicional", column = @Column(name = "hp_adicional"))
    })
    private StatsClasse hp;
    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "inicial", column = @Column(name = "pe_inicial")),
            @AttributeOverride(name = "adicional", column = @Column(name = "pe_adicional"))
    })
    private StatsClasse pe;
    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "inicial", column = @Column(name = "san_inicial")),
            @AttributeOverride(name = "adicional", column = @Column(name = "san_adicional"))
    })
    private StatsClasse san;
    @OneToMany(mappedBy = "classe")
    private List<Trilha> trilhas;
}
