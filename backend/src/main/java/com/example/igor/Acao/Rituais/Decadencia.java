package com.example.igor.Acao.Rituais;

import com.example.igor.Acao.AcoesChave;
import com.example.igor.Acao.Repositories.RitualRepository;
import com.example.igor.Combate.DTO.ContextoAcao;
import com.example.igor.Combate.Service.PericiaService;
import com.example.igor.Combate.Util.UsarAcao;
import com.example.igor.ficha.Repositories.FichaRepository;
import org.springframework.stereotype.Service;

@Service
public class Decadencia extends RitualGenerico {

    public Decadencia(RitualRepository ritual, FichaRepository ficha, PericiaService pericia) {
        super(ritual, ficha, pericia);
    }

    @Override
    public AcoesChave getTipo() {
        return AcoesChave.DECADENCIA;
    }

    @Override
    public ContextoAcao usarAcao(ContextoAcao contexto) {
        contexto = super.usarAcao(contexto);
        return super.verificaRitual(contexto);
    }
}
