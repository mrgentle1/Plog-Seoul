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

    // @NotNull
    // User 구현 후 NotNull 처리
    @ApiModelProperty(hidden = true)
    private User user;

    private Float distance;
    private Float startLat;
    private Float startLng;
    private Float endLat;
    private Float endLng;
    private Float runningTime;

}
