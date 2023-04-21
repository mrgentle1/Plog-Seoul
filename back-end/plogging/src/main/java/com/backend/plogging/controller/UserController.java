package com.backend.plogging.controller;

import com.backend.plogging.base.BaseResponseEntity;
import com.backend.plogging.dto.response.user.UserResponseDto;
import com.backend.plogging.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    @GetMapping("")
    public BaseResponseEntity<Page<UserResponseDto>> getAllUsers(
            @RequestParam(value = "pagingIndex", defaultValue = "0") int pagingIndex,
            @RequestParam(value = "pagingSize", defaultValue = "50") int pagingSize) {
        BaseResponseEntity responses = userService.getAllUsers(pagingIndex, pagingSize);
        return responses;
    }

    @GetMapping("/{userId}")
    public BaseResponseEntity<UserResponseDto> getUser(@PathVariable Long userId) {
        BaseResponseEntity response = userService.getUserById(userId);
        return response;
    }

    @DeleteMapping("/{userId}")
    public BaseResponseEntity<?> deleteUser(@PathVariable Long userId) {
        BaseResponseEntity response = userService.deleteUserById(userId);
        return response;
    }

    @GetMapping("/{userId}/point")
    public BaseResponseEntity<?> getPoint(@PathVariable Long userId) {
        BaseResponseEntity response = userService.getPoint(userId);
        return response;
    }

    @PutMapping("/{userId}/point")
    public BaseResponseEntity<?> updatePoint(@PathVariable Long userId, @RequestParam int newPoint) {
        BaseResponseEntity response = userService.updatePoint(userId, newPoint);
        return response;
    }
}
