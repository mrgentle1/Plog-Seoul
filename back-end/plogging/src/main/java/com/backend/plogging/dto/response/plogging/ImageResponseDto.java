package com.backend.plogging.dto.response.plogging;

import com.backend.plogging.domain.Image;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class ImageResponseDto {
    private Long imageId;
    private Long recordId;
    private String imgUrl;
    private LocalDateTime createdAt;
    private Double imgLat;
    private Double imgLng;

    public ImageResponseDto(Image image) {
        this.imageId = image.getImageId();
        this.recordId = image.getPloggingRecord().getRecordId();
        this.imgUrl = image.getImgUrl();
        this.createdAt = image.getCreatedAt();
        this.imgLat = image.getImgLat();
        this.imgLng = image.getImgLng();
    }
}
