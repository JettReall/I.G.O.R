package com.example.igor.ficha.entity.personagem;

import java.util.List;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.AttributeOverrides;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
    
    @Column(name = "numero_pericias_iniciais")
    private int numeroPericiasIniciais;

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
