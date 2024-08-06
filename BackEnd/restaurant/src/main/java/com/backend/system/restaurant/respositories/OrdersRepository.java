package com.backend.system.restaurant.respositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.backend.system.restaurant.entities.Booking;
import com.backend.system.restaurant.entities.Orders;
import com.backend.system.restaurant.entities.User;

public interface OrdersRepository extends CrudRepository<Orders, Long> {

        List<Orders> findAll();
        List<Orders> findByPhoneNumber(String phoneNumber);

}
