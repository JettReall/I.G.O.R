package com.example.igor.ficha.entity.PreRequisito;

import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class PreRequisitoNex extends PreRequisito {

    private int nexMinimo;
}