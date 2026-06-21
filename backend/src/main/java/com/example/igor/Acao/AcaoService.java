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

/**
 * Serviço responsável por localizar e executar qualquer ação do sistema.
 *
 * Durante a inicialização da aplicação, todas as implementações de
 * UsarAcao são registradas em um Map utilizando sua AcoesChave como chave.
 * Assim, quando uma ação é utilizada, basta identificar seu tipo e
 * delegar a execução para a implementação correspondente.
 */
@Service
public class AcaoService {

    /**
     * Mapeia cada tipo de ação para sua implementação responsável.
     */
    private final Map<AcoesChave, UsarAcao> acoes;

    private final AcaoRepository acaoRepository;

    /**
     * Registra automaticamente todas as implementações de UsarAcao.
     *
     * Apenas ações que possuem um tipo definido (getTipo() != null)
     * são adicionadas ao mapa.
     */
    public AcaoService(List<UsarAcao> listaAcao, AcaoRepository acaoRepository){

        this.acaoRepository = acaoRepository;

        this.acoes = listaAcao.stream()
                .filter(a -> a.getTipo() != null)
                .collect(Collectors.toMap(
                        UsarAcao::getTipo,
                        Function.identity()
                ));

        System.out.println("ACOES REGISTRADAS: " + acoes.keySet());
    }

    /**
     * Executa uma ação a partir do seu id.
     *
     * O fluxo consiste em:
     * - buscar a ação no banco;
     * - identificar seu tipo;
     * - localizar a implementação correspondente;
     * - delegar a execução para essa implementação.
     */
    public ContextoAcao usar(ContextoAcao contexto){

        // Recupera a ação solicitada
        Acao acao = acaoRepository.findById(contexto.acaoid).orElseThrow();

        System.out.println("TIPO DA ACAO: " + acao.getTipo());

        // Obtém a implementação responsável por esse tipo de ação
        UsarAcao utilizacao = acoes.get(acao.getTipo());

        // Caso nenhuma implementação tenha sido registrada,
        // a ação não pode ser executada.
        if(utilizacao == null){
            throw new RuntimeException("nenhuma acao encontrada");
        }

        // Delega a execução para a implementação específica
        return utilizacao.usarAcao(contexto);
    }

    /**
     * Atualiza os Pontos de Esforço do personagem.
     *
     * O consumo ocorre sempre nesta ordem:
     * - primeiro PE temporário;
     * - depois PE atual.
     *
     * Caso o personagem não possua PE suficiente para pagar o custo,
     * é lançada uma exceção.
     */
    public static Personagem atualizaPE(Personagem p, int custo){

        // Consome primeiro os PE temporários
        if(p.getPe().getTemporario() > 0){

            if(p.getPe().getTemporario() >= custo){

                p.getPe().setTemporario(
                        p.getPe().getTemporario() - custo
                );

            }else{

                custo -= p.getPe().getTemporario();

                p.getPe().setTemporario(0);

                p.getPe().setAtual(
                        p.getPe().getAtual() - custo
                );
            }
        }

        // Caso ainda exista custo restante, utiliza o PE atual
        if(p.getPe().getAtual() > custo){

            p.getPe().setAtual(
                    p.getPe().getAtual() - custo
            );

        }else{

            throw new PersonagemPEInsuficienteException(
                    "O personagem atual n possui PE suficiente para realizar essa acao"
            );
        }

        return p;
    }
}