package com.backend.system.restaurant.respositories;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.backend.system.restaurant.entities.Role;

public interface RoleRepository extends CrudRepository<Role, Long> {
    
    Optional<Role> findByName(String name);

}
