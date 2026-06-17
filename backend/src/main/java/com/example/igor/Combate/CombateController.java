package com.example.igor.Combate;

import com.example.igor.Combate.DTO.PericiaDTO;
import com.example.igor.Combate.Service.CombateService;
import com.example.igor.Combate.Service.PericiaService;
import com.example.igor.ficha.entity.Ficha;
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

    /*
    @PostMapping("/add")
    private Combate addFichaPosicao(@RequestBody CombateFichaDTO dto){
        return combateService.addFichaPosicao(dto);
    }

     */

    @PostMapping("/pericia")
    private PericiaDTO usarPericia(@RequestBody PericiaDTO periciaDTO){
        return periciaService.usarPericia(periciaDTO);
    }

    @PostMapping("/ordemturno")
    private List<Ficha> shuffle(@RequestBody List<Long> list){
        return combateService.shuffle(list);
    }
}
