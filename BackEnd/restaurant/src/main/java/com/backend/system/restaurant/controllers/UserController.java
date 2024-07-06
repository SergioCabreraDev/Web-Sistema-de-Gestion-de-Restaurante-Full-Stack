package com.backend.system.restaurant.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.system.restaurant.entities.Booking;
import com.backend.system.restaurant.entities.User;
import com.backend.system.restaurant.services.UserServices;

@CrossOrigin(originPatterns = {"http://localhost:4200"})  // Permite peticiones desde localhost:4200 (Angular frontend)
@RestController
@RequestMapping("/api/users")
public class UserController {


    @Autowired
    UserServices services;

    // Método para crear un nuevo usuario
    @PostMapping
    public ResponseEntity<?> create(@Validated @RequestBody User user, BindingResult result) {
        if (result.hasErrors()) {  // Si hay errores de validación, retorna una respuesta de validación
            return validation(result);
        }
        // Si no hay errores, guarda el usuario y retorna CREATED con el usuario guardado
        return ResponseEntity.status(HttpStatus.CREATED).body(services.save(user));
    }

        // Método para obtener usuarios de manera paginada
    @GetMapping
    public List<User> findAllUsers() {
        return services.findAll();  // Retorna la página de usuarios
        }

     // Método privado para manejar los errores de validación
    private ResponseEntity<?> validation(BindingResult result) {
        Map<String, String> errors = new HashMap<>();
        // Itera sobre los errores y los agrega al mapa de errores
        result.getFieldErrors().forEach(error -> {
            errors.put(error.getField(), "The field  " + error.getField() + " " + error.getDefaultMessage());
        });
        // Retorna una respuesta de error badRequest con los errores de validación
        return ResponseEntity.badRequest().body(errors);
    }
}


