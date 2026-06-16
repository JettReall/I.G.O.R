package com.example.igor.ficha.entity.PreRequisito;

import com.example.igor.ficha.FichaUtil.AtributoEnum;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class PreRequisitoAtributo extends PreRequisito {

    @Enumerated(EnumType.STRING)
    private AtributoEnum atributo;

    private int valorMinimo;
}
