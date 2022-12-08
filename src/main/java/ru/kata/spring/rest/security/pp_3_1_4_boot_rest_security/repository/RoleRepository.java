package ru.kata.spring.rest.security.pp_3_1_4_boot_rest_security.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.kata.spring.rest.security.pp_3_1_4_boot_rest_security.entity.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
}