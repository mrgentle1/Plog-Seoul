package com.backend.plogging.dto.request.plogging;

import com.backend.plogging.domain.Image;
import lombok.*;

@ToString
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ImageRequestDto {
    private Float imgLat;
    private Float imgLng;

    public ImageRequestDto(Image image) {
        this.imgLat = image.getImgLat();
        this.imgLng = image.getImgLng();
    }
}
