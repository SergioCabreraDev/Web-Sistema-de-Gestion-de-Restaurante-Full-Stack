package com.backend.system.restaurant.controllers;


import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.system.restaurant.entities.Booking;
import com.backend.system.restaurant.services.BookingServices;

@CrossOrigin(originPatterns = {"http://localhost:4200"})  // Permite peticiones desde localhost:4200 (Angular frontend)
@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    BookingServices services;

    @PostMapping
    public ResponseEntity<?> crearReserva(@Validated @RequestBody Booking booking, BindingResult result){
        if(result.hasErrors()){
            return validation(result);
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(services.save(booking));
    }


    // Método para obtener usuarios de manera paginada
    @GetMapping
    public List<Booking> findAllBookings() {
        return services.findAll();  // Retorna la página de usuarios
        }

    // Método para eliminar un usuario por su ID
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        Optional<Booking> bookingOptional = services.findById(id);  // Busca la reserva por ID en el servicio
        if (bookingOptional.isPresent()) {  // Si la reserva existe, elimínalo y retorna NO_CONTENT
            services.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        // Si no existe el usuario, retorna NOT_FOUND
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
