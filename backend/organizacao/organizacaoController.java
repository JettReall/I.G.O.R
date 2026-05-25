//organizacaoController.java

package com.example.demo.organizacao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/organizacao")
public class organizacaoController {

    @Autowired
    private organizacaoService service;

}