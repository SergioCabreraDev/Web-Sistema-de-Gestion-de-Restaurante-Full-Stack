package com.backend.system.restaurant.services;

import java.util.List;

import com.backend.system.restaurant.entities.User;

public interface UserServices {

    User save(User user);
    List<User> findAll();

}
