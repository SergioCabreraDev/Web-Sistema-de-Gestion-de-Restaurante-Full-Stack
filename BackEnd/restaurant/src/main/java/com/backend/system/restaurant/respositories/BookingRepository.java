package com.backend.system.restaurant.respositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.backend.system.restaurant.entities.Booking;

public interface BookingRepository extends CrudRepository <Booking, Long> {

    List<Booking> findAll();

}
