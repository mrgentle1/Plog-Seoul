package com.backend.plogging.dto.response.road;

import com.backend.plogging.domain.RouteData;
import com.backend.plogging.repository.ReviewRepository;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RoadResponseDto {
    private Long routeId;
    private String city;
    private String name;
    private String category;
    private Float distance;
    private String duration;
    private String courseDetail;
    private String description;
    private String difficulty;

    private Integer reviewCnt;
    private Float reviewSum;

    public RoadResponseDto(RouteData routeData) {
        this.routeId = routeData.getRouteId();
        this.city = routeData.getCity();
        this.name = routeData.getName();
        this.category = routeData.getCategory();
        this.distance = routeData.getDistance();
        this.duration = routeData.getDuration();
        this.courseDetail = routeData.getCourseDetail();
        this.description = routeData.getDescription();
        this.difficulty = routeData.getDifficulty();
    }

    public void setReviewCntAndSum(ReviewRepository reviewRepository) {
        this.reviewCnt = reviewRepository.countByRouteDataRouteId(this.routeId);
        this.reviewSum = reviewRepository.sumStarByRouteId(this.routeId);
        if (this.reviewSum == null) {
            this.reviewSum = Float.valueOf(0);
        }
    }
}
