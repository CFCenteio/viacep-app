package com.example.controller;

import com.example.model.Endereco;
import com.example.service.ViaCepService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/api/enderecos")
public class EnderecoController {

    private static final Logger logger = LoggerFactory.getLogger(EnderecoController.class);

    @Autowired
    private ViaCepService viaCepService; // Serviço para buscar o endereço pelo CEP

    @GetMapping("/{cep}")
    public ResponseEntity<Endereco> getEnderecoByCep(@PathVariable String cep) {
        try {
            // Chama o serviço para buscar o endereço
            Endereco endereco = viaCepService.consultarCep(cep);

            // Verifica se o objeto endereco é nulo
            if (endereco == null) {
                logger.error("Endereço não encontrado para o CEP: {}", cep);
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }

            // Log da resposta da API
            logger.info("Endereço retornado: {}", endereco);

            // Retorna o endereço em formato JSON
            return new ResponseEntity<>(endereco, HttpStatus.OK);

        } catch (Exception e) {
            // Log do erro
            logger.error("Erro ao buscar o endereço: {}", e.getMessage(), e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
