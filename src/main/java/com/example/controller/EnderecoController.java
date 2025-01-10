package com.example.controller;

import com.example.model.Endereco;
import com.example.service.ViaCepService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class EnderecoController {

    @Autowired
    private ViaCepService viaCepService; // Serviço para buscar o endereço pelo CEP

    @GetMapping("/")
    public String home() {
        return "index"; // Retorna a página inicial (index.html)
    }

    @GetMapping("/buscar")
    public String buscarEndereco(@RequestParam String cep, Model model) {
        try {
            // Chama o serviço para buscar o endereço
            Endereco endereco = viaCepService.buscarEnderecoPorCep(cep);

            // Adiciona o endereço como atributo para ser exibido na página de resultado
            model.addAttribute("endereco", endereco);
            return "result"; // Retorna a página de resultado (result.html)

        } catch (Exception e) {
            // Caso ocorra erro (ex.: CEP inválido), exibe uma mensagem de erro na página
            model.addAttribute("erro", "CEP inválido ou não encontrado!");
            return "index"; // Volta para a página inicial
        }
    }
}
