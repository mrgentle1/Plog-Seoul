package com.backend.plogging.service;

import com.backend.plogging.base.BaseResponseEntity;
import com.backend.plogging.domain.Review;
import com.backend.plogging.domain.RouteData;
import com.backend.plogging.domain.User;
import com.backend.plogging.dto.request.road.ReviewRequestDto;
import com.backend.plogging.dto.response.road.ReviewResponseDto;
import com.backend.plogging.dto.response.road.RoadResponseDto;
import com.backend.plogging.repository.ReviewRepository;
import com.backend.plogging.repository.RouteDataRepository;
import com.backend.plogging.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class RoadService {

    private final RouteDataRepository routeDataRepository;
    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;

    public BaseResponseEntity<?> getAllRoads(int pagingIndex, int pagingSize) {
        Pageable pageable = PageRequest.of(pagingIndex, pagingSize);
        Page<RouteData> routes = routeDataRepository.findAll(pageable);
        Page<RoadResponseDto> roadResponses = routes.map(RoadResponseDto::new);
        roadResponses.forEach(road -> road.setReviewCntAndSum(reviewRepository));
        return new BaseResponseEntity<>(HttpStatus.OK, roadResponses);
    }

    public BaseResponseEntity<?> getRoadById(Long roadId) {
        Optional<RouteData> routeData = routeDataRepository.findById(roadId);
        if (routeData.isPresent()) {
            RoadResponseDto responseDto = new RoadResponseDto(routeData.get());
            responseDto.setReviewCntAndSum(reviewRepository);
            return new BaseResponseEntity<>(HttpStatus.OK, responseDto);
        } else {
            return new BaseResponseEntity<>(HttpStatus.BAD_REQUEST, "해당 둘레길 id가 존재하지 않습니다.");
        }
    }

    public BaseResponseEntity<?> createReview(Long roadId, ReviewRequestDto dto, String email) {

        User user = userRepository.findByEmail(email).get();
        RouteData routeData = routeDataRepository.findById(roadId).get();

        Review review = Review.builder()
                .user(user)
                .content(dto.getContent())
                .star(dto.getStar())
                .routeData(routeData).build();

        try {
            this.reviewRepository.save(review);
            return new BaseResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new BaseResponseEntity<>(e);
        }
    }

    public BaseResponseEntity<?> getAllReviews(Long roadId, int pagingIndex, int pagingSize) {
        Pageable pageable = PageRequest.of(pagingIndex, pagingSize);
        Page<Review> reviews = reviewRepository.findByRouteDataRouteId(pageable, roadId);
        return new BaseResponseEntity<>(HttpStatus.OK, reviews.map(ReviewResponseDto::new));
    }

    public BaseResponseEntity<?> updateReview(Long roadId, Long reviewId) {
        return null;
    }

    public BaseResponseEntity<?> deleteReview(Long roadId, Long reviewId) {
        return null;
    }
}
