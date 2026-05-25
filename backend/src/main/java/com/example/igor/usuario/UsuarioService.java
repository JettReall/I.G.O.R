package com.example.igor.usuario;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository repository;

    //Criar
    public Usuario cadastrarUsuario(Usuario usuario) {
        if(repository.existsByNome(usuario.getNome())){
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Esse nome já está em uso");
        }
        return repository.save(usuario);
    }

    //Get All
    public List<Usuario> listaUsuarios(){
        return repository.findAll();
    }

    //Get por ID
    public Usuario buscarUsuario(Long id){
        return repository.findById(id).orElse(null);
    }

    //Atualizar
    public Usuario atualizarUsuario(Long id,Usuario usuario){
        usuario.setId(id);
        return repository.save(usuario);
    }

    //Delete
    public int deletarUsuario(Long id) {
        repository.deleteById(id);
        return 0;
    }

    //verificar
    public String loginUsuario(Usuario usuario){
        Usuario a=repository.findByNome(usuario.getNome());
        if(a==null) return "Usuario não encontrado";
        if(a.getSenha().equals(usuario.getSenha())){
            return "Login OK";
        }
        return "Senha Errada";
    }
}