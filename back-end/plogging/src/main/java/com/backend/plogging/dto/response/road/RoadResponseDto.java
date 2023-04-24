package com.backend.plogging.dto.response.road;

import com.backend.plogging.domain.RouteData;
import com.backend.plogging.repository.ReviewRepository;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RoadResponseDto {
    private Long routeId;
    private String location;
    private String name;
    private Float distance;
    private Float duration;

    private Integer reviewCnt;
    private Float reviewSum;

    public RoadResponseDto(RouteData routeData) {
        this.routeId = routeData.getRouteId();
        this.location = routeData.getLocation();
        this.name = routeData.getName();
        this.distance = routeData.getDistance();
        this.duration = routeData.getDuration();
    }

    public void setReviewCntAndSum(ReviewRepository reviewRepository) {
        this.reviewCnt = reviewRepository.countByRouteDataRouteId(this.routeId);
        this.reviewSum = reviewRepository.sumStarByRouteId(this.routeId);
        if (this.reviewSum == null) {
            this.reviewSum = Float.valueOf(0);
        }
    }
}
