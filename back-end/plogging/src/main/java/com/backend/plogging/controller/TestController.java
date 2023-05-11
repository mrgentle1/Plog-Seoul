package com.backend.plogging.controller;

import com.backend.plogging.base.BaseResponseEntity;
import com.backend.plogging.domain.User;
import com.backend.plogging.repository.UserRepository;
import com.backend.plogging.service.UserDetailsServiceImpl;
import com.backend.plogging.service.UserService;
import com.backend.plogging.util.JwtUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/tests")
public class TestController {

    private final UserRepository userRepository;
    private final UserService userService;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @Autowired
    private JwtUtils jwtUtils;

    @GetMapping("/user")
    public BaseResponseEntity<?> getTestUser() {
       Optional<User> user = userRepository.findByName("Test User");
       if (!user.isPresent()) {
           User testUser = User.builder()
                   .email("test@test.com")
                   .name("Test User")
                   .profileImage("https://example.com/test.jpg")
                   .nickname("testuser")
                   .gender("male")
                   .point(100)
                   .level(1)
                   .role("user")
                   .isFirst(true)
                   .build();

           user = Optional.ofNullable(testUser);
           userRepository.save(testUser);
       }

        BaseResponseEntity response = userService.login(user.get());
        return response;
    }
}
