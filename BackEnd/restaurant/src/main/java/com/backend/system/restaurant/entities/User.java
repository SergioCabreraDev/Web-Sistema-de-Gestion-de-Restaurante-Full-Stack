package com.backend.system.restaurant.entities;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import jakarta.persistence.UniqueConstraint;
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


    @Transient //no se refleja en la tabla users
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Getter @Setter
    private boolean admin;

    @JsonIgnoreProperties({"handler", "hibernateLazyInitializer"})
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name="users_role",
        joinColumns = {@JoinColumn(name="users_id")},
        inverseJoinColumns = @JoinColumn(name="role_id"),
        uniqueConstraints = {@UniqueConstraint(columnNames = {"user_id", "role_id"})}
    )
    
    @Getter @Setter
    private List<Role> roles;


    public User() {
        this.roles = new ArrayList<>();
    }



}
