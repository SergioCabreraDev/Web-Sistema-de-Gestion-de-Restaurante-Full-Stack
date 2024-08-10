package com.backend.system.restaurant.services;

import java.util.List;
import java.util.Optional;

import com.backend.system.restaurant.entities.Orders;
import com.backend.system.restaurant.entities.User;

public interface OrdersServices {

    Orders saveOrder(Orders productsJson);
    List<Orders> findAll();
    List<Orders> findByPhoneNumber(String phoneNumber);
    Optional<Orders> update(Long id, String state);
    Optional<Orders> findById(Long id);

}
