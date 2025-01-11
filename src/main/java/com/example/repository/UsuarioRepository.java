package com.example.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.model.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    // Aqui você pode definir consultas personalizadas, se necessário
}
