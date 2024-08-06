package com.backend.system.restaurant.entities;

import java.sql.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "orders")
public class Orders {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter @Setter
    Long id;

    @Getter @Setter
    String products;

    @Getter @Setter
    Float price;

    @Getter @Setter
    String direction;

    @Getter @Setter
    String phoneNumber;

    @Getter @Setter
    Date date;

    @Getter @Setter
    String time;

}
