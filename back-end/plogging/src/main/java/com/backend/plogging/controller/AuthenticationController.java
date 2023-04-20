package com.backend.plogging.controller;

import com.backend.plogging.base.BaseResponseEntity;
import com.backend.plogging.domain.User;
import com.backend.plogging.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.security.Principal;
import java.util.Optional;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {

    private final UserService userService;

    @Value("${kakao.uri}")
    private String uri;

    @GetMapping("/login")
    public void kakaoRegistration(HttpServletResponse response) throws IOException {
        response.sendRedirect(uri);
    }

    @GetMapping("/kakao")
    public BaseResponseEntity<?> kakaoCallback(@RequestParam String code) {
        BaseResponseEntity response;

        String accessToken = userService.getKakaoAccessToken(code);
        Optional<User> user = userService.getKakaoUser(accessToken);

        if (user.isPresent()) {
            // User가 있다면, login
            response = userService.login(user.get());
        } else {
            // User가 없다면, registration
            response = userService.createKakaoUser(accessToken);
        }

        return response;
    }

    @PostMapping("/registration")
    public BaseResponseEntity<?> registerNickname(@RequestBody String nickname,
                                                  Principal principal) {
        BaseResponseEntity response = userService.updateNickname(nickname, principal.getName());
        return response;
    }

    @GetMapping("/me")
    public BaseResponseEntity<?> getMyInfo(Principal principal) {
        BaseResponseEntity response = userService.getUserByEmail(principal.getName());
        System.out.println("principal.getName() = " + principal.getName());

        return response;
    }


}
