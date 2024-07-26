package com.backend.system.restaurant.auth.filter;
import java.io.IOException;


import static com.backend.system.restaurant.auth.TokenJwtConfig.CONTENT_TYPE;
import static com.backend.system.restaurant.auth.TokenJwtConfig.HEADER_AUTHORIZATION;
import static com.backend.system.restaurant.auth.TokenJwtConfig.PREFIX_TOKEN;
import static com.backend.system.restaurant.auth.TokenJwtConfig.SECRET_KEY;


import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.backend.system.restaurant.entities.User;
import com.fasterxml.jackson.core.exc.StreamReadException;
import com.fasterxml.jackson.databind.DatabindException;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import org.springframework.security.core.GrantedAuthority;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;


// Clase JwtAuthenticationFilter que extiende UsernamePasswordAuthenticationFilter para manejar la autenticación basada en JWT
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    // Objeto para gestionar la autenticación
    private AuthenticationManager authenticationManager;

    // Constructor que recibe un AuthenticationManager y lo asigna al atributo correspondiente
    public JwtAuthenticationFilter(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    // Método para intentar la autenticación
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
            throws AuthenticationException {
        
        // Variables para almacenar el nombre de usuario y la contraseña
        String email = null;
        String password = null;
        
        // Variable para almacenar el usuario
        User user = null;

        try {
            // Leer el usuario desde el flujo de entrada de la solicitud HTTP
            user = new ObjectMapper().readValue(request.getInputStream(), User.class);
            email = user.getEmail();
            password = user.getPassword();

        } catch (StreamReadException e) {
            // Manejar la excepción en caso de error de lectura del flujo
            e.printStackTrace();
        } catch (DatabindException e) {
            // Manejar la excepción en caso de error de enlace de datos
            e.printStackTrace();
        } catch (IOException e) {
            // Manejar la excepción en caso de error de entrada/salida
            e.printStackTrace();
        }

        // Crear un token de autenticación con el nombre de usuario y la contraseña
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(email, password);
        
        // Autenticar el token utilizando el AuthenticationManager
        return this.authenticationManager.authenticate(authenticationToken);
    }

    // Método que se llama cuando la autenticación es exitosa
    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
            Authentication authResult) throws IOException, ServletException {
        
            // Obtiene el usuario autenticado
            org.springframework.security.core.userdetails.User user = (org.springframework.security.core.userdetails.User) authResult.getPrincipal();
            String email = user.getUsername();

            // Obtiene los roles del usuario
            Collection<? extends GrantedAuthority> roles = authResult.getAuthorities();

            // Verifica si el usuario tiene el rol de ADMIN
            boolean isAdmin = roles.stream().anyMatch(role -> role.getAuthority().equals("ROLE_ADMIN"));

            // Crea los claims para el JWT
            Claims claims = Jwts.claims()
            .add("authorities", new ObjectMapper().writeValueAsString(roles))
            .add("email", email)
            .add("isAdmin", isAdmin)
            .build();
 
            // Construye el token JWT
            String jwt = Jwts.builder()
                    .subject(email)
                    .claims(claims)
                    .signWith(SECRET_KEY)
                    .issuedAt(new Date())
                    .expiration(new Date(System.currentTimeMillis() + 3600000)) // Token expira en 1 hora
                .compact();

            // Añade el token JWT en la cabecera de la respuesta
            response.addHeader(HEADER_AUTHORIZATION, PREFIX_TOKEN + jwt);

            // Crea un cuerpo de respuesta JSON con el token y el nombre de usuario
            Map<String, String> body = new HashMap<>();
            body.put("token", jwt);
            body.put("email", email);
            body.put("is Admin", String.valueOf(isAdmin));
            body.put("messsage", String.format("%s,HAS INICIADO SESION CON EXITO", email));

            // Escribe el cuerpo de respuesta en la respuesta HTTP
            response.getWriter().write(new ObjectMapper().writeValueAsString(body));
            response.setContentType(CONTENT_TYPE);

            // Establece el estado de la respuesta HTTP a 200 (OK)
            response.setStatus(200);
    }

    // Método que se llama cuando la autenticación falla
    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response,
            AuthenticationException failed) throws IOException, ServletException {

        // Crea un cuerpo de respuesta JSON con un mensaje de error
        Map<String, String> body = new HashMap<>();
        body.put("message", "Error en la autenticacion con email o password incorrecto!");
        body.put("error", failed.getMessage());

        // Escribe el cuerpo de respuesta en la respuesta HTTP
        response.getWriter().write(new ObjectMapper().writeValueAsString(body));
        response.setContentType(CONTENT_TYPE);

        // Establece el estado de la respuesta HTTP a 401 (Unauthorized)
        response.setStatus(401);
    }
}


