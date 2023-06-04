package com.backend.plogging.dto.request.user;

import com.backend.plogging.domain.User;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class KakaoUserDto {

    private String email;
    private String name;
    private String profileImage;
    private String gender;

    public User toEntity() {
        User user = User.builder()
                .email(this.email)
                .name(this.name)
                .profileImage(this.profileImage)
                .gender(this.gender)
                .level(1)
                .point(0)
                .totalPoint(0)
                .isFirst(true)
                .role("USER").build();

        return user;
    }
}
