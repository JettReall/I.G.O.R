package com.example.igor.ficha.FichaUtil;

import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Embeddable
public class Stats {
    int atual;
    int max;
    int temporario;
}
