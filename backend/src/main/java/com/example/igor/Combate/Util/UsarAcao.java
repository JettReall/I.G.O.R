package com.example.igor.Combate.Util;

import com.example.igor.Acao.AcoesChave;
import com.example.igor.Combate.DTO.ContextoAcao;

public interface UsarAcao {
    AcoesChave getTipo();
    public ContextoAcao usarAcao(ContextoAcao contexto);
}
