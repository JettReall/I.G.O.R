package com.example.igor.Acao;

import com.example.igor.Combate.DTO.ContextoAcao;
import com.example.igor.Combate.Repositories.AcaoRepository;
import com.example.igor.Combate.Util.UsarAcao;
import com.example.igor.ficha.entity.acao.Acao;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class AcaoService {
    private final Map<AcoesChave, UsarAcao> acoes;
    private final AcaoRepository acaoRepository;

    public AcaoService(List<UsarAcao> listaAcao,AcaoRepository acaoRepository){
        this.acaoRepository = acaoRepository;
        this.acoes = listaAcao.stream()
                .collect(Collectors.toMap(UsarAcao::getTipo, Function.identity()));
    }

    public ContextoAcao usar(ContextoAcao contexto){
        Acao acao = acaoRepository.findById(contexto.acaoid).orElseThrow();
        UsarAcao utilizacao = acoes.get(acao.getTipo());
        if(utilizacao == null){
            throw new RuntimeException("nenhuma acao encontrada");
        }
        return utilizacao.usarAcao(contexto);
    }
}
