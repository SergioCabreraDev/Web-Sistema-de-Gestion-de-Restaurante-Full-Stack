package com.backend.system.restaurant.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.backend.system.restaurant.entities.Booking;
import com.backend.system.restaurant.entities.Orders;
import com.backend.system.restaurant.entities.User;
import com.backend.system.restaurant.respositories.OrdersRepository;
import com.backend.system.restaurant.services.OrdersServices;

import jakarta.validation.Valid;

@CrossOrigin(originPatterns = { "http://localhost:4200" }) // Permite peticiones desde localhost:4200 (Angular frontend)
@RestController
@RequestMapping("/api/orders")
public class OrdersController {

    @Autowired
    private OrdersServices services;

    @PostMapping
    public ResponseEntity<?> crearOrder(@Validated @RequestBody Orders order, BindingResult result) {

        order.setState("Pendiente");

        if (result.hasErrors()) {
            return validation(result);
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(services.saveOrder(order));
    }

    @GetMapping
    public List<Orders> findAllOrders() {
        return services.findAll(); // Retorna la página de usuarios
    }

    @GetMapping("/find")
    public ResponseEntity<?> findOrderByNumber(@RequestParam(required = false) String phoneNumber) {
        if (phoneNumber != null) {
            List<Orders> user = services.findByPhoneNumber(phoneNumber);
            if (!user.isEmpty()) {
                return ResponseEntity.ok(user);
            } else {
                return ResponseEntity.notFound().build();
            }
        } else {
            return ResponseEntity.badRequest().body("Phone Number parameter is missing");
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@Valid @RequestBody Orders order, BindingResult result, @PathVariable Long id, @RequestParam(required = false) String state) {

        if (result.hasErrors()) {
            return validation(result);
        }
        
        Optional<User> userOptional = service.update(user, id);

        if (userOptional.isPresent()) {
            return ResponseEntity.ok(userOptional.orElseThrow());
        }
        return ResponseEntity.notFound().build();
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
