package ru.kata.spring.rest.security.pp_3_1_4_boot_rest_security.util;

import org.springframework.stereotype.Component;
import ru.kata.spring.rest.security.pp_3_1_4_boot_rest_security.entity.Role;
import ru.kata.spring.rest.security.pp_3_1_4_boot_rest_security.entity.User;
import ru.kata.spring.rest.security.pp_3_1_4_boot_rest_security.service.RoleService;
import ru.kata.spring.rest.security.pp_3_1_4_boot_rest_security.service.UserService;

import javax.annotation.PostConstruct;
import java.util.HashSet;
import java.util.Set;

@Component
public class Init {

    private final UserService userService;
    private final RoleService roleService;

    public Init(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @PostConstruct
    public void initUser() {
        Role roleAdmin = new Role("ROLE_ADMIN");
        Role roleUser = new Role("ROLE_USER");
        roleService.addRole(roleAdmin);
        roleService.addRole(roleUser);

        Set<Role> adminSet = new HashSet<>();
        Set<Role> userSet = new HashSet<>();
        adminSet.add(roleAdmin);
        userSet.add(roleUser);

        User admin = new User("admin@mail.ru", "admin", "Sergey", "Sergeev", (byte) 25, adminSet);
        User user = new User("user@mail.ru", "user", "Ivan", "Ivanov", (byte) 22, userSet);

        userService.add(admin);
        userService.add(user);
    }
}