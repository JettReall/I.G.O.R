package com.example.igor.usuario;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.igor.usuario.UsuarioResponse.UsuarioResponse;

import io.swagger.v3.oas.annotations.Operation;

@RestController
@CrossOrigin(origins = "http://localhost:5176")
@RequestMapping("/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @Operation(
            summary = "Cadastra um usuario",
            description = "Recebe nome, email e senha. Retorna erro 409 se o nome ou email já estiverem em uso"
    )
    @PostMapping
    private UsuarioResponse cadastrar(@RequestBody UsuarioResponse usuario) {
        return usuarioService.cadastrarUsuario(usuario);
    }

    @Operation(
            summary = "Lista todos os usuarios",
            description = "Retorna uma lista com todos os usuarios cadastrados no banco"
    )
    @GetMapping
    private List<Usuario> lista(){
        return usuarioService.listaUsuarios();
    }

    @Operation(
            summary = "Busca um usuario por ID",
            description = "Recebe um ID por parâmetro e retorna o usuario correspondente"
    )
    @GetMapping("/{id}")
    private UsuarioResponse buscar(@PathVariable Long id){
        return usuarioService.buscarUsuario(id);
    }

    //Atualizar
    @Operation(
            summary = "Atualiza um usuario",
            description = "Recebe um usuario e o atualiza no banco com todas as novas informações, retorna o usuario que foi alterado"
    )
    @PutMapping
    private UsuarioResponse atualizar(@RequestBody UsuarioResponse usuario){
        return usuarioService.atualizarUsuario(usuario);
    }

    @Operation(
            summary = "Deleta um usuario",
            description = "Recebe um ID por parâmetro e deleta o usuario correspondente do banco"
    )
    @DeleteMapping("/{id}")
    private int deletar(@PathVariable Long id) {
        return usuarioService.deletarUsuario(id);
    }

    @Operation(
            summary = "Realiza login de um usuario",
            description = "Recebe email e senha, retorna 'Login OK' se as credenciais estiverem corretas, 'Senha Errada' ou 'Usuario não encontrado' caso contrário"
    )
    @PostMapping("/login")
    private UsuarioResponse login(@RequestBody UsuarioResponse usuario){
        return usuarioService.loginUsuario(usuario);
    }
}