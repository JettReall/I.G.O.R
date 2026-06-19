package com.example.igor.Combate;

import com.example.igor.Combate.DTO.CombateFichaDTO;
import com.example.igor.Combate.DTO.ContextoAcao;
import com.example.igor.Combate.DTO.PericiaDTO;
import com.example.igor.Combate.Service.CombateService;
import com.example.igor.Combate.Service.PericiaService;
import com.example.igor.ficha.entity.Ficha;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/combate")
public class CombateController {
    @Autowired
    private CombateService combateService;
    @Autowired
    private PericiaService periciaService;

    @Operation(
            summary = "Adiciona uma ficha em um posicao especifica na ordem",
            description = "Recebe um id de um combate,uma ficha e uma posicao, então adiciona tal ficha ao combate," +
                    "e n altera a ordem de turno apenas adiciona a nova ficha na posicao passada." +
                    "\n\nOBS: Caso seja um personagem o campo de id de Monstro deve estar null, e vice-versa. "
    )
    @PostMapping("/add/set")
    private Combate addFichaPosicao(@RequestBody CombateFichaDTO dto){
        return combateService.addFichaPosicao(dto);
    }


    @Operation(
            summary = "Adiciona ficha e refaz a ordem",
            description = "Recebe um id de combate e uma ficha, então adiciona a ficha ao combate e refaz toda a ordem de turno," +
                    "rerola todas as iniciativas incluindo a nova." +
                    "\n\nOBS: Caso seja um personagem o campo de id de Monstro deve estar null, e vice-versa."
    )
    @PostMapping("/add/random")
    private Combate addFichaRandom(@RequestBody CombateFichaDTO dto){
        return combateService.addFichaRandom(dto);
    }


    @Operation(
            summary = "rola uma pericia",
            description = "recebe um id de personagem(NAO PODE RECEBER ID DE MONSTRO), e o id de uma pericia," +
                    "rola a pericia e retorna a rolagem." +
                    "\n\nOBS: o campo de rolagem da request pode estar vazia"
    )
    @PostMapping("/pericia")
    private PericiaDTO usarPericia(@RequestBody PericiaDTO periciaDTO){
        return periciaService.usarPericia(periciaDTO);
    }


    @Operation(
            summary = "Refaz a ordem de iniciativa",
            description = "Recebe a lista de ids das fichas presentes no combate e retorna a mesma lista porem com iniciativas rerolladas."

    )
    @PostMapping("/ordemturno")
    private List<Ficha> shuffle(@RequestBody List<Long> list){
        return combateService.shuffle(list);
    }


    @Operation(
            summary = "Realiza uma acao",
            description = "Recebe o id de uma acao, Id da ficha de quem esta usando a acao(idUsuario)" +
                    "e o id da ficha de qm esta recebendo a acao(idAlvo).\n\n" +
                    "a funcao então rola o dano causado(se tiver), e adiciona a rolagem ao campo (rolagem) do json\n" +
                    ", a funcão após rolar o dano ja atualiza as fichas de ambos usuario e alvo no banco(tlvz seja precisa pegar os dois novamente para atualizar os valores," +
                    "\n\nOBS:rolagem e pericia devem estar null caso a acao n envolva pericia, e rolagem deve sempre ser null no request"
    )
    @PostMapping("/acao")
    private ContextoAcao combateAcao(@RequestBody ContextoAcao contexto){
        System.out.println("CHEGOU NO CONTROLLER: " + contexto.acaoid + " usuario: " + contexto.idUsuario);
        return combateService.acao(contexto);
    }


    @Operation(
            summary = "Pula a vez",
            description = "recebe um id de um combate.\n\nPula a vez = turno+1, aumenta 1 no numero de turno e restaura acoes atuais(ACAO_PADRAO,ACAO_LIvre etc)"
    )
    @GetMapping("/skip/{id}")
    private Combate pularVez(@PathVariable Long id){
        return combateService.pularVez(id);
    }

}

