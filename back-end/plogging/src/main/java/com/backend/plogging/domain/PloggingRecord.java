package com.backend.plogging.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Entity
public class PloggingRecord {

    // 플로깅 기록

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long recordId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "distance")
    private Float distance;

    @Column(name = "start_lat")
    private Float startLat;

    @Column(name = "start_lng")
    private Float startLng;

    @Column(name = "end_lat")
    private Float endLat;

    @Column(name = "end_lng")
    private Float endLng;

    @Column(name = "running_time")
    private Float runningTime;


    // photos for this plogging record
    @OneToMany(mappedBy = "ploggingRecord", orphanRemoval = true)
    private List<Image> images;

    // paths for this plogging record
    @OneToMany(mappedBy = "ploggingRecord", orphanRemoval = true)
    private List<Path> paths;

}
