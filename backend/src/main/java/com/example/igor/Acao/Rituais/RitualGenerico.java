package com.example.igor.Acao.Rituais;

import com.example.igor.Acao.AcoesChave;
import com.example.igor.Acao.Repositories.RitualRepository;
import com.example.igor.Combate.DTO.ContextoAcao;
import com.example.igor.Combate.DTO.PericiaDTO;
import com.example.igor.Combate.Service.PericiaService;
import com.example.igor.Combate.Util.UsarAcao;
import com.example.igor.ficha.FichaUtil.Elemento;
import com.example.igor.ficha.Repositories.FichaRepository;
import com.example.igor.ficha.entity.Ficha;
import com.example.igor.ficha.entity.acao.Ritual;
import com.example.igor.ficha.entity.personagem.Personagem;
import com.example.igor.global.Dado.RolagemDado;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Service;

/**
 * Classe base para execução de rituais.
 * Implementa o fluxo genérico de conjuração conforme as regras:
 * custo de PE, teste de Ocultismo, custo paranormal e aplicação de dano.
 *
 * Rituais específicos devem estender essa classe e sobrescrever getTipo()
 * com seu AcoesChave correspondente.
 */

@Service
public class RitualGenerico implements UsarAcao {
    private final RitualRepository ritualRepository;
    private final FichaRepository fichaRepository;
    private final PericiaService periciaService;

    public RitualGenerico(RitualRepository ritual, FichaRepository ficha, PericiaService pericia) {
        this.fichaRepository = ficha;
        this.ritualRepository = ritual;
        this.periciaService = pericia;
    }

    /**
     * Retorna null intencionalmente — rituais concretos devem sobrescrever
     * esse método com seu próprio AcoesChave para serem registrados no AcaoService.
     */
    @Override
    public AcoesChave getTipo() {
        return null;
    }

    @Override
    public ContextoAcao usarAcao(ContextoAcao contexto) {
        Ritual ritual = ritualRepository.findById(contexto.acaoid).orElseThrow();
        Personagem personagem = (Personagem) fichaRepository.findById(contexto.idUsuario).orElseThrow();
        Ficha alvo = fichaRepository.findById(contexto.idAlvo).orElseThrow();

        // Rola o teste de Ocultismo do personagem para verificar se consegue conjurar
        int dt = ocultismo(personagem);

        // Desconta o custo inicial de PE independente do resultado do ritual
        personagem.getPe().setAtual(personagem.getPe().getAtual() - ritual.getCusto().getInicial());

        // Se não atingiu a DT do ritual, conjuração falha — PE já foi gasto
        if (dt < ritual.getDt()) {
            contexto.menssagem = "Não passou na dt se fodeu kkkkkkkkk";
            fichaRepository.save(personagem);
            return contexto;
        }

        // Custo paranormal: rituais que não são de Medo exigem teste DT 20 + PE gasto.
        // Se falhar, perde sanidade igual ao custo em PE.
        // Se falhar por 5 ou mais, perde também 1 ponto de sanidade máxima permanentemente.
        if (dt < 20 + ritual.getCusto().getInicial() && ritual.getElemento() != Elemento.MEDO) {
            personagem.getSanidade().setAtual(personagem.getSanidade().getAtual() - ritual.getCusto().getInicial());

            if (Math.abs(dt - 20 - ritual.getCusto().getInicial()) >= 5) {
                personagem.getSanidade().setMax(personagem.getSanidade().getMax() - 1);
            }
        }

        // Rola o dano do ritual com os dados definidos na entidade
        contexto.rolagem = new RolagemDado(
                ritual.getInfoAtaque().getQuantidadedadoritual(),
                ritual.getInfoAtaque().getTamanhoDado(),
                ritual.getInfoAtaque().getFlatDano()
        );

        // Aplica o dano no alvo, garantindo que a vida não fique negativa
        if (alvo.getVida().getAtual() <= contexto.rolagem.getResultadoTotal()) {
            alvo.getVida().setAtual(0);
        } else {
            alvo.getVida().setAtual(alvo.getVida().getAtual() - contexto.rolagem.getResultadoTotal());
        }

        fichaRepository.save(personagem);
        fichaRepository.save(alvo);

        return contexto;
    }

    /**
     * Realiza o teste de Ocultismo do personagem (perícia de id 18).
     * Retorna a soma do maior dado rolado com o bônus da perícia.
     */
    public int ocultismo(Personagem personagem) {
        PericiaDTO dto = new PericiaDTO(18L, personagem.getId());
        periciaService.usarPericia(dto);
        return dto.rolagem.getMaiorDado().valor + dto.rolagem.getBonus();
    }

    public ContextoAcao verificaRitual(ContextoAcao contexto){
        Personagem p = (Personagem) fichaRepository.findById(contexto.idUsuario).orElseThrow();
        Ficha alvo = fichaRepository.findById(contexto.idAlvo).orElseThrow();
        Ritual ritual = ritualRepository.findById(contexto.acaoid).orElseThrow();

        if(p.getHabilidades().stream()
                .anyMatch(h -> h.getNome().equals("Absorver Agonia"))){
            if (alvo.getVida().getAtual()==0){
                p.getPe().setTemporario(p.getPe().getTemporario()+ritual.getCirculo());
            }
        }
        fichaRepository.save(p);
        return contexto;
    }
}