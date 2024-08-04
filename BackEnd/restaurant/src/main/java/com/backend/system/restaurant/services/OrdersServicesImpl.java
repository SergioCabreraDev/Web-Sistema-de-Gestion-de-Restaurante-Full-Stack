package com.backend.system.restaurant.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.backend.system.restaurant.entities.Orders;
import com.backend.system.restaurant.entities.User;
import com.backend.system.restaurant.respositories.OrdersRepository;

import jakarta.transaction.Transactional;

@Service
public class OrdersServicesImpl implements OrdersServices {


    @Autowired
    private OrdersRepository repository;

  

    @Override
    @Transactional
    public Orders saveOrder(Orders order){

        // Guarda el en el repositorio y lo devuelve
        return repository.save(order);
    }


}
