package ru.kata.spring.rest.security.pp_3_1_4_boot_rest_security.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.kata.spring.rest.security.pp_3_1_4_boot_rest_security.entity.Role;
import ru.kata.spring.rest.security.pp_3_1_4_boot_rest_security.repository.RoleRepository;

import java.util.HashSet;
import java.util.Set;

@Service
public class RoleServiceImpl implements RoleService {

    private final RoleRepository roleRepository;

    public RoleServiceImpl(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    public Set<Role> AllRoles() {
        return new HashSet<>(roleRepository.findAll());
    }

    @Override
    @Transactional
    public void addRole(Role role) {
        roleRepository.save(role);
    }

    @Override
    public Role findById(Long id) {
        return roleRepository.findById(id).orElse(null);
    }
}