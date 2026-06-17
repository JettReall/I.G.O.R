package com.example.igor.Combate.Service;

import com.example.igor.Acao.AcaoService;
import com.example.igor.Combate.Combate;
import com.example.igor.Combate.DTO.CombateFichaDTO;
import com.example.igor.Combate.DTO.ContextoAcao;
import com.example.igor.Combate.DTO.PericiaDTO;
import com.example.igor.Combate.Repositories.CombateRepository;
import com.example.igor.ficha.Repositories.FichaRepository;
import com.example.igor.ficha.entity.Ficha;
import com.example.igor.ficha.entity.Monstro;
import com.example.igor.ficha.entity.personagem.Personagem;
import com.example.igor.global.Dado.RolagemDado;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Service
public class CombateService{

    @Autowired
    private CombateRepository repository;
    @Autowired
    private FichaRepository fichaRepository;
    @Autowired
    private PericiaService periciaService;
    @Autowired
    private AcaoService acaoService;


    private int iniciativa(Ficha ficha){
        PericiaDTO dto = new PericiaDTO(12L, ficha.getId());
        RolagemDado rolagem = periciaService.usarPericia(dto).rolagem;
        int response = rolagem.getBonus()+rolagem.getMaiorDado().valor;
        ficha.setIniciativa(response);
        return response;
    }


    public List<Ficha> shuffle(List<Long> fichasIds) {

        Map<Long, Integer> ordem = new HashMap<>();

        // calcula iniciativa uma única vez por ID
        for (Long id : fichasIds) {
            Ficha ficha = fichaRepository.findById(id).orElseThrow();
            ordem.put(id, iniciativa(ficha));
        }

        // ordena pelos valores (iniciativa)
        return ordem.entrySet()
                .stream()
                .sorted(Map.Entry.<Long, Integer>comparingByValue().reversed())
                .map(entry -> fichaRepository.findById(entry.getKey()).orElseThrow())
                .toList();
    }


    //add ficha em alguma posicao especifica;
    public Combate addFichaPosicao(CombateFichaDTO dto) {
        Combate combate = repository.findById(dto.combateId)
                .orElseThrow(() -> new RuntimeException("Combate não encontrado"));

        Ficha fichaDTO = fichaRepository.findById(dto.fichaDTO.getId())
                .orElseThrow(() -> new RuntimeException("Ficha não encontrada"));

        if (dto.posicao < 0 || dto.posicao > combate.getOrdemTurno().size()) {
            throw new RuntimeException("Posição inválida");
        }

        if (fichaDTO instanceof Personagem personagem) {
            combate.getPersonagens().add(personagem);
        } else if (fichaDTO instanceof Monstro monstro) {
            combate.getMonstros().add(monstro);
        }

        combate.getOrdemTurno().add(dto.posicao, fichaDTO);

        return repository.save(combate);
    }


    public Combate addFichaRandom(CombateFichaDTO dto){
        Combate combate = repository.findById(dto.combateId).orElseThrow();
        combate.getOrdemTurno().add(fichaRepository.findById(dto.fichaDTO.getId()).orElseThrow());
        List<Long> listId = combate.getOrdemTurno()
                .stream()
                .map(Ficha::getId)
                .toList();
        combate.setOrdemTurno(shuffle(listId));
        return repository.save(combate);
    }


    public ContextoAcao acao(ContextoAcao contextoAcao){
        if(contextoAcao.periciaDTO!=null){
            contextoAcao.periciaDTO = periciaService.usarPericia(contextoAcao.periciaDTO);
            return contextoAcao;
        }
        if(contextoAcao.acaoid != null){
            contextoAcao = acaoService.usar(contextoAcao);
        }

        return contextoAcao;
    }

}