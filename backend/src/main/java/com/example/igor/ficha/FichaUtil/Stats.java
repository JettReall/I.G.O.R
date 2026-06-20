package com.example.igor.ficha.FichaUtil;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Stats {
    @Column(nullable = false, columnDefinition = "integer default 0")
    Integer atual;
    @Column(nullable = false, columnDefinition = "integer default 0")
    Integer max;
    @Column(nullable = false, columnDefinition = "integer default 0")
    Integer temporario;
}
