package com.backend.plogging.dto.request.plogging;

import com.backend.plogging.domain.Image;
import lombok.*;

@ToString
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ImageRequestDto {
    private String imageUrl;
    private Float imgLat;
    private Float imgLng;

    public ImageRequestDto(Image image) {
        this.imageUrl = image.getImgUrl();
        this.imgLat = image.getImgLat();
        this.imgLng = image.getImgLng();
    }
}
