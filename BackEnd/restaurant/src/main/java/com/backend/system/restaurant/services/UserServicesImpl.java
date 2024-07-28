package com.backend.system.restaurant.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.backend.system.restaurant.entities.Role;
import com.backend.system.restaurant.entities.User;
import com.backend.system.restaurant.models.IUser;
import com.backend.system.restaurant.respositories.RoleRepository;
import com.backend.system.restaurant.respositories.UserRepository;

import jakarta.transaction.Transactional;

@Service
public class UserServicesImpl implements UserServices {

    @Autowired
    UserRepository repository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public User save(User user){

        // Establece la lista de roles en el usuario
        user.setRoles(getRoles(user));

        // Codifica (hashea) la contraseña del usuario usando el passwordEncoder y la establece en el usuario
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // Guarda el usuario en el repositorio y lo devuelve
        return repository.save(user);
    }

    @Override
    public List<User> findAll() {

        return repository.findAll();
    }

        private List<Role> getRoles(User user) {
        // Define una lista para almacenar los roles del usuario
        List<Role> roles = new ArrayList<>();

        // Busca un rol específico en el repositorio de roles por su nombre
        Optional<Role> optionalRoleUser = roleRepository.findByName("ROLE_USER");

        // Si el rol está presente (existe en el repositorio), lo añade a la lista de roles
        optionalRoleUser.ifPresent(role -> roles.add(role));

        // Comprueba si el usuario tiene permisos de administrador
        if(user.isAdmin()) {
            // Busca un rol específico en el repositorio de roles por su nombre
            Optional<Role> optionalRoleAdmin = roleRepository.findByName("ROLE_ADMIN");

            // Si el rol está presente (existe en el repositorio), lo añade a la lista de roles
            optionalRoleAdmin.ifPresent(role -> roles.add(role));
        }
        return roles;
    }

}
