package com.backend.system.restaurant.entities;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    @Getter @Setter
    private Long id;
    
    @Column(name = "name")
    @Getter @Setter
    private String name;

    @Column(name = "lastname")
    @Getter @Setter
    private String lastName; 

    @Column(name = "phoneNumber")
    @Getter @Setter
    private Integer phoneNumber;

    @Column(name = "email")
    @Getter @Setter
    private String email;

    @Column(name = "password")
    @Getter @Setter
    private String password;


}
