package com.example.igor.Acao;

import com.example.igor.Combate.DTO.ContextoAcao;
import com.example.igor.Combate.Exception.PersonagemPEInsuficienteException;
import com.example.igor.Combate.Repositories.AcaoRepository;
import com.example.igor.Combate.Util.UsarAcao;
import com.example.igor.ficha.entity.acao.Acao;
import com.example.igor.ficha.entity.personagem.Personagem;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class AcaoService {
    private final Map<AcoesChave, UsarAcao> acoes;
    private final AcaoRepository acaoRepository;

    public AcaoService(List<UsarAcao> listaAcao, AcaoRepository acaoRepository){
        this.acaoRepository = acaoRepository;
        this.acoes = listaAcao.stream()
                .filter(a -> a.getTipo() != null)
                .collect(Collectors.toMap(UsarAcao::getTipo, Function.identity()));
        System.out.println("ACOES REGISTRADAS: " + acoes.keySet());
    }

    public ContextoAcao usar(ContextoAcao contexto){
        Acao acao = acaoRepository.findById(contexto.acaoid).orElseThrow();
        System.out.println("TIPO DA ACAO: " + acao.getTipo());
        UsarAcao utilizacao = acoes.get(acao.getTipo());
        if(utilizacao == null){
            throw new RuntimeException("nenhuma acao encontrada");
        }
        return utilizacao.usarAcao(contexto);
    }


    public static Personagem atualizaPE(Personagem p,int custo){
        if(p.getPe().getTemporario()>0){
            if(p.getPe().getTemporario()>=custo){
                p.getPe().setTemporario(p.getPe().getTemporario()-custo);
            }else{
                custo -= p.getPe().getTemporario();
                p.getPe().setTemporario(0);
                p.getPe().setAtual(p.getPe().getAtual()-custo);
            }
        }
        if(p.getPe().getAtual()>custo){
            p.getPe().setAtual(p.getPe().getAtual()-custo);
        }else{
            throw new PersonagemPEInsuficienteException("O personagem atual n possui PE suficiente para realizar essa acao");
        }
        return p;
    }
}
