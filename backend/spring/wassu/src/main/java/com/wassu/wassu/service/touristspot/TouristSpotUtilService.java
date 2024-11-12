package com.wassu.wassu.service.touristspot;

import com.wassu.wassu.entity.UserEntity;
import com.wassu.wassu.entity.review.ReviewEntity;
import com.wassu.wassu.entity.touristspot.TouristSpotEntity;
import com.wassu.wassu.entity.touristspot.TouristSpotStampEntity;
import com.wassu.wassu.exception.CustomErrorCode;
import com.wassu.wassu.exception.CustomException;
import com.wassu.wassu.repository.UserRepository;
import com.wassu.wassu.repository.review.ReviewRepository;
import com.wassu.wassu.repository.touristspot.TouristSpotRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Optional;


@Service
@Slf4j
@AllArgsConstructor
public class TouristSpotUtilService {

    private final TouristSpotRepository touristSpotRepository;
    private final ReviewRepository reviewRepository;
    private UserRepository userRepository;

    public Boolean isStamped(
            Long touristSpotId,
            String userEmail
    ) {
        if (userEmail != null && !userEmail.trim().isEmpty()) {
            Optional<UserEntity> optionalUser = userRepository.findByEmail(userEmail);
            if (optionalUser.isPresent()) {
                UserEntity userEntity = optionalUser.get();
                List<TouristSpotStampEntity> stampList = userEntity.getTouristSpotStamp();
                if (stampList != null && !stampList.isEmpty()) {
                    boolean containsId = stampList.stream()
                            .anyMatch(stamp -> stamp.getTouristSpotId().equals(touristSpotId));
                    if (containsId) {
                        log.info("Stamped tourist spot: {}", touristSpotId);
                        return true;
                    }
                }
            } else {
                log.warn("User with email {} not found", userEmail);
            }
        }
        return false;
    }

    public void matchingWithSpotAndIsStamped(
            Page<Map<String, Object>> response,
            String userEmail
    ) throws IOException {
        try {
            List<Map<String, Object>> resultList = response.getContent();
            System.out.println("Start to Match result and isStamped");
            for (Map<String, Object> result : resultList) {
                String elasticSpotId = (String) result.get("id");
                log.info("Elastic Id : {}", elasticSpotId);
                Optional<TouristSpotEntity> touristSpot =  touristSpotRepository.findByElasticId(elasticSpotId);
                if (touristSpot.isPresent()) {
                    Long touristSplotId = touristSpot.get().getId();
                    Boolean isStamped = isStamped(touristSplotId, userEmail);
                    Integer reviewCount = totalReviewCount(touristSplotId);
                    result.put("isStamped", isStamped);
                    result.put("reviewCount", reviewCount);
                } else {
                    log.warn("Elastic Id doesn't matched with postgres: {}", elasticSpotId);
                }
            }
            log.info("End to Match result and isStamped");

        } catch (Exception e){
            log.error("Exception in MatchingWithSpotAndIsStamped", e);
            throw new CustomException(CustomErrorCode.FAILED_TO_MATCHING_WITH_TOURIST_SPOT_AND_ISMATCHED);
        }
    }

    public Integer totalReviewCount(Long touristSpotId) {
        Optional<ReviewEntity> optionalReview = reviewRepository.findByIdWithJoin(touristSpotId);
        if (optionalReview.isPresent()) {
            Integer reviewCount = reviewRepository.countByTouristSpotId(touristSpotId);
            log.info("Review count : {}", reviewCount);
            return reviewCount;
        } else {
            log.warn("Review with id {} not found", touristSpotId);
            return 0;
        }
    }
}
