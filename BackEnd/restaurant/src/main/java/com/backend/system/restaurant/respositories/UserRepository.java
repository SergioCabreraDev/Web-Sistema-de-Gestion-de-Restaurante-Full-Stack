package com.backend.system.restaurant.respositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.backend.system.restaurant.entities.User;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {
    // Método para recuperar todos los usuarios de manera paginada
    Page<User> findAll(Pageable pageable);
}
