package com.example.igor.usuario.UsuarioResponse;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class UsuarioResponse {
    private Long id;
    private String nome;
    private String email;
    private String senha;
}