package com.backend.system.restaurant.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.system.restaurant.entities.Booking;
import com.backend.system.restaurant.respositories.BookingRepository;

import jakarta.transaction.Transactional;

@Service
public class BookingServicesImpl implements BookingServices {

    @Autowired
    BookingRepository repository;

    @Override
    @Transactional
    public Booking save(Booking booking){
        return repository.save(booking);
    }

}
