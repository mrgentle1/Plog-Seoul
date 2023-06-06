package com.backend.plogging.dto.response.plogging;

import com.backend.plogging.service.PloggingService;
import com.backend.plogging.service.PloggingService.RankingPeriod;
import com.backend.plogging.service.PloggingService.SortBy;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@Builder
public class RankingResponseDto {
    RankingPeriod period;
    LocalDate startDate;
    LocalDate endDate;
    SortBy sortBy;
    Long myRank;
    List<RankingDto> rankings;

    public RankingResponseDto(RankingPeriod period, LocalDate startDate, LocalDate endDate, SortBy sortBy, Long myRank, List<RankingDto> rankings) {
        this.period = period;
        this.startDate = startDate;
        this.endDate = endDate;
        this.sortBy = sortBy;
        this.myRank = myRank;
        this.rankings = rankings;
    }
}
