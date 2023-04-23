package com.backend.plogging.repository;

import com.backend.plogging.domain.Review;
import com.backend.plogging.domain.RouteData;
import com.backend.plogging.domain.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    @Query("SELECT SUM(b.star) FROM Review b WHERE b.routeData.routeId = :routeId")
    Float sumStarByRouteId(@Param("routeId") Long routeId);

    Integer countByRouteDataRouteId(Long routeId);

    Page<Review> findByRouteDataRouteId(Pageable pageable, Long routeId);
    
    // TODO: 이미 리뷰를 작성한 사람에 대한 처리
    Optional<Review> findByUserAndAndRouteData(User user, RouteData routeData);
}
