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

    @Column(name = "location")
    private String location;

    @Column(name = "name")
    private String name;

    @Column(name = "distance")
    private Float distance;

    @Column(name = "duration")
    private Float duration;


    // reviews for this route
    @OneToMany(mappedBy = "routeData", orphanRemoval = true)
    private List<Review> reviews;
}
