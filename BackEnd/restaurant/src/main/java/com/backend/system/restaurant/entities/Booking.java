package com.backend.system.restaurant.entities;

import java.sql.Date;
import java.sql.Time;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "bookings")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter @Setter
    Long id;

    @NotBlank 
    @Getter @Setter
    String name;

    @NotBlank 
    @Getter @Setter
    String lastName;

    @NotEmpty 
    @Getter @Setter
    String phoneNumber;

    @Getter @Setter
    Date date;

    @NotEmpty
    @Getter @Setter
    String time;

}
