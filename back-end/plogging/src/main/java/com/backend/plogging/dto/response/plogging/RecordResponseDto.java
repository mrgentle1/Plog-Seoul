package com.backend.plogging.dto.response.plogging;

import com.backend.plogging.domain.PloggingRecord;
import com.backend.plogging.domain.User;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class RecordResponseDto {

    private Long userId;
    private String userName;

    private Long recordId;
    private Float distance;
    private Float startLat;
    private Float startLng;
    private Float endLat;
    private Float endLng;
    private Float runningTime;
    private Integer kcal;

    private LocalDateTime createdAt;

    public RecordResponseDto(PloggingRecord record) {
        this.userId = record.getUser().getUserId();
        this.userName = record.getUser().getName();
        this.recordId = record.getRecordId();
        this.distance = record.getDistance();
        this.startLat = record.getStartLat();
        this.startLng = record.getStartLng();
        this.endLat = record.getEndLat();
        this.endLng = record.getEndLng();
        this.runningTime = record.getRunningTime();
        this.kcal = record.getKcal();
        this.createdAt = record.getCreatedAt();
    }
}
