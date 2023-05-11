package com.backend.plogging.dto.request.road;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReviewRequestDto {
    private String content;
    private Float star;
}
