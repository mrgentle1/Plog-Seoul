package com.backend.plogging.dto.response.plogging;

import com.backend.plogging.domain.Image;
import com.backend.plogging.domain.PloggingRecord;
import com.backend.plogging.domain.User;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

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

    private List<ImageResponseDto> images;

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
        if (record.getImages() != null) {
            this.images = record.getImages().stream()
                    .map(image -> new ImageResponseDto(image))
                    .collect(Collectors.toList());
        } else {
            this.images = new ArrayList<>();
        }
        this.createdAt = record.getCreatedAt();
    }
}
