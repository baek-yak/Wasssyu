package com.wassu.wassu.repository.touristspot;

import com.wassu.wassu.entity.touristspot.TouristSpotEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface TouristSpotRepository extends JpaRepository<TouristSpotEntity, Long> {

    @Query("select ts from TouristSpotEntity ts " +
            "join fetch ts.touristSpotTags tt " +
            "join fetch ts.touristSpotImages ti " +
            "join fetch ts.reviews tr " +
            "where ts.elasticId=:id")
    Optional<TouristSpotEntity> findDetailById(String id);

}