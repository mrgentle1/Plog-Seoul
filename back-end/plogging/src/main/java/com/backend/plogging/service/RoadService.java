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

        Optional<Review> optionalReview = reviewRepository.findByUserAndRouteData(user, routeData);
        if (optionalReview.isPresent()) {
            return new BaseResponseEntity<>(HttpStatus.BAD_REQUEST, "이미 작성한 리뷰가 있습니다.");
        }

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

    public BaseResponseEntity<?> updateReview(Long reviewId, ReviewRequestDto dto) {
        Optional<Review> reviewOptional = reviewRepository.findById(reviewId);
        if (!reviewOptional.isPresent()) {
            return new BaseResponseEntity<>(HttpStatus.BAD_REQUEST, "해당 리뷰를 찾을 수 없습니다.");
        }

        Review review = reviewOptional.get();
        review.setContentAndStar(dto.getContent(), dto.getStar());

        try {
            reviewRepository.save(review);
            return new BaseResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new BaseResponseEntity<>(e);
        }
    }

    public BaseResponseEntity<?> deleteReview(Long reviewId) {
        Optional<Review> reviewOptional = reviewRepository.findById(reviewId);
        if (!reviewOptional.isPresent()) {
            return new BaseResponseEntity<>(HttpStatus.BAD_REQUEST, "해당 리뷰를 찾을 수 없습니다.");
        }

        try {
            reviewRepository.delete(reviewOptional.get());
            return new BaseResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new BaseResponseEntity<>(e);
        }
    }
}
