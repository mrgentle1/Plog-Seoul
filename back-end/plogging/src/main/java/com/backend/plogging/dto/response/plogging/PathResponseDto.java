package com.backend.plogging.dto.response.plogging;

import com.backend.plogging.domain.Path;
import com.backend.plogging.dto.request.plogging.PathRequestDto;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PathResponseDto {
    private Long pathId;
    private Long recordId;
    private Double wayLat;
    private Double wayLng;
    private Long sequence;

    public PathResponseDto(Path path) {
        this.pathId = path.getPathId();
        this.recordId = path.getPloggingRecord().getRecordId();
        this.wayLat = path.getWayLat();
        this.wayLng = path.getWayLng();
        this.sequence = path.getSequence();
    }
}
