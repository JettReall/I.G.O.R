package com.example.igor.config;

import com.example.igor.ficha.entity.acao.Habilidade;
import com.example.igor.ficha.repository.HabilidadeRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.core.annotation.Order;

import java.io.InputStream;
import java.util.List;

@Component
@Order(1)
public class SetarHabilidades implements CommandLineRunner {

    @Autowired
    private HabilidadeRepository habilidadeRepository;

    private final ObjectMapper objectMapper = new ObjectMapper(); //erro: "required a bean of type" se usar autowired

    @Override
    public void run(String... args) throws Exception {
        // Verifica se o banco já tem habilidades. 
        if (habilidadeRepository.count() == 0) {
            
            // 1. Carrega o arquivo JSON
            InputStream inputStream = getClass().getResourceAsStream("/habilidades.json");
            
            try {
                // 2. Transforma o JSON em uma Lista de Habilidades
                List<Habilidade> habilidades = objectMapper.readValue(inputStream, new TypeReference<List<Habilidade>>() {});
                
                // 3. Salva todas as habilidades no banco (Supabase)
                habilidadeRepository.saveAll(habilidades);
                
                System.out.println("Habilidades carregadas");
                
            } catch (java.io.IOException e) {
                System.out.println("Erro ao ler o JSON: " + e.getMessage());
            }
            catch (Exception e) {
                
                System.out.println("Erro inesperado: " + e.getMessage());
            } 
            } else {
            System.out.println("Erro, o banco já possui habilidades cadastradas.");
        }
    }
}