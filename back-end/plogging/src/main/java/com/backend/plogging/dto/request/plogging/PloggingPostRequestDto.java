package com.backend.plogging.dto.request.plogging;

import com.backend.plogging.domain.User;
import com.sun.istack.NotNull;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;

@Getter
@Setter
public class PloggingPostRequestDto {

    private Float distance;
    private Double startLat;
    private Double startLng;
    private Double endLat;
    private Double endLng;
    private Float runningTime;

}
