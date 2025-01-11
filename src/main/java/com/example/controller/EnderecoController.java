package com.example.controller;

import com.example.model.Endereco;
import com.example.service.ViaCepService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Controller
public class EnderecoController {

    private static final Logger logger = LoggerFactory.getLogger(EnderecoController.class);

    @Autowired
    private ViaCepService viaCepService; // Serviço para buscar o endereço pelo CEP

    @GetMapping("/")
    public String home() {
        return "index"; // Retorna a página inicial (index.html)
    }

    @GetMapping("/search")
    public String buscarEndereco(@RequestParam String cep, Model model) {
        try {
            // Chama o serviço para buscar o endereço
            Endereco endereco = viaCepService.consultarCep(cep);

            // Verifica se o objeto endereco é nulo
            if (endereco == null) {
                logger.error("Endereço não encontrado para o CEP: {}", cep);
                model.addAttribute("erro", "CEP inválido ou não encontrado!");
                return "index"; // Volta para a página inicial
            }

            // Log da resposta da API
            logger.info("Endereço retornado: {}", endereco);

            // Adiciona o endereço como atributo para ser exibido na página de resultado
            model.addAttribute("endereco", endereco);
            return "result"; // Retorna a página de resultado (result.html)

        } catch (Exception e) {
            // Log do erro
            logger.error("Erro ao buscar o endereço: {}", e.getMessage(), e);

            // Caso ocorra erro (ex.: CEP inválido), exibe uma mensagem de erro na página
            model.addAttribute("erro", "CEP inválido ou não encontrado!");
            return "index"; // Volta para a página inicial
        }
    }
}
