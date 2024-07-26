package com.backend.system.restaurant.auth;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * Esta clase abstracta es utilizada por Jackson para deserializar JSON en objetos 
 * de tipo SimpleGrantedAuthority, que representan las autoridades (roles) de usuario 
 * en Spring Security.
 */
public abstract class SimpleGrantedAuthorityJsonCreator {

    /**
     * Constructor anotado con @JsonCreator y @JsonProperty para indicar a Jackson 
     * cómo deserializar el campo 'authority' del JSON en un objeto SimpleGrantedAuthority.
     */
    @JsonCreator
    public SimpleGrantedAuthorityJsonCreator(@JsonProperty("authority") String role){}
}

