package com.backend.system.restaurant.respositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.backend.system.restaurant.entities.Booking;

@Repository
public interface BookingRepository extends CrudRepository <Booking, Long> {

    List<Booking> findAll();
    void deleteById(Long id);

}
