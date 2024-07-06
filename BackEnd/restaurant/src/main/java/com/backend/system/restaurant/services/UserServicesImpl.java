package com.backend.system.restaurant.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.system.restaurant.entities.User;
import com.backend.system.restaurant.respositories.UserRepository;

import jakarta.transaction.Transactional;

@Service
public class UserServicesImpl implements UserServices {

    @Autowired
    UserRepository repository;

    @Override
    @Transactional
    public User save(User user){
        return repository.save(user);
    }

    @Override
    public List<User> findAll() {

        return repository.findAll();
    }

}
