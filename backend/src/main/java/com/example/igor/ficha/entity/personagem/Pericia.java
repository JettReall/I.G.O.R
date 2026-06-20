package com.example.igor.ficha.entity.personagem;

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
public class Pericia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    private String atributo;

    @Column(columnDefinition = "TEXT")
    private String descricao;

}

/*
Ids:
1. Acrobacia
2. Adestramento
3. Artes
4. Atletismo
5. Atualidades
6. Ciências
7. Crime
8. Diplomacia
9. Enganação
10. Fortitude
11. Furtividade
12. Iniciativa
13. Intimidação
14. Intuição
15. Investigação
16. Luta
17. Medicina
18. Ocultismo
19. Percepção
20. Pilotagem
21. Pontaria
22. Profissão
23. Reflexos
24. Religião
25. Sobrevivência
26. Tática
27. Tecnologia
28. Vontade
*/