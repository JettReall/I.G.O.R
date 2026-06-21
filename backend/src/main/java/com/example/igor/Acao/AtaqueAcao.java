package com.example.igor.Acao;

import com.example.igor.Acao.Repositories.AtaqueRepository;
import com.example.igor.Combate.DTO.ContextoAcao;
import com.example.igor.Combate.Util.UsarAcao;
import com.example.igor.ficha.Repositories.FichaRepository;
import com.example.igor.ficha.entity.Ficha;
import com.example.igor.ficha.entity.acao.Ataque;
import com.example.igor.ficha.entity.personagem.Personagem;
import com.example.igor.global.Dado.RolagemDado;
import org.springframework.stereotype.Service;

/**
 * Serviço responsável por gerenciar a lógica de execução de uma ação de Ataque.
 */
@Service
public class AtaqueAcao implements UsarAcao {
    private final AtaqueRepository ataqueRepository;
    private final FichaRepository fichaRepository;

    // Injeção de dependência via construtor para os repositórios
    public AtaqueAcao(AtaqueRepository ataqueRepository, FichaRepository fichaRepository) {
        this.ataqueRepository = ataqueRepository;
        this.fichaRepository = fichaRepository;
    }

    /**
     * Retorna a chave identificadora deste tipo de ação.
     */
    @Override
    public AcoesChave getTipo() {
        return AcoesChave.ATAQUEACAO;
    }

    /**
     * Executa a mecânica de ataque utilizando o contexto fornecido.
     */
    @Override
    public ContextoAcao usarAcao(ContextoAcao contexto) {
        // Busca as entidades necessárias no banco de dados; lança exceção caso não encontre
        Ataque ataque = ataqueRepository.findById(contexto.acaoid).orElseThrow();
        Ficha personagem = fichaRepository.findById(contexto.idUsuario).orElseThrow();
        Ficha alvo = fichaRepository.findById(contexto.idAlvo).orElseThrow();

        // Logs de depuração para acompanhar o estado do alvo
        System.out.println("ALVO VIDA: " + alvo.getVida());
        System.out.println("ALVO CLASSE: " + alvo.getClass().getName());

        // Se o usuário da ação for um jogador (Personagem), consome o custo de Pontos de Esforço (PE)
        if(personagem instanceof Personagem){
            Personagem personagem1 = (Personagem) personagem;
            System.out.println("PE ANTES: " + personagem1.getPe().getAtual());

            // Deduz o custo inicial do ataque e salva a alteração
            personagem1 = AcaoService.atualizaPE(personagem1, ataque.getCusto().getInicial());
            fichaRepository.save(personagem1);
        }

        // Obtém o bônus/quantidade de dados com base no atributo associado ao ataque
        int quantidade = personagem.getValorAtributo(ataque.getAtributo());

        // Instancia a rolagem de dados com os parâmetros do ataque
        contexto.rolagem = new RolagemDado(quantidade, ataque.getTamanhoDado(), ataque.getFlatDano());

        // Verifica se houve acerto crítico com base na margem de crítico do ataque
        if(contexto.rolagem.getMaiorDado().valor >= ataque.getCriticoRange()){
            // Multiplica o dano total pelo multiplicador de crítico do ataque
            contexto.rolagem.setResultadoTotal(contexto.rolagem.getResultadoTotal() * ataque.getCriticoMult());
        }

        // Aplica o dano calculado à vida atual do alvo, garantindo que não fique negativa
        if(alvo.getVida().getAtual() <= contexto.rolagem.getResultadoTotal()){
            alvo.getVida().setAtual(0);
        } else {
            alvo.getVida().setAtual(alvo.getVida().getAtual() - contexto.rolagem.getResultadoTotal());
        }

        // Salva o novo estado de vida do alvo no banco de dados
        fichaRepository.save(alvo);

        return contexto;
    }
}