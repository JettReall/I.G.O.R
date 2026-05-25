package com.example.igor.usuario;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    //Criar
    @PostMapping
    private Usuario cadastrar(@RequestBody Usuario usuario) {
        return usuarioService.cadastrarUsuario(usuario);
    }

    //Get All
    @GetMapping
    private List<Usuario> lista(){
        return usuarioService.listaUsuarios();
    }

    //Get por ID
    @GetMapping("/{id}")
    private Usuario buscar(@PathVariable Long id){
        return usuarioService.buscarUsuario(id);
    }

    //Atualizar
    @PutMapping("/{id}")
    private Usuario atualizar(@PathVariable Long id, @RequestBody Usuario usuario){
        return usuarioService.atualizarUsuario(id,usuario);
    }

    //Delete
    @DeleteMapping("/{id}")
    private int deletar(@PathVariable Long id) {
        return usuarioService.deletarUsuario(id);
    }

    //verificar
    @PostMapping("/login")
    private String login(@RequestBody Usuario usuario){
        return usuarioService.loginUsuario(usuario);
    }
}

