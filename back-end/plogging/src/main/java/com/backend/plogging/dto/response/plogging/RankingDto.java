package com.backend.plogging.dto.response.plogging;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RankingDto {

    private int rank;
    private Long userId;
    private String nickname;
    private Integer level;
    private Float totalDistance;
    private Float totalRunningTime;

    public RankingDto(int rank, Long userId, String nickname, Integer level, Float totalDistance, Float totalRunningTime) {
        this.rank = rank;
        this.userId = userId;
        this.nickname = nickname;
        this.level = level;
        this.totalDistance = totalDistance;
        this.totalRunningTime = totalRunningTime;
    }

}
