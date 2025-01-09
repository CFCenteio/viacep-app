package com.example.controller;

import com.example.model.Endereco;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class EnderecoController {

    @GetMapping("/")
    public String home() {
        return "index"; // retorna a página inicial
    }

    @GetMapping("/buscar")
    public String buscarEndereco(@RequestParam String cep, Model model) {
        // TODO: adicionar integração com a API ViaCEP
        Endereco endereco = new Endereco(); // Simulação
        endereco.setCep(cep);
        endereco.setLogradouro("Rua Exemplo");
        endereco.setBairro("Bairro Exemplo");
        endereco.setCidade("Cidade Exemplo");
        endereco.setEstado("Estado Exemplo");

        model.addAttribute("endereco", endereco);
        return "resultado"; // retorna a página de resultados
    }
}
