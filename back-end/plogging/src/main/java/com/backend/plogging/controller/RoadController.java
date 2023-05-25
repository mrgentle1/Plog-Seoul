package com.backend.plogging.controller;

import com.backend.plogging.base.BaseResponseEntity;
import com.backend.plogging.dto.request.road.ReviewRequestDto;
import com.backend.plogging.service.RoadService;
import com.backend.plogging.service.firebase.FirebaseService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/roads")
public class RoadController {

    private final RoadService roadService;
    private final FirebaseService firebaseService;

    @GetMapping("")
    public BaseResponseEntity<?> getAllRoads(
            @RequestParam(value = "pagingIndex", defaultValue = "0") int pagingIndex,
            @RequestParam(value = "pagingSize", defaultValue = "50") int pagingSize) {
        BaseResponseEntity response = roadService.getAllRoads(pagingIndex, pagingSize);
        return response;
    }

    @GetMapping("/recommended")
    public BaseResponseEntity<?> getRecommendedRoads() {
        BaseResponseEntity response = roadService.getRecommendedRoads();
        return response;
    }

    @GetMapping("/{roadId}")
    public BaseResponseEntity<?> getRoad(@PathVariable Long roadId) {
        BaseResponseEntity response = roadService.getRoadById(roadId);
        return response;
    }

    @PostMapping("/{roadId}/reviews")
    public BaseResponseEntity<?> createReview(@PathVariable Long roadId,
                                              @RequestBody ReviewRequestDto dto, Principal principal) {
        BaseResponseEntity response = roadService.createReview(roadId, dto, principal.getName());
        return response;
    }

    @GetMapping("/{roadId}/reviews")
    public BaseResponseEntity<?> getAllReviews(@PathVariable Long roadId,
                                               @RequestParam(value = "pagingIndex", defaultValue = "0") int pagingIndex,
                                               @RequestParam(value = "pagingSize", defaultValue = "50") int pagingSize) {
        BaseResponseEntity response = roadService.getAllReviews(roadId, pagingIndex, pagingSize);
        return response;
    }

    @PutMapping("/{roadId}/reviews/{reviewId}")
    public BaseResponseEntity<?> updateReview(@PathVariable Long roadId,
                                              @PathVariable Long reviewId, @RequestBody ReviewRequestDto dto) {
        BaseResponseEntity response = roadService.updateReview(reviewId, dto);
        return response;
    }

    @DeleteMapping("/{roadId}/reviews/{reviewId}")
    public BaseResponseEntity<?> deleteReview(@PathVariable Long roadId, @PathVariable Long reviewId) {
        BaseResponseEntity response = roadService.deleteReview(reviewId);
        return response;
    }

    @GetMapping("/images")
    public BaseResponseEntity<?> getCourseImages(@RequestParam(required = false) String category) {
        BaseResponseEntity response = firebaseService.getCourseImages(category);
        return response;
    }
}
