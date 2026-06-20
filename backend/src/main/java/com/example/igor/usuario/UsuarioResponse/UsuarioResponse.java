package com.example.igor.usuario.UsuarioResponse;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UsuarioResponse {
    private Long id;
    private String nome;
    private String email;
    private String senha;
    private String mensagem;

    public UsuarioResponse(Long id,String nome,String email, String senha){
        this.id = id;
        this.nome = nome;
        this.email=email;
        this.senha =senha;
    }

    public UsuarioResponse(String mensagem){
        this.mensagem=mensagem;
    }
}