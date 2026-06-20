package com.example.igor.ficha.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.igor.ficha.FichaUtil.Stats;
import com.example.igor.ficha.Repositories.PericiaRepository;
import com.example.igor.ficha.dto.PersonagemDTO;
import com.example.igor.ficha.entity.personagem.Pericia;
import com.example.igor.ficha.entity.personagem.PericiaPersonagem;
import com.example.igor.ficha.entity.personagem.Personagem;
import com.example.igor.ficha.repository.PericiaPersonagemRepository;
import com.example.igor.ficha.repository.PersonagemRepository;
import com.example.igor.usuario.Usuario;
import com.example.igor.usuario.UsuarioRepository;

@Service
public class PersonagemService {

    @Autowired
    private PersonagemRepository personagemRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PericiaRepository periciaRepository;

    @Autowired
    private PericiaPersonagemRepository periciaPersonagemRepository;

    //Inicializa um personagem no banco, com os valores bases e os mutaveis zerados. Define o nome do jogador que tem esse perso e o nome do personagem.
    public Personagem criarPersonagem(PersonagemDTO dto, Long Id) {
        /*
        Usuario usuario = usuarioRepository.findById(dto.getUsuarioId())
        .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        */

        Personagem personagem = new Personagem();
        personagem.setNomePersonagem(dto.getNome());
        personagem.setNomeJogador(dto.getJogador());

        personagem.setVida(new Stats());
        personagem.setPe(new Stats());
        personagem.setSanidade(new Stats());

        personagem.setDefesa(10);
        personagem.setEsquiva(0);
        personagem.setNex(1);
        personagem.setDeslocamento(9);
        Personagem salvo = personagemRepository.save(personagem);

        List<Pericia> todasPericias = periciaRepository.findAll();
        List<PericiaPersonagem> periciasDoPersonagem = new ArrayList<>();

        for (Pericia pericia : todasPericias) {
            PericiaPersonagem pp = new PericiaPersonagem();
            pp.setFicha(salvo); // Personagem é um Ficha, então isso é válido
            pp.setPericia(pericia);
            pp.setTreino(0);
            pp.setBonus(0);
            pp.setOutro(0);
            periciasDoPersonagem.add(pp);
        }

        periciaPersonagemRepository.saveAll(periciasDoPersonagem);
        
        return salvo;
    }

    //Busca um personagem especifico pelo ID
    public Personagem buscarPorId(Long id) {
        return personagemRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Personagem com id " + id + " não encontrado"));
    }
     
    //Lista os personagens de um usuario
    public List<Personagem> listarPorUsuario(Long idUsuario) {
    Usuario usuario = usuarioRepository.findById(idUsuario)
        .orElseThrow(() -> new RuntimeException("Usuário com id " + idUsuario + " não encontrado"));
        
    return usuario.getPersonagemList();
}
}
