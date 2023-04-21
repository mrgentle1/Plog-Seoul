package com.backend.plogging.dto.response.user;

import com.backend.plogging.domain.User;
import lombok.*;

import java.time.LocalDateTime;

@ToString
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserResponseDto {

    private Long userId;
    private String email;
    private String name;
    private String profileImage;
    private String nickname;
    private String gender;
    private Integer point;
    private Integer level;
    private String role;
    private Boolean isFirst;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public UserResponseDto(User user) {
        this.userId = user.getUserId();
        this.email = user.getEmail();
        this.name = user.getName();
        this.profileImage = user.getProfileImage();
        this.nickname = user.getNickname();
        this.gender = user.getGender();
        this.point = user.getPoint();
        this.level = user.getLevel();
        this.role = user.getRole();
        this.isFirst = user.getIsFirst();
        this.createdAt = user.getCreatedAt();
        this.updatedAt = user.getUpdatedAt();
    }

}
