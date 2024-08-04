package com.backend.system.restaurant.respositories;

import org.springframework.data.repository.CrudRepository;

import com.backend.system.restaurant.entities.Orders;

public interface OrdersRepository extends CrudRepository<Orders, Long> {

    

}
