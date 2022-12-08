package ru.kata.spring.rest.security.pp_3_1_4_boot_rest_security.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.rest.security.pp_3_1_4_boot_rest_security.entity.Role;
import ru.kata.spring.rest.security.pp_3_1_4_boot_rest_security.entity.User;
import ru.kata.spring.rest.security.pp_3_1_4_boot_rest_security.service.RoleService;
import ru.kata.spring.rest.security.pp_3_1_4_boot_rest_security.service.UserService;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api")
public class AdminController {
    private final UserService userService;
    private final RoleService roleService;

    public AdminController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> allUsers() {
        List<User> users = userService.allUsers();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @PatchMapping("/users/{id}")
    public ResponseEntity<User> editUser(@RequestBody User user) {
        userService.edit(user);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/users")
    public ResponseEntity<User> addUser(@RequestBody User user) {
        userService.add(user);
        return new ResponseEntity<>(user, HttpStatus.CREATED);
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<User> deleteUser(@PathVariable Long id) {
        userService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        User user = userService.getById(id);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @GetMapping("/roles/{id}")
    ResponseEntity<Role> getRoleById(@PathVariable("id") Long id) {
        return new ResponseEntity<>(roleService.findById(id), HttpStatus.OK);
    }

    @GetMapping("/roles")
    public ResponseEntity<Set<Role>> allRoles() {
        return new ResponseEntity<>(roleService.AllRoles(), HttpStatus.OK);
    }

    @GetMapping("/user")
    public ResponseEntity<User> userPage(Authentication auth) {
        return new ResponseEntity<>((User) auth.getPrincipal(), HttpStatus.OK);
    }
}