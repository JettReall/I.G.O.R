package com.example.igor.Exception;

import com.example.igor.Campanhna.Exception.CampanhaJaExisteException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(CampanhaJaExisteException.class)
    public ResponseEntity<Map<String, Object>> handleCampanhaJaExiste(CampanhaJaExisteException ex) {
        // Criando um mapa ordenado para o JSON ficar bonito
        Map<String, Object> body = new LinkedHashMap<>();
        body.put("timestamp", LocalDateTime.now().toString());
        body.put("status", HttpStatus.CONFLICT.value());
        body.put("error", "Conflict");
        body.put("message", ex.getMessage()); // <--- SUA MENSAGEM VAI APARECER AQUI!

        return ResponseEntity.status(HttpStatus.CONFLICT).body(body);
    }
}