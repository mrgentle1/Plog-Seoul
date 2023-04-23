package com.backend.plogging.repository;

import com.backend.plogging.domain.Review;
import com.backend.plogging.domain.RouteData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    @Query("SELECT SUM(b.star) FROM Review b WHERE b.routeData.routeId = :routeId")
    Float sumStarByRouteId(@Param("routeId") Long routeId);

    Integer countByRouteDataRouteId(Long routeId);
}
