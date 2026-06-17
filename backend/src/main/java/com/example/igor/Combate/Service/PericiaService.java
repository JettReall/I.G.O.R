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

@Service
public class PericiaService {

    @Autowired
    private PericiaRepository periciaRepository;
    @Autowired
    private FichaRepository fichaRepository;


    public PericiaDTO usarPericia(PericiaDTO dto) {


        Ficha personagem = fichaRepository.findById(dto.idPersonagem).orElse(null);


        int atributo;
        Pericia pericia = periciaRepository.findById(dto.idPericia).orElse(null);
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
                throw new RuntimeException("Erro interno");
        }


        PericiaPersonagem pp = personagem.getPericias()
                .stream()
                .filter(p -> p.getPericia().getId().equals(pericia.getId()))
                .findFirst()
                .orElseThrow();

        int bonus = pp.getBonus();

        dto.rolagem = new RolagemDado(atributo, 20, bonus);


        return dto;
    }
}

