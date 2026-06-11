package com.example.igor.ficha.entity.PreRequisito;

import jakarta.persistence.*;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class PreRequisito {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
}
