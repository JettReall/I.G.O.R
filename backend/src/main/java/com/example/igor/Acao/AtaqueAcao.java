package com.example.igor.Acao;

import com.example.igor.Acao.Repositories.AtaqueRepository;
import com.example.igor.Combate.DTO.ContextoAcao;
import com.example.igor.Combate.Exception.PersonagemPEInsuficienteException;
import com.example.igor.Combate.Util.UsarAcao;
import com.example.igor.ficha.Repositories.FichaRepository;
import com.example.igor.ficha.entity.Ficha;
import com.example.igor.ficha.entity.acao.Ataque;
import com.example.igor.ficha.entity.personagem.Personagem;
import com.example.igor.global.Dado.RolagemDado;
import org.springframework.stereotype.Service;

@Service
public class AtaqueAcao implements UsarAcao {
    private final AtaqueRepository ataqueRepository;
    private final FichaRepository fichaRepository;

    public AtaqueAcao(AtaqueRepository ataqueRepository, FichaRepository fichaRepository) {
        this.ataqueRepository = ataqueRepository;
        this.fichaRepository = fichaRepository;
    }

    @Override
    public AcoesChave getTipo() {
        return AcoesChave.ATAQUEACAO;
    }

    @Override
    public ContextoAcao usarAcao(ContextoAcao contexto) {
        Ataque ataque = ataqueRepository.findById(contexto.acaoid).orElseThrow();
        Ficha personagem = fichaRepository.findById(contexto.idUsuario).orElseThrow();
        Ficha alvo = fichaRepository.findById(contexto.idAlvo).orElseThrow();
        System.out.println("ALVO VIDA: " + alvo.getVida());
        System.out.println("ALVO CLASSE: " + alvo.getClass().getName());


        if(personagem instanceof Personagem){
            Personagem personagem1 = (Personagem) personagem;
            System.out.println("PE ANTES: " + personagem1.getPe().getAtual());
            if(personagem1.getPe().getAtual()>=ataque.getCusto().getInicial()) {

                personagem1.getPe().setAtual(
                        personagem1.getPe().getAtual() - ataque.getCusto().getInicial());
                System.out.println("PE DEPOIS: " + personagem1.getPe().getAtual());
                fichaRepository.save(personagem1);
            }else{
                throw new PersonagemPEInsuficienteException("O personagem atual n possui PE suficiente para realizar essa acao");
            }
        }


        int quantidade = personagem.getValorAtributo(ataque.getAtributo());
        contexto.rolagem = new RolagemDado(quantidade,ataque.getTamanhoDado()
        ,ataque.getFlatDano());

        if(contexto.rolagem.getMaiorDado().valor>=ataque.getCriticoRange()){

            contexto.rolagem.setResultadoTotal(contexto.rolagem.getResultadoTotal()
            *ataque.getCriticoMult());
        }
        if(alvo.getVida().getAtual()<=contexto.rolagem.getResultadoTotal()){
            alvo.getVida().setAtual(0);
        }else {
            alvo.getVida().setAtual(alvo.getVida().getAtual() - contexto.rolagem.getResultadoTotal());
        }
        fichaRepository.save(alvo);




        return contexto;
    }
}