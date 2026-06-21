package com.example.igor.Acao.Habilidades;

import com.example.igor.Acao.AcoesChave;
import com.example.igor.Combate.DTO.ContextoAcao;
import com.example.igor.Combate.Util.UsarAcao;
import com.example.igor.ficha.Repositories.FichaRepository;
import com.example.igor.ficha.entity.Ficha;
import com.example.igor.ficha.entity.personagem.Personagem;
import com.example.igor.ficha.Repositories.HabilidadeRepository;
import com.example.igor.global.Dado.RolagemDado;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

/**
 * Implementação da habilidade Artista Marcial.
 *
 * O dano da habilidade varia conforme o NEX do personagem:
 * - NEX < 7  : 1d6
 * - NEX < 14 : 1d8
 * - NEX >=14 : 1d10
 */
@AllArgsConstructor
@Service
public class ArtistaMarcial implements UsarAcao {

    private HabilidadeRepository habilidadeRepository;
    private FichaRepository fichaRepository;

    /**
     * Retorna a chave utilizada pelo AcaoService
     * para localizar esta implementação.
     */
    @Override
    public AcoesChave getTipo() {
        return AcoesChave.ARTISTAMARCIAL;
    }

    /**
     * Executa a habilidade Artista Marcial.
     *
     * O fluxo consiste em:
     * - recuperar usuário e alvo;
     * - determinar o dano de acordo com o NEX;
     * - aplicar o dano no alvo;
     * - salvar as alterações.
     */
    @Override
    public ContextoAcao usarAcao(ContextoAcao contexto) {

        // Recupera o personagem que está utilizando a habilidade
        Personagem personagem = (Personagem) fichaRepository.findById(contexto.idUsuario).orElseThrow();

        // Recupera a ficha do alvo
        Ficha alvo = fichaRepository.findById(contexto.idAlvo).orElseThrow();

        // Define a rolagem de dano de acordo com o NEX do personagem
        if(personagem.getNex() < 7){

            contexto.rolagem = new RolagemDado(1,6,0);

        } else if (personagem.getNex() < 14) {

            contexto.rolagem = new RolagemDado(1,8,0);

        } else {

            contexto.rolagem = new RolagemDado(1,10,0);
        }

        // Aplica o dano, impedindo que a vida fique negativa
        if(alvo.getVida().getAtual() <= contexto.rolagem.getResultadoTotal()){

            alvo.getVida().setAtual(0);

        } else {

            alvo.getVida().setAtual(
                    alvo.getVida().getAtual() - contexto.rolagem.getResultadoTotal()
            );
        }

        // Persiste as alterações realizadas
        fichaRepository.save(personagem);
        fichaRepository.save(alvo);

        return contexto;
    }
}