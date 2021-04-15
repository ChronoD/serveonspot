package com.example.serveonspot.entities;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.Collection;

@Data
@Entity
@NoArgsConstructor
public class AppUser implements UserDetails {

    @Id
    private Long appUserId;
    private String appUsername;
    private String appUserPassword;
    private String role;

    public AppUser(Long appUserId, String appUsername, String appUserPassword, String role) {
        this.appUserId = appUserId;
        this.appUsername = appUsername;
        this.appUserPassword = appUserPassword;
        this.role = role;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return AuthorityUtils.createAuthorityList(role);
    }

    @Override
    public String getPassword() {
        return appUserPassword;
    }

    @Override
    public String getUsername() {
        return appUsername;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public String toString() {
        return String.valueOf(appUserId);
    }
}
