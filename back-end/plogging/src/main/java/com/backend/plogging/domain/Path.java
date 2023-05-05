package com.backend.plogging.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Entity
public class Path {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long pathId;

    @ManyToOne
    @JoinColumn(name = "record_id")
    private PloggingRecord ploggingRecord;

    @Column(name = "way_lat")
    private Float wayLat;

    @Column(name = "way_lng")
    private Float wayLng;

    @Column(name = "sequence")
    private Long sequence;

}
