package com.backend.system.restaurant.services;

import java.util.List;
import java.util.Optional;

import com.backend.system.restaurant.entities.Booking;

public interface BookingServices {

    Booking save(Booking booking);
    List<Booking> findAll();
    void deleteById(Long id);
    Optional<Booking> findById(Long id);




}
