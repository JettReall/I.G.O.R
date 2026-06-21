package com.example.igor.ficha.LevelUp;

import java.util.List;

import com.example.igor.ficha.Repositories.TrilhaRepository;
import com.example.igor.ficha.entity.personagem.PericiaPersonagem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.igor.ficha.FichaUtil.AtributoEnum;
import com.example.igor.ficha.Repositories.HabilidadeRepository;
import com.example.igor.ficha.Repositories.PersonagemRepository;
import com.example.igor.ficha.LevelUp.DTO.NexUpDTO;
import com.example.igor.ficha.entity.PreRequisito.PreRequisito;
import com.example.igor.ficha.entity.PreRequisito.PreRequisitoAtributo;
import com.example.igor.ficha.entity.PreRequisito.PreRequisitoClasse;
import com.example.igor.ficha.entity.PreRequisito.PreRequisitoHabilidade;
import com.example.igor.ficha.entity.PreRequisito.PreRequisitoNex;
import com.example.igor.ficha.entity.acao.Habilidade;
import com.example.igor.ficha.entity.personagem.Classe;
import com.example.igor.ficha.entity.personagem.Personagem;

@Service
public class PersonagemNexService {

    @Autowired
    private PersonagemRepository personagemRepository;

    @Autowired
    private HabilidadeRepository habilidadeRepository;
    @Autowired
    private TrilhaRepository trilhaRepository;

    // Sobe o nex em 1, aplica os ganhos automáticos de stats (vida, pe, sanidade)
    // e devolve quais decisões esse novo nex libera para o front pedir em seguida.
    public NexUpDTO subirNex(Long personagemId) {
        Personagem p = buscarPersonagem(personagemId);
        Classe classe = p.getClasse();

        p.setNex(p.getNex() + 1);
        int nex = p.getNex();

        p.getVida().setMax(p.getVida().getMax() + classe.getHp().getAdicional() + p.getAtributos().getVigor());
        p.getPe().setMax(p.getPe().getMax() + classe.getPe().getAdicional() + p.getAtributos().getPresenca());
        p.getSanidade().setMax(p.getSanidade().getMax() + classe.getSan().getAdicional());

        p.getPe().setAtual(p.getPe().getMax());
        p.getVida().setAtual(p.getVida().getMax());
        p.getSanidade().setAtual(p.getSanidade().getMax());
        personagemRepository.save(p);

        NexUpDTO dto = new NexUpDTO();
        dto.setNexNovo(nex);
        dto.setGanhaHabilidadeTrilha(nex == 2 || nex == 8 || nex == 13 || nex == 20);
        dto.setGanhaPoderClasse(nex != 0 && nex % 3 == 0);
        dto.setGanhaAtributo(nex == 4 || nex == 10 || nex == 16 || nex == 19);
        dto.setGanhaTreinoPericia(nex == 7 || nex == 14);
        dto.setEhNexEspecial50(nex == 10);

        return dto;
    }

    // Lista os poderes de classe que o personagem ainda não tem e já atende pré-requisitos.
    // Exclui habilidades que pertencem a uma trilha (essas vêm pelo endpoint de trilha).
    public List<Habilidade> listarPoderesDisponiveis(Long personagemId) {
        Personagem p = buscarPersonagem(personagemId);
        List<Habilidade> todas = habilidadeRepository.findByClasse(p.getClasse().getNome());

        return todas.stream()
                .filter(h -> !pertenceAAlgumaTrilha(h))
                .filter(h -> !p.getHabilidades().contains(h))
                .filter(h -> atendePreRequisitos(h, p))
                .toList();
    }

    private boolean pertenceAAlgumaTrilha(Habilidade h) {
        return trilhaRepository.existsByHabilidadesContaining(h);
    }

    // Lista as habilidades da trilha escolhida que o personagem ainda não tem e já atende pré-requisitos.
    public List<Habilidade> listarHabilidadesTrilhaDisponiveis(Long personagemId) {
        Personagem p = buscarPersonagem(personagemId);

        if (p.getTrilha() == null) {
            throw new RuntimeException("Personagem ainda não escolheu uma trilha");
        }

        return p.getTrilha().getHabilidades().stream()
                .filter(h -> !p.getHabilidades().contains(h))
                .filter(h -> atendePreRequisitos(h, p))
                .toList();
    }

    // Adiciona a habilidade escolhida (poder de classe ou de trilha, mesmo fluxo) ao personagem.
    public Personagem adicionarHabilidade(Long personagemId, Long habilidadeId) {
        Personagem p = buscarPersonagem(personagemId);
        Habilidade h = habilidadeRepository.findById(habilidadeId)
                .orElseThrow(() -> new RuntimeException("Habilidade não encontrada"));

        if (!atendePreRequisitos(h, p)) {
            throw new RuntimeException("Personagem não atende aos pré-requisitos dessa habilidade");
        }

        p.getHabilidades().add(h);
        return personagemRepository.save(p);
    }

    // Aumenta um atributo em +1, respeitando o limite de 5.
    public Personagem aumentarAtributo(Long personagemId, AtributoEnum atributo) {
        Personagem p = buscarPersonagem(personagemId);
        int valorAtual = p.getValorAtributo(atributo);

        if (valorAtual >= 5) {
            throw new RuntimeException("Atributo já está no máximo (5)");
        }

        switch (atributo) {
            case FORCA -> p.getAtributos().setForca(valorAtual + 1);
            case AGILIDADE -> p.getAtributos().setAgilidade(valorAtual + 1);
            case INTELECTO -> p.getAtributos().setIntelecto(valorAtual + 1);
            case VIGOR -> p.getAtributos().setVigor(valorAtual + 1);
            case PRESENCA -> p.getAtributos().setPresenca(valorAtual + 1);
        }

        return personagemRepository.save(p);
    }

    private Personagem buscarPersonagem(Long id) {
        return personagemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Personagem não encontrado"));
    }

    // Percorre os pré-requisitos polimórficos da habilidade e valida cada tipo contra o personagem.
    private boolean atendePreRequisitos(Habilidade h, Personagem p) {
        for (PreRequisito pr : h.getPreRequisitos()) {
            if (pr instanceof PreRequisitoNex prn && p.getNex() < prn.getNexMinimo()) {
                return false;
            }
            if (pr instanceof PreRequisitoAtributo pra) {
                int valor = p.getValorAtributo(pra.getAtributo());
                if (valor < pra.getValorMinimo()) return false;
            }
            if (pr instanceof PreRequisitoHabilidade prh && !p.getHabilidades().contains(prh.getHabilidadeNecessaria())) {
                return false;
            }
            if (pr instanceof PreRequisitoClasse prc && !p.getClasse().getId().equals(prc.getClasseNecessaria().getId())) {
                return false;
            }
        }
        return true;
    }

    // Aumenta o treino de uma perícia específica do personagem em +1.
    public Personagem treinarPericia(Long personagemId, Long periciaId) {
        Personagem p = buscarPersonagem(personagemId);

        PericiaPersonagem pp = p.getPericias().stream()
                .filter(per -> per.getPericia().getId().equals(periciaId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Perícia não encontrada para esse personagem"));

        if (pp.getTreino() >= 3) {
            throw new RuntimeException("Perícia já está no grau máximo de treinamento");
        }

        pp.setTreino(pp.getTreino() + 1);
        pp.setBonus(pp.getBonus()+5);
        return personagemRepository.save(p);
    }
}
