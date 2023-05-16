package com.backend.plogging.dto.response.user;

import com.backend.plogging.domain.Point;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.time.LocalDateTime;

@ToString
@Getter
@Builder
@AllArgsConstructor
public class PointResponseDto {
    private Long pointId;
    private Integer changePoint;
    private String title;
    private String type;
    private LocalDateTime createdAt;

    public PointResponseDto(Point point) {
        this.pointId = point.getPointId();
        this.changePoint = point.getChangePoint();
        this.title = point.getTitle();
        this.type = point.getType();
        this.createdAt = point.getCreatedAt();
    }
}
