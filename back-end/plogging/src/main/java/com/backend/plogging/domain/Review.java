package com.backend.plogging.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Entity
public class Review extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reviewId;

    @Column(name = "content")
    private String content;

    @Column(name = "star")
    private Float star;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "route_id")
    private RouteData routeData;

}
