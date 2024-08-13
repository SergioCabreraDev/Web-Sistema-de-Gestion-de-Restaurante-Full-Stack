package com.backend.system.restaurant.controllers;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@CrossOrigin(originPatterns = { "http://localhost:4200" }) // Permite peticiones desde localhost:4200 (Angular frontend)
@RestController
@RequestMapping("/api/newsletter")
public class NewletterController {

    @Autowired
    private JavaMailSender mailSender;

    @PostMapping
    public ResponseEntity<Map<String, String>> postMethodName(@RequestBody String email) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("noreply@baeldung.com");
        message.setTo(email);
        message.setSubject("Gracias por suscribirte a nuestra Newsletter");
        message.setText("Estamos emocionados de compartir contigo las últimas noticias y deliciosas novedades de Cabreras Burger. Si eres amante de las hamburguesas, ¡esto es para ti!");
        mailSender.send(message);
        
        Map<String, String> response = new HashMap<>();
        response.put("message", "Suscripción exitosa");
        response.put("email", email);
        
        return ResponseEntity.ok(response);
    }

    

}
