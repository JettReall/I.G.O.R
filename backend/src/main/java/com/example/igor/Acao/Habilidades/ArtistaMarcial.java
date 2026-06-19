package com.example.igor.Acao.Habilidades;

import com.example.igor.Acao.AcoesChave;
import com.example.igor.Combate.DTO.ContextoAcao;
import com.example.igor.Combate.Util.UsarAcao;
import com.example.igor.ficha.Repositories.FichaRepository;
import com.example.igor.ficha.entity.Ficha;
import com.example.igor.ficha.entity.acao.Habilidade;
import com.example.igor.ficha.entity.personagem.Personagem;
import com.example.igor.ficha.repository.HabilidadeRepository;
import com.example.igor.global.Dado.RolagemDado;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class ArtistaMarcial implements UsarAcao {
    private HabilidadeRepository habilidadeRepository;
    private FichaRepository fichaRepository;

    @Override
    public AcoesChave getTipo() {
        return AcoesChave.ARTISTAMARCIAL;
    }

    @Override
    public ContextoAcao usarAcao(ContextoAcao contexto) {
        Habilidade habilidade = habilidadeRepository.findById(contexto.acaoid).orElseThrow();
        Personagem personagem = (Personagem) fichaRepository.findById(contexto.idUsuario).orElseThrow();
        Ficha alvo = fichaRepository.findById(contexto.idAlvo).orElseThrow();

        if(personagem.getNex()<7){
            contexto.rolagem = new RolagemDado(1,6,0);
        } else if (personagem.getNex()<14) {
            contexto.rolagem = new RolagemDado(1,8,0);
        }else{
            contexto.rolagem = new RolagemDado(1,10,0);
        }

        if(alvo.getVida().getAtual()<=contexto.rolagem.getResultadoTotal()){
            alvo.getVida().setAtual(0);
        }else {
            alvo.getVida().setAtual(alvo.getVida().getAtual() - contexto.rolagem.getResultadoTotal());
        }

        fichaRepository.save(personagem);
        fichaRepository.save((alvo));
        return contexto;
    }
}
