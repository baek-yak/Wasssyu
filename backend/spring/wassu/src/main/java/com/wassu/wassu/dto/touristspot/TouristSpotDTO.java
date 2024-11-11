package com.wassu.wassu.dto.touristspot;

import com.wassu.wassu.dto.review.ReviewDTO;
import lombok.*;

import java.util.List;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TouristSpotDTO {

    private Long spotId;
    private String spotName;
    private String spotAddress;
    private Float rating;
    private Integer userRatingsTotal;
    private int favoritesCount;
    private int reviewCount;
    private boolean isFavorite;
    private String phone;
    private String businessHours;
    private String spotDescription;
    private Double latitude;
    private Double longitude;
    private List<TouristSpotTagDto> touristSpotTags;
    private List<TouristSpotImageDto> touristSpotImages;
    private List<ReviewDTO> reviews;

}
