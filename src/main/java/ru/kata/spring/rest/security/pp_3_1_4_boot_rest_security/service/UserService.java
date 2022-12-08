package ru.kata.spring.rest.security.pp_3_1_4_boot_rest_security.service;

import ru.kata.spring.rest.security.pp_3_1_4_boot_rest_security.entity.User;

import java.util.List;

public interface UserService {
    List<User> allUsers();

    void add(User user);

    void delete(Long id);

    void edit(User user);

    User getById(Long id);

    User findByEmail(String email);
}