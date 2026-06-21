package com.example.igor.Acao.Rituais;

import com.example.igor.Acao.AcoesChave;
import com.example.igor.Acao.Repositories.RitualRepository;
import com.example.igor.Combate.DTO.ContextoAcao;
import com.example.igor.Combate.DTO.PericiaDTO;
import com.example.igor.Combate.Repositories.CombateRepository;
import com.example.igor.Combate.Service.PericiaService;
import com.example.igor.Combate.Util.UsarAcao;
import com.example.igor.ficha.FichaUtil.Elemento;
import com.example.igor.ficha.Repositories.FichaRepository;
import com.example.igor.ficha.entity.Ficha;
import com.example.igor.ficha.entity.acao.Ritual;
import com.example.igor.ficha.entity.personagem.Personagem;
import com.example.igor.global.Dado.RolagemDado;
import org.springframework.stereotype.Service;

/**
 * Classe base para execução de rituais.
 *
 * To.do ritual do sistema compartilha esse fluxo:
 * - realizar o teste de Ocultismo;
 * - gastar PE;
 * - verificar se passou na DT;
 * - aplicar custo paranormal (quando existir);
 * - rolar e aplicar dano;
 * - salvar as alterações.
 *
 * Rituais específicos devem herdar dessa classe e implementar apenas
 * suas regras particulares.
 */
@Service
public class RitualGenerico implements UsarAcao {

    protected final RitualRepository ritualRepository;
    protected final FichaRepository fichaRepository;
    protected final PericiaService periciaService;
    protected final CombateRepository combateRepository;

    public RitualGenerico(RitualRepository ritual,
                          FichaRepository ficha,
                          PericiaService pericia,
                          CombateRepository combate) {
        this.fichaRepository = ficha;
        this.ritualRepository = ritual;
        this.periciaService = pericia;
        this.combateRepository = combate;
    }

    /**
     * Deve ser sobrescrito pelos rituais concretos para informar
     * qual AcoesChave representa esse ritual.
     */
    @Override
    public AcoesChave getTipo() {
        return null;
    }

    /**
     * Fluxo principal de execução de um ritual.
     *
     * A ordem é:
     * 1 - Buscar as entidades envolvidas.
     * 2 - Fazer o teste de Ocultismo.
     * 3 - Gastar PE.
     * 4 - Verificar se passou na DT.
     * 5 - Aplicar custo paranormal.
     * 6 - Rolar dano.
     * 7 - Aplicar dano ao alvo.
     * 8 - Salvar todas as alterações.
     */
    @Override
    public ContextoAcao usarAcao(ContextoAcao contexto) {

        // Recupera todas as entidades necessárias para a execução do ritual
        Ritual ritual = ritualRepository.findById(contexto.acaoid).orElseThrow();
        Personagem personagem = (Personagem) fichaRepository.findById(contexto.idUsuario).orElseThrow();
        Ficha alvo = fichaRepository.findById(contexto.idAlvo).orElseThrow();

        // Realiza o teste de Ocultismo
        int dt = ocultismo(personagem);

        // Gasta os Pontos de Esforço necessários para conjurar o ritual
        gastarPE(personagem, ritual);

        // Caso não passe na DT do ritual, ele falha.
        // O custo em PE continua sendo consumido.
        if (!passouNaDT(dt, ritual)) {
            contexto.menssagem = "Não passou na DT.";
            fichaRepository.save(personagem);
            return contexto;
        }

        // Aplica o custo paranormal caso seja necessário
        aplicarCustoParanormal(personagem, ritual, dt);

        // Rola o dano do ritual
        contexto.rolagem = rolarDano(ritual);

        // Aplica o dano no alvo
        aplicarDano(alvo, contexto.rolagem.getResultadoTotal());

        // Persiste todas as alterações realizadas
        salvar(personagem, alvo);

        return contexto;
    }

    /**
     * Consome os Pontos de Esforço necessários para utilizar o ritual.
     *
     * A prioridade é gastar PE temporário.
     * Apenas quando ele acaba são consumidos os PE normais.
     */
    private void gastarPE(Personagem personagem, Ritual ritual) {

        // Não possui PE temporário
        if(personagem.getPe().getTemporario() <= 0) {

            personagem.getPe().setAtual(
                    personagem.getPe().getAtual() - ritual.getCusto().getInicial()
            );

        } else {

            // O PE temporário é suficiente para pagar to.do o custo
            if(personagem.getPe().getTemporario() > ritual.getCusto().getInicial()) {

                personagem.getPe().setTemporario(
                        personagem.getPe().getTemporario() - ritual.getCusto().getInicial()
                );

            } else {

                // O PE temporário acaba e o restante é descontado do PE atual
                int qnt = ritual.getCusto().getInicial() - personagem.getPe().getTemporario();

                personagem.getPe().setTemporario(0);

                personagem.getPe().setAtual(
                        personagem.getPe().getAtual() - qnt
                );
            }
        }
    }

    /**
     * Verifica se o resultado do teste de Ocultismo
     * atingiu a DT necessária para conjurar o ritual.
     */
    private boolean passouNaDT(int dt, Ritual ritual) {
        return dt >= ritual.getDt();
    }

    /**
     * Aplica o custo paranormal da conjuração.
     *
     * Rituais de Medo não possuem esse custo.
     *
     * Caso o personagem falhe no teste contra
     * DT = 20 + custo em PE:
     *
     * - perde sanidade atual igual ao custo em PE;
     * - se falhar por 5 ou mais, perde também
     *   1 ponto de sanidade máxima.
     */
    private void aplicarCustoParanormal(Personagem personagem, Ritual ritual, int dt) {

        if (ritual.getElemento() == Elemento.MEDO) {
            return;
        }

        int dtSanidade = 20 + ritual.getCusto().getInicial();

        if (dt < dtSanidade) {

            personagem.getSanidade().setAtual(
                    personagem.getSanidade().getAtual() - ritual.getCusto().getInicial()
            );

            if (dtSanidade - dt >= 5) {
                personagem.getSanidade().setMax(
                        personagem.getSanidade().getMax() - 1
                );
            }
        }
    }

    /**
     * Realiza a rolagem de dano utilizando
     * as informações configuradas no ritual.
     */
    private RolagemDado rolarDano(Ritual ritual) {

        return new RolagemDado(
                ritual.getInfoAtaque().getQuantidadedadoritual(),
                ritual.getInfoAtaque().getTamanhoDado(),
                ritual.getInfoAtaque().getFlatDano()
        );
    }

    /**
     * Aplica o dano causado pelo ritual.
     *
     * A vida nunca pode ficar negativa.
     */
    private void aplicarDano(Ficha alvo, int dano) {

        int vidaAtual = alvo.getVida().getAtual();

        alvo.getVida().setAtual(
                Math.max(0, vidaAtual - dano)
        );
    }

    /**
     * Salva todas as alterações realizadas durante
     * a execução do ritual.
     */
    private void salvar(Personagem personagem, Ficha alvo) {
        fichaRepository.save(personagem);
        fichaRepository.save(alvo);
    }

    /**
     * Realiza o teste de Ocultismo (Perícia 18).
     *
     * Retorna o resultado final da rolagem
     * (maior dado + bônus).
     */
    public int ocultismo(Personagem personagem) {

        PericiaDTO dto = new PericiaDTO(18L, personagem.getId());

        periciaService.usarPericia(dto);

        return dto.rolagem.getMaiorDado().valor + dto.rolagem.getBonus();
    }

    /**
     * Verifica efeitos especiais que acontecem
     * após a conjuração do ritual.
     *
     * Atualmente implementa a habilidade
     * "Absorver Agonia":
     *
     * Se o alvo morrer em consequência do ritual,
     * o personagem recebe PE temporário igual ao
     * círculo do ritual.
     */
    public ContextoAcao verificaRitual(ContextoAcao contexto){

        Personagem p = (Personagem) fichaRepository.findById(contexto.idUsuario).orElseThrow();
        Ficha alvo = fichaRepository.findById(contexto.idAlvo).orElseThrow();
        Ritual ritual = ritualRepository.findById(contexto.acaoid).orElseThrow();

        if(p.getHabilidades().stream()
                .anyMatch(h -> h.getNome().equals("Absorver Agonia"))){

            if (alvo.getVida().getAtual() == 0){

                p.getPe().setTemporario(
                        p.getPe().getTemporario() + ritual.getCirculo()
                );
            }
        }

        fichaRepository.save(p);

        return contexto;
    }
}