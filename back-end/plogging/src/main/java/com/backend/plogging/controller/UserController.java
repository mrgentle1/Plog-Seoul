package com.backend.plogging.controller;

import com.backend.plogging.base.BaseResponseEntity;
import com.backend.plogging.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/auth")
public class UserController {

    private final UserService userService;

    @Value("${kakao.uri}")
    private String uri;

    @GetMapping("/registration")
    public void kakaoRegistration(HttpServletResponse response) throws IOException {
        response.sendRedirect(uri);
    }

    @GetMapping("/kakao")
    public BaseResponseEntity<?> kakaoCallback(@RequestParam String code) {
        String accessToken = userService.getKakaoAccessToken(code);
        BaseResponseEntity response = userService.createKakaoUser(accessToken);
        return response;
    }
}
