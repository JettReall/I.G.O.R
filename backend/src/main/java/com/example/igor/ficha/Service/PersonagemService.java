package com.example.igor.ficha.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.igor.ficha.DTO.AlterarPersonagemDTO;
import com.example.igor.ficha.DTO.PersonagemDTO;
import com.example.igor.ficha.FichaUtil.Stats;
import com.example.igor.ficha.Repositories.ClasseRepository;
import com.example.igor.ficha.Repositories.OrigemRepository;
import com.example.igor.ficha.Repositories.PericiaPersonagemRepository;
import com.example.igor.ficha.Repositories.PericiaRepository;
import com.example.igor.ficha.Repositories.PersonagemRepository;
import com.example.igor.ficha.Repositories.TrilhaRepository;
import com.example.igor.ficha.dto.ClasseDTO;
import com.example.igor.ficha.dto.OrigemDTO;
import com.example.igor.ficha.dto.TrilhaDTO;
import com.example.igor.ficha.entity.personagem.AtributoPersonagem;
import com.example.igor.ficha.entity.personagem.Classe;
import com.example.igor.ficha.entity.personagem.Origem;
import com.example.igor.ficha.entity.personagem.Pericia;
import com.example.igor.ficha.entity.personagem.PericiaPersonagem;
import com.example.igor.ficha.entity.personagem.Personagem;
import com.example.igor.ficha.entity.personagem.Trilha;
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

    @Autowired
    private ClasseRepository classeRepository;

    @Autowired
    private OrigemRepository origemRepository;

    @Autowired
    private TrilhaRepository trilhaRepository;

    //Inicializa um personagem no banco e cria tudo que precisa.
    public Personagem criarPersonagem(PersonagemDTO dto, Long Id) {
        
        Usuario usuario = usuarioRepository.findById(Id)
        .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        

        Personagem personagem = new Personagem();
        Classe classe = classeRepository.findById(dto.getClasseId()).orElseThrow();

        personagem.setNomePersonagem(dto.getNome());
        personagem.setNomeJogador(dto.getJogador());

        personagem.setAtributos(new AtributoPersonagem()); //inicializa sem dar erro
        personagem.getAtributos().setForca(dto.getAtributos().getForca());
        personagem.getAtributos().setAgilidade(dto.getAtributos().getAgilidade());
        personagem.getAtributos().setVigor(dto.getAtributos().getVigor());
        personagem.getAtributos().setIntelecto(dto.getAtributos().getIntelecto());
        personagem.getAtributos().setPresenca(dto.getAtributos().getPresenca());

        int modificadorVida = classe.getHp().getInicial() + personagem.getAtributos().getVigor();
        int modificadorPE = classe.getPe().getInicial() + personagem.getAtributos().getPresenca();
        int modificadorSanidade = classe.getSan().getInicial();

        personagem.setVida(new Stats(modificadorVida, modificadorVida, 0));
        personagem.setPe(new Stats(modificadorPE, modificadorPE, 0));
        personagem.setSanidade(new Stats(modificadorSanidade, modificadorSanidade, 0));

        personagem.setOrigem(origemRepository.findById(dto.getOrigemId()).orElseThrow());
        personagem.setClasse(classeRepository.findById(dto.getClasseId()).orElseThrow());
        personagem.setTrilha(trilhaRepository.findById(dto.getTrilhaId()).orElseThrow());
        
        personagem.setDefesa(10 + personagem.getAtributos().getAgilidade());
        personagem.setEsquiva(0);
        personagem.setNex(1);
        personagem.setDeslocamento(9);
        Personagem salvo = personagemRepository.save(personagem);

        List<Pericia> todasPericias = periciaRepository.findAll();
        List<PericiaPersonagem> periciasDoPersonagem = new ArrayList<>();

        for (Pericia pericia : todasPericias) {
            PericiaPersonagem pp = new PericiaPersonagem();
            pp.setFicha(salvo);
            pp.setPericia(pericia);
            pp.setTreino(0);
            pp.setBonus(0);
            pp.setOutro(0);
            periciasDoPersonagem.add(pp);
        }
        periciaPersonagemRepository.saveAll(periciasDoPersonagem);
        
        treinarPericias(salvo.getId(), dto.getPericiaLista());
        usuario.getPersonagemList().add(salvo);
        usuarioRepository.save(usuario);
        
        return salvo;
    }

    //Seleciona as pericias recebidas, seta o bonus base e aumenta o treino em 1
    public void treinarPericias(Long personagemId, List<Long> periciaIds) {

        Personagem personagem = buscarPorId(personagemId);

        Set<Long> idsTreinados = new HashSet<>(periciaIds);

        List<PericiaPersonagem> periciasDoPersonagem = periciaPersonagemRepository.findByFicha(personagem);

        for (PericiaPersonagem pp : periciasDoPersonagem) {
            if (idsTreinados.contains(pp.getPericia().getId())) {
                pp.setTreino(pp.getTreino() + 1);
                pp.setBonus(5);
            }
        }

    periciaPersonagemRepository.saveAll(periciasDoPersonagem);
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

    //Listar todas as origens
    public OrigemDTO listarOrigens() {
        List<Origem> origens = origemRepository.findAllComPericias();
        return new OrigemDTO(origens);
    }
    
    //Listar todas as classes
    public List<ClasseDTO> listarClasses(){
        List<Classe> classes = classeRepository.findAll();
        return classes.stream()
        .map(ClasseDTO::new)
        .toList();
    }

    //Listar todas as pericias
    public List<Pericia> listarPericias() {
        return periciaRepository.findAll();
    }

    //Listar as trilhas disponiveis da classe
    public List<TrilhaDTO> listarTrilhas(Long classeId) {
    List<Trilha> trilhas = trilhaRepository.findByClasseId(classeId);
    return trilhas.stream()
        .map(TrilhaDTO::new)
        .toList();
    }

    //Edita o personagem já criado (o id passado é o do personagem e não do usuario)
    public Personagem editarPersonagem(Long id, AlterarPersonagemDTO dto) {
        Personagem personagem = buscarPorId(id);

        personagem.setNomePersonagem(dto.getNome());
        personagem.setNomeJogador(dto.getJogador());

        personagem.getAtributos().setForca(dto.getAtributos().getForca());
        personagem.getAtributos().setAgilidade(dto.getAtributos().getAgilidade());
        personagem.getAtributos().setVigor(dto.getAtributos().getVigor());
        personagem.getAtributos().setIntelecto(dto.getAtributos().getIntelecto());
        personagem.getAtributos().setPresenca(dto.getAtributos().getPresenca());

        personagem.getVida().setAtual(dto.getVidaAtual());
        personagem.getPe().setAtual(dto.getPeAtual());
        personagem.getSanidade().setAtual(dto.getSanidadeAtual());

        personagem.setDefesa(10 + personagem.getAtributos().getAgilidade());

        if (dto.getPericiaLista() != null) {
            treinarPericias(personagem.getId(), dto.getPericiaLista());
        }

        personagem.setAnotacoes(dto.getAnotacoes());
        //não deu tempo implementar personagem.setInventario(dto.getInventario());
        personagem.setProeficiencia(dto.getProeficiencia());
        personagem.setEsquiva(dto.getEsquiva());
        personagem.setDeslocamento(dto.getDeslocamento());
        
        return personagemRepository.save(personagem);
}

    //Deleta o personagem do banco
    public void deletarPersonagem(Long personagemId, Long usuarioId) {
        Personagem personagem = buscarPorId(personagemId);

        Usuario usuario = usuarioRepository.findById(usuarioId)
            .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        usuario.getPersonagemList().remove(personagem);
        usuarioRepository.save(usuario);

        personagemRepository.deleteById(personagemId);
    }
}
