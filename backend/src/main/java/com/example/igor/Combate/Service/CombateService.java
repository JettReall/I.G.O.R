package com.example.igor.Combate.Service;

import com.example.igor.Acao.AcaoService;
import com.example.igor.Combate.Combate;
import com.example.igor.Combate.DTO.CombateFichaDTO;
import com.example.igor.Combate.DTO.ContextoAcao;
import com.example.igor.Combate.DTO.PericiaDTO;
import com.example.igor.Combate.Repositories.CombateRepository;
import com.example.igor.ficha.Repositories.FichaRepository;
import com.example.igor.ficha.entity.Efeito;
import com.example.igor.ficha.entity.Ficha;
import com.example.igor.ficha.entity.Monstro;
import com.example.igor.ficha.entity.personagem.Personagem;
import com.example.igor.global.Dado.RolagemDado;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Serviço responsável por gerenciar a lógica de turnos, iniciativas, ações
 * e estados dos personagens/monstros dentro de um combate.
 */
@Service
public class CombateService {

    @Autowired
    private CombateRepository repository;
    @Autowired
    private FichaRepository fichaRepository;
    @Autowired
    private PericiaService periciaService;
    @Autowired
    private AcaoService acaoService;

    /**
     * Calcula e define o valor de iniciativa de uma ficha específica usando a perícia correspondente (ID 12L).
     * O cálculo soma o bônus da perícia ao maior dado rolado.
     */
    private int iniciativa(Ficha ficha) {
        PericiaDTO dto = new PericiaDTO(12L, ficha.getId());
        RolagemDado rolagem = periciaService.usarPericia(dto).rolagem;
        int response = rolagem.getBonus() + rolagem.getMaiorDado().valor;
        ficha.setIniciativa(response);
        return response;
    }

    /**
     * Ordena uma lista de IDs de fichas de forma decrescente com base no valor de suas iniciativas.
     */
    public List<Ficha> shuffle(List<Long> fichasIds) {
        Map<Long, Integer> ordem = new HashMap<>();

        // Calcula a iniciativa uma única vez para cada ID e armazena no mapa
        for (Long id : fichasIds) {
            Ficha ficha = fichaRepository.findById(id).orElseThrow();
            ordem.put(id, iniciativa(ficha));
        }

        // Ordena o mapa pelos valores (iniciativa) em ordem reversa (maior para menor) e mapeia de volta para Ficha
        return ordem.entrySet()
                .stream()
                .sorted(Map.Entry.<Long, Integer>comparingByValue().reversed())
                .map(entry -> fichaRepository.findById(entry.getKey()).orElseThrow())
                .toList();
    }

    /**
     * Adiciona uma ficha em uma posição específica da ordem de turnos do combate.
     * Também categoriza a ficha como Personagem ou Monstro dentro do combate.
     */
    public Combate addFichaPosicao(CombateFichaDTO dto) {
        Combate combate = repository.findById(dto.combateId)
                .orElseThrow(() -> new RuntimeException("Combate não encontrado"));

        Ficha fichaDTO = fichaRepository.findById(dto.fichaid)
                .orElseThrow(() -> new RuntimeException("Ficha não encontrada"));

        // Valida se a posição informada é permitida dentro da lista atual
        if (dto.posicao < 0 || dto.posicao > combate.getOrdemTurno().size()) {
            throw new RuntimeException("Posição inválida");
        }

        // Adiciona a ficha na sublista correspondente à sua instância
        if (fichaDTO instanceof Personagem personagem) {
            combate.getPersonagens().add(personagem);
        } else if (fichaDTO instanceof Monstro monstro) {
            combate.getMonstros().add(monstro);
        }

        // Insere a ficha exatamente no índice desejado da ordem de turnos
        combate.getOrdemTurno().add(dto.posicao, fichaDTO);

        return repository.save(combate);
    }

    /**
     * Adiciona uma nova ficha ao combate e reordena toda a lista de turnos (shuffle) recalculando as iniciativas.
     */
    public Combate addFichaRandom(CombateFichaDTO dto) {
        Combate combate = repository.findById(dto.combateId).orElseThrow();
        combate.getOrdemTurno().add(fichaRepository.findById(dto.fichaid).orElseThrow());

        // Mapeia a lista atual de fichas para extrair os IDs
        List<Long> listId = combate.getOrdemTurno()
                .stream()
                .map(Ficha::getId)
                .toList();

        // Aplica o reordenamento por iniciativa
        combate.setOrdemTurno(shuffle(listId));
        return repository.save(combate);
    }

    /**
     * Processa e executa uma ação de combate, que pode ser tanto um teste de perícia
     * quanto o uso de uma habilidade/ataque específico.
     */
    public ContextoAcao acao(ContextoAcao contextoAcao) {
        // Se houver um DTO de perícia preenchido, prioriza a execução da perícia
        if (contextoAcao.periciaDTO != null) {
            contextoAcao.periciaDTO = periciaService.usarPericia(contextoAcao.periciaDTO);
            return contextoAcao;
        }
        // Caso contrário, se houver um ID de ação, executa a ação genérica/ataque
        if (contextoAcao.acaoid != null) {
            contextoAcao = acaoService.usar(contextoAcao);
        }

        return contextoAcao;
    }

    /**
     * Avança o turno do combate e gerencia a redução do tempo de duração de efeitos ativos.
     */
    public Combate pularVez(Long id) {
        Combate combate = repository.findById(id).orElseThrow();
        combate.setTurno(combate.getTurno() + 1); // Avança o contador de turnos

        // Reseta os limites de ações e atualiza as durações dos efeitos
        combate = resetAcoes(combate);
        combate = resetEfeitosCombate(combate);
        combate = resetEfeitosFichas(combate);
        return repository.save(combate);
    }

    /**
     * Restaura a disponibilidade de todos os tipos de ações do turno para o combate.
     */
    public Combate resetAcoes(Combate c) {
        c.getAcoes().AcaoLivre = true;
        c.getAcoes().AcaoMovimento = true;
        c.getAcoes().AcaoPadrao = true;
        return c;
    }

    /**
     * Decrementa em 1 a duração de todos os efeitos globais vinculados diretamente ao combate.
     */
    public Combate resetEfeitosCombate(Combate c) {
        for (Efeito e : c.getEfeitos()) {
            e.setDuracao(e.getDuracao() - 1);
        }
        return repository.save(c);
    }

    /**
     * Decrementa em 1 a duração de todos os efeitos aplicados individualmente nos personagens do combate.
     */
    public Combate resetEfeitosFichas(Combate c) {
        for (Personagem p : c.getPersonagens()) {
            for (Efeito e : p.getEfeito()) {
                e.setDuracao(e.getDuracao() - 1);
            }
            fichaRepository.save(p); // Atualiza o estado do personagem com os efeitos modificados
        }
        return repository.save(c);
    }

    /**
     * Consome (marca como utilizada) a Ação de Movimento do combate.
     */
    public Combate usaAcaoMovimento(Long id) {
        Combate combate = repository.findById(id).orElseThrow();
        combate.getAcoes().AcaoMovimento = false;
        return repository.save(combate);
    }

    /**
     * Consome (marca como utilizada) a Ação Padrão do combate.
     */
    public Combate usaAcaoPadrao(Long id) {
        Combate combate = repository.findById(id).orElseThrow();
        combate.getAcoes().AcaoPadrao = false;
        return repository.save(combate);
    }

    /**
     * Consome (marca como utilizada) a Ação Livre do combate. Nota: Não efetua o save no banco nesta etapa.
     */
    public Combate usaAcaoLivre(Long id) {
        Combate combate = repository.findById(id).orElseThrow();
        combate.getAcoes().AcaoLivre = false;
        return combate;
    }

    /**
     * Busca e retorna um combate pelo seu ID.
     */
    public Combate getCombate(Long id) {
        return repository.findById(id).orElseThrow();
    }

    /**
     * Remove um registro de combate do banco de dados de forma definitiva utilizando o ID.
     */
    public void deleteCombate(Long id) {
        repository.deleteById(id);
    }

    /**
     * Restaura completamente os atributos (PE, Vida e Sanidade) ao valor máximo de todos os
     * personagens e monstros envolvidos no combate, limpando os valores temporários e deletando o combate ao fim.
     */
    public void resetCombate(Long id) {
        Combate combate = repository.findById(id).orElseThrow();

        // Restaura todos os status dos Personagens (Jogadores)
        for (Personagem p : combate.getPersonagens()) {
            p.getPe().setAtual(p.getPe().getMax());
            p.getPe().setTemporario(0);
            p.getVida().setAtual(p.getVida().getMax());
            p.getVida().setTemporario(0);
            p.getSanidade().setAtual(p.getSanidade().getMax());
            p.getSanidade().setTemporario(0);
            fichaRepository.save(p);
        }

        // Restaura a vida de todos os Monstros (Inimigos)
        for (Monstro p : combate.getMonstros()) {
            p.getVida().setAtual(p.getVida().getMax());
            p.getVida().setTemporario(0);
            fichaRepository.save(p);
        }

        // Encerra/exclui a sessão de combate ativa
        repository.deleteById(id);
    }
}