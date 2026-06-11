package com.example.igor.ficha.entity.PreRequisito;

import com.example.igor.ficha.Util.AtributoEnum;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

public class PreRequisitoAtributo extends PreRequisito {

    @Enumerated(EnumType.STRING)
    private AtributoEnum atributo;

    private int valorMinimo;
}
