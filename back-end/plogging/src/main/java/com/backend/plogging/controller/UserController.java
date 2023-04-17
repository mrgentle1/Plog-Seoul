package com.backend.plogging.controller;

import com.backend.plogging.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/auth")
public class UserController {

    private final UserService userService;

    @GetMapping("/kakao")
    public void kakaoCallback(@RequestParam String code) {
        System.out.println("kakaoCallback()");
        System.out.println(code);

        String accessToken = userService.getKakaoAccessToken(code);
        userService.createKakaoUser(accessToken);
    }
}
