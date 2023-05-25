package com.backend.plogging.dto.response.road;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class CourseImgPageResponseDto {
    private long totalElements;
    private List<CourseImgResponseDto> courseImages;
}
