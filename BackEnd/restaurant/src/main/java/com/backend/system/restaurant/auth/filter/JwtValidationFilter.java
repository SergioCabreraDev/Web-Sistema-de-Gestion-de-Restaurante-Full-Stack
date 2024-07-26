package com.backend.system.restaurant.auth.filter;
import static com.backend.system.restaurant.auth.TokenJwtConfig.CONTENT_TYPE;
import static com.backend.system.restaurant.auth.TokenJwtConfig.HEADER_AUTHORIZATION;
import static com.backend.system.restaurant.auth.TokenJwtConfig.PREFIX_TOKEN;
import static com.backend.system.restaurant.auth.TokenJwtConfig.SECRET_KEY;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import java.io.IOException;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import com.backend.system.restaurant.auth.SimpleGrantedAuthorityJsonCreator;
import com.fasterxml.jackson.databind.ObjectMapper;


import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.lang.Arrays;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class JwtValidationFilter extends BasicAuthenticationFilter {
    // Constructor de la clase que recibe un AuthenticationManager y lo pasa al constructor de la clase padre.
    public JwtValidationFilter(AuthenticationManager authenticationManager) {
        super(authenticationManager);
    }

    // Método sobreescrito que se ejecuta en cada solicitud HTTP. Es el núcleo del filtro de autenticación.
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        // Obtiene el valor del encabezado de autorización de la solicitud HTTP.
        String header = request.getHeader(HEADER_AUTHORIZATION);

        // Si el encabezado es nulo o no empieza con el prefijo esperado, se continúa con la cadena de filtros sin autenticar.
        if (header == null || !header.startsWith(PREFIX_TOKEN)) {
            chain.doFilter(request, response);
            return;
        }

        // Elimina el prefijo del token para obtener el token puro.
        String token = header.replace(PREFIX_TOKEN, "");
        try {
            // Analiza y verifica el token usando la clave secreta. Obtiene los reclamos (claims) del token.
            Claims claims = Jwts.parser().verifyWith(SECRET_KEY).build().parseSignedClaims(token).getPayload();
            
            // Obtiene el sujeto (email) del token.
            String email = claims.getSubject();

            // Obtiene las autoridades (roles) del token.
            Object authoritiesClaims = claims.get("authorities");

            // Convierte las autoridades a una colección de objetos GrantedAuthority.
            Collection<? extends GrantedAuthority> roles = Arrays.asList(new ObjectMapper()
            .addMixIn(SimpleGrantedAuthority.class, SimpleGrantedAuthorityJsonCreator.class)
                    .readValue(authoritiesClaims.toString().getBytes(), SimpleGrantedAuthority[].class));

            // Crea un token de autenticación con el nombre de usuario y las autoridades.
            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(email, null, 
                    roles);
            
            // Establece el contexto de seguridad con el token de autenticación.
            SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            
            // Continúa con la cadena de filtros.
            chain.doFilter(request, response);

        } catch (JwtException e) {
            // Maneja la excepción en caso de que el token sea inválido.
            Map<String, String> body = new HashMap<>();
            body.put("error", e.getMessage());
            body.put("message", "El token es invalido!");

            // Escribe la respuesta de error en formato JSON.
            response.getWriter().write(new ObjectMapper().writeValueAsString(body));
            response.setStatus(401); // Establece el estado HTTP a 401 (No autorizado).
            response.setContentType(CONTENT_TYPE); // Establece el tipo de contenido de la respuesta.
        }
    }
}

