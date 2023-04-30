package com.backend.plogging.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Entity
public class RouteData extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long routeId;

    @Column(name = "city")  // 자치구
    private String city;

    @Column(name = "name")  // 명칭
    private String name;

    @Column(name = "category")  // 코스 대분류
    private String category;

    @Column(name = "distance")  // 거리
    private Float distance;

    @Column(name = "duration")  // 소요시간
    private String duration;

    @Column(name = "course_detail")  // 상세코스
    private String courseDetail;

    @Column(columnDefinition = "TEXT", name = "description")  // 코스 설명
    private String description;

    @Column(name = "difficulty")
    private String difficulty;


    // reviews for this route
    @OneToMany(mappedBy = "routeData", orphanRemoval = true)
    private List<Review> reviews;
}
