package com.backend.plogging.service;

import com.backend.plogging.base.BaseResponseEntity;
import com.backend.plogging.domain.RouteData;
import com.backend.plogging.dto.response.road.RoadResponseDto;
import com.backend.plogging.repository.ReviewRepository;
import com.backend.plogging.repository.RouteDataRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

@RequiredArgsConstructor
@Service
public class RoadService {

    private final RouteDataRepository routeDataRepository;
    private final ReviewRepository reviewRepository;

    public BaseResponseEntity<?> getAllRoads(int pagingIndex, int pagingSize) {
        Pageable pageable = PageRequest.of(pagingIndex, pagingSize);
        Page<RouteData> routes = routeDataRepository.findAll(pageable);
        Page<RoadResponseDto> roadResponses = routes.map(RoadResponseDto::new);
        roadResponses.forEach(road -> road.setReviewCntAndSum(reviewRepository));
        return new BaseResponseEntity<>(HttpStatus.OK, roadResponses);
    }

    public BaseResponseEntity<?> getRoad(Long roadId) {
        return null;
    }

    public BaseResponseEntity<?> createReview(Long roadId) {
        return null;
    }

    public BaseResponseEntity<?> getAllReviews(Long roadId) {
        return null;
    }

    public BaseResponseEntity<?> updateReview(Long roadId, Long reviewId) {
        return null;
    }

    public BaseResponseEntity<?> deleteReview(Long roadId, Long reviewId) {
        return null;
    }
}
