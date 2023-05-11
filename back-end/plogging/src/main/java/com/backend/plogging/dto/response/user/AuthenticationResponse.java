package com.backend.plogging.dto.response.user;

import com.backend.plogging.domain.User;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@ToString
@Getter
@Builder
@AllArgsConstructor
public class AuthenticationResponse {

    private final String jwt;

    @JsonProperty("user_info")
    private final UserResponseDto userResponseDto;

    public AuthenticationResponse(String jwt, User user) {
        this.jwt = jwt;
        this.userResponseDto = new UserResponseDto(user);
    }
}
