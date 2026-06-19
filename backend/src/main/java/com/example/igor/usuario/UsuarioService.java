package com.example.igor.usuario;

import com.example.igor.usuario.UsuarioResponse.UsuarioResponse;
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
    public UsuarioResponse cadastrarUsuario(UsuarioResponse usuario) {
        Usuario usuarioBanco = new Usuario();
        if(repository.existsByNome(usuario.getNome())){
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Esse nome já está em uso");
        }
        if(repository.existsByEmail(usuario.getEmail())){
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Esse email já está em uso");
        }
        usuarioBanco.setNome(usuario.getNome());
        usuarioBanco.setEmail(usuario.getEmail());
        usuarioBanco.setSenha(usuario.getSenha());

        repository.save(usuarioBanco);
        usuario.setId(usuarioBanco.getId());
        return usuario;
    }

    //Get All
    public List<Usuario> listaUsuarios(){
        return repository.findAll();
    }

    //Get por ID
    public UsuarioResponse buscarUsuario(Long id){
        Usuario usuario = repository.findById(id).orElse(null);
        UsuarioResponse dto = new UsuarioResponse(usuario.getId(), usuario.getNome(),usuario.getEmail(),usuario.getSenha());
        return dto;
    }

    //Atualizar
    public UsuarioResponse atualizarUsuario(UsuarioResponse usuario){
        Usuario usuarioBanco = repository.findById(usuario.getId()).orElse(null);
        usuarioBanco.setNome(usuario.getNome());
        usuarioBanco.setEmail(usuario.getEmail());
        usuarioBanco.setSenha(usuario.getSenha());
        repository.save(usuarioBanco);
        return usuario;
    }

    //Delete
    public int deletarUsuario(Long id) {
        repository.deleteById(id);
        return 0;
    }

    //verificar
    public UsuarioResponse loginUsuario(UsuarioResponse usuario){
        Usuario a=repository.findByEmail(usuario.getEmail());
        if(a==null) return new UsuarioResponse("Usuario nao encontrado");
        if(a.getSenha().equals(usuario.getSenha())){
            return new UsuarioResponse(a.getId(),a.getNome(),a.getEmail(),a.getSenha(),"Login ok");
        }
        return new UsuarioResponse("senha errada");
    }
}