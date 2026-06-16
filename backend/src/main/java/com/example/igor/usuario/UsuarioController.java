package com.example.igor.usuario;

import java.util.List;

import com.example.igor.usuario.UsuarioResponse.UsuarioResponse;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    //Criar
    @PostMapping
    private UsuarioResponse cadastrar(@RequestBody UsuarioResponse usuario) {
        return usuarioService.cadastrarUsuario(usuario);
    }

    //Get All
    @GetMapping
    private List<Usuario> lista(){
        return usuarioService.listaUsuarios();
    }

    //Get por ID
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

    //Delete
    @DeleteMapping("/{id}")
    private int deletar(@PathVariable Long id) {
        return usuarioService.deletarUsuario(id);
    }

    //verificar
    @PostMapping("/login")
    private String login(@RequestBody UsuarioResponse usuario){
        return usuarioService.loginUsuario(usuario);
    }
}