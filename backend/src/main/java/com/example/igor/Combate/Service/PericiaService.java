package com.example.igor.Combate.Service;

import com.example.igor.Combate.DTO.PericiaDTO;
import com.example.igor.ficha.Repositories.FichaRepository;
import com.example.igor.ficha.Repositories.PericiaRepository;
import com.example.igor.ficha.entity.Ficha;
import com.example.igor.ficha.entity.personagem.Pericia;
import com.example.igor.ficha.entity.personagem.PericiaPersonagem;
import com.example.igor.global.Dado.RolagemDado;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Serviço responsável por gerenciar a lógica de uso e rolagem de perícias de um personagem.
 */
@Service
public class PericiaService {

    @Autowired
    private PericiaRepository periciaRepository;
    @Autowired
    private FichaRepository fichaRepository;

    /**
     * Executa o teste de perícia baseado nos IDs fornecidos no DTO e anexa o resultado da rolagem.
     */
    public PericiaDTO usarPericia(PericiaDTO dto) {

        // Busca a ficha do personagem no banco de dados (retorna null se não encontrar)
        Ficha personagem = fichaRepository.findById(dto.idPersonagem).orElse(null);

        // Logs de depuração para analisar os dados e atributos recuperados da ficha
        System.out.println("PERSONAGEM: " + personagem);
        System.out.println("ATRIBUTOS: " + personagem.getAtributos());
        System.out.println("AGILIDADE: " + personagem.getAtributos());

        int atributo;
        // Busca a definição da perícia no banco de dados (retorna null se não encontrar)
        Pericia pericia = periciaRepository.findById(dto.idPericia).orElse(null);

        // Avalia qual atributo está associado a essa perícia para capturar o valor numérico correspondente
        switch (pericia.getAtributo()) {
            case "Agilidade":
                atributo = personagem.getAtributos().getAgilidade();
                break;

            case "Intelecto":
                atributo = personagem.getAtributos().getIntelecto();
                break;

            case "Vigor":
                atributo = personagem.getAtributos().getVigor();
                break;

            case "Presenca":
                atributo = personagem.getAtributos().getPresenca();
                break;

            case "Forca":
                atributo = personagem.getAtributos().getForca();
                break;

            default:
                // Lança uma exceção de segurança caso o atributo cadastrado na perícia seja inválido
                throw new RuntimeException("Erro interno");
        }

        // Filtra a lista de perícias que o personagem possui para encontrar o bônus de treinamento específico desta perícia
        PericiaPersonagem pp = personagem.getPericias()
                .stream()
                .filter(p -> p.getPericia().getId().equals(pericia.getId()))
                .findFirst()
                .orElseThrow(); // Lança exceção caso o personagem não possua a relação com essa perícia

        // Captura o valor do bônus de treinamento (ex: +5, +10, +15)
        int bonus = pp.getBonus();

        // Instancia a rolagem de dados (Quantidade de dados = valor do atributo, Tipo do dado = d20, Somatório fixo = bônus)
        dto.rolagem = new RolagemDado(atributo, 20, bonus);

        // Retorna o DTO atualizado contendo o objeto de rolagem populado
        return dto;
    }
}