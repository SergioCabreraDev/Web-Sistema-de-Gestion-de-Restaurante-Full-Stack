package com.backend.system.restaurant.services;

import java.util.List;
import java.util.Optional;

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



    @Override
    public List<Orders> findAll() {
      return repository.findAll();
    }

    @Override
    public Optional<Orders> findById(Long id) {
        return repository.findById(id);
    }

    @Override
    public List<Orders> findByPhoneNumber(String phoneNumber) {
        return repository.findByPhoneNumber(phoneNumber);
    }

    @Override
    @Transactional
    public Optional<Orders> update(Long id, String state) {

        Optional<Orders> optionalOrder = repository.findById(id);

        if (optionalOrder.isPresent()) {
            Orders orderdb = optionalOrder.get();
            orderdb.setState(state);
            repository.save(orderdb);
            return Optional.of(orderdb);
        }
        return Optional.empty();
    }



    @Transactional
    @Override
    public void deleteById(Long id) {
        repository.deleteById(id);
    }



 


}
