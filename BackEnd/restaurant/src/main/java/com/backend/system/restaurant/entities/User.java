package com.backend.system.restaurant.entities;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter @Setter
    private Long id;

    @NotBlank 
    @Getter @Setter
    private String name;

    @NotBlank  // Valida que el campo no esté en blanco ni sea nulo
    @Getter @Setter
    private String lastName; 

    @NotEmpty  // Valida que el campo no esté vacío
    @Getter @Setter
    private String phoneNumber;

    @NotEmpty  // Valida que el campo no esté vacío
    @Email  // Valida que el campo tenga un formato de dirección de correo electrónico válido
    @Getter @Setter
    private String email;

    @NotBlank  // Valida que el campo no esté en blanco ni sea nulo
    @Getter @Setter
    private String password;


}
