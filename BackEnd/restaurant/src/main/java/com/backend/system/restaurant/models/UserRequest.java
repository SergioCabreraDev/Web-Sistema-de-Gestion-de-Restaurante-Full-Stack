package com.backend.system.restaurant.models;

import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

public class UserRequest implements IUser{

    @NotBlank  // Valida que el campo no esté en blanco ni sea nulo
    @Getter @Setter
    private String name;

    @NotBlank  // Valida que el campo no esté en blanco ni sea nulo
    @Getter @Setter
    private String lastname;

    @NotEmpty  // Valida que el campo no esté vacío
    @Email  // Valida que el campo tenga un formato de dirección de correo electrónico válido
    @Getter @Setter
    private String email;

    @NotBlank  // Valida que el campo no esté en blanco ni sea nulo
    @Size(min = 4, max = 12)  // Valida que el tamaño del campo esté entre 4 y 12 caracteres
    @Getter @Setter
    private String username;

    @Getter @Setter
    private boolean admin;

    @Override
    public boolean isAdmin() {
        return admin;
    }

}
