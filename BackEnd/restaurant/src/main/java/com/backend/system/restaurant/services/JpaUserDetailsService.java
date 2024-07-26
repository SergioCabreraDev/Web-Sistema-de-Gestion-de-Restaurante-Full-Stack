package com.backend.system.restaurant.services;

import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.backend.system.restaurant.entities.User;
import com.backend.system.restaurant.respositories.UserRepository;

import org.springframework.transaction.annotation.Transactional;

@Service
public class JpaUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Transactional(readOnly = true)
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        Optional<User> optionalUser = userRepository.findByEmail(email);

        // Si el usuario no se encuentra, lanza una excepción UsernameNotFoundException
        if(optionalUser.isEmpty()){
            throw new UsernameNotFoundException(String.format("Esta email no esta registrado", email));
        }

        User user = optionalUser.orElseThrow();

        // Obtiene las autoridades (roles) del usuario y las convierte en una lista de GrantedAuthority
        java.util.List<GrantedAuthority> authorities = user.getRoles().stream()
                .map(role -> new SimpleGrantedAuthority(role.getName()))
                .collect(Collectors.toList());

        
        // Retorna un objeto UserDetails con la información del usuario, incluyendo su nombre de usuario, contraseña y roles
        return new org.springframework.security.core.userdetails.User(email, user.getPassword(), true, true, true, true, authorities);

       
    }

}
