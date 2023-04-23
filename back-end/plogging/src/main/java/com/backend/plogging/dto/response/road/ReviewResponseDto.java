package com.backend.plogging.dto.response.road;

import com.backend.plogging.domain.Review;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class ReviewResponseDto {
    private Long userId;
    private String userNickname;

    private Long reviewId;
    private String content;
    private Float star;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public ReviewResponseDto(Review review) {
        this.userId = review.getUser().getUserId();
        this.userNickname = review.getUser().getNickname();
        this.reviewId = review.getReviewId();
        this.content = review.getContent();
        this.star = review.getStar();
        this.createdAt = review.getCreatedAt();
        this.updatedAt = review.getUpdatedAt();
    }
}
