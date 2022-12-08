package ru.kata.spring.rest.security.pp_3_1_4_boot_rest_security.service;

import ru.kata.spring.rest.security.pp_3_1_4_boot_rest_security.entity.Role;

import java.util.Set;

public interface RoleService {

    Set<Role> AllRoles();

    void addRole(Role role);

    Role findById(Long id);
}