package com.backend.system.restaurant.respositories;

import org.springframework.data.repository.CrudRepository;

import com.backend.system.restaurant.entities.Role;

public interface RoleRepository extends CrudRepository<Role, Long> {
    

}
