package com.wassu.wassu.controller;

import com.wassu.wassu.dto.touristspot.TouristSpotDTO;
import com.wassu.wassu.dto.touristspot.TouristSpotFavoriteDTO;
import com.wassu.wassu.dto.touristspot.TouristSpotSearchDTO;
import com.wassu.wassu.service.touristspot.TouristSpotSearchService;
import com.wassu.wassu.service.touristspot.TouristSpotService;
import com.wassu.wassu.util.UtilTool;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/wassu/tourist")
@RequiredArgsConstructor
@Slf4j
public class TouristSpotController {

    private final TouristSpotService touristSpotService;
    private final UtilTool utilTool;
    private final TouristSpotSearchService touristSpotSearchService;

    // 관광지 상세조회
    @GetMapping("/details/{spotId}")
    public ResponseEntity<?> getTouristSpotDetails(@AuthenticationPrincipal String userEmail,
                                                   @PathVariable String spotId) { // 엘라스틱 id
        TouristSpotDTO result = touristSpotService.getTouristSpotDetails(userEmail, spotId);
        return ResponseEntity.ok(result);
    }

    // 찜하기
    @PostMapping("/{spotId}/favorite")
    public ResponseEntity<?> touristSpotFavorite(@AuthenticationPrincipal String userEmail,
                                                 @PathVariable Long spotId) {
        TouristSpotFavoriteDTO result = touristSpotService.touristSpotFavorite(userEmail, spotId);
        return ResponseEntity.ok(result);
    }

    // 찜취소
    @DeleteMapping("/{spotId}/favorite")
    public ResponseEntity<?> touristSpotUnFavorite(@AuthenticationPrincipal String userEmail,
                                                   @PathVariable Long spotId) {
        TouristSpotFavoriteDTO result = touristSpotService.touristSpotUnfavorite(userEmail, spotId);
        return ResponseEntity.ok(result);
    }

    // 관광지 검색
    @GetMapping("/search")
    public ResponseEntity<?> touristSpotSearch(@RequestBody TouristSpotSearchDTO touristSpotSearchDTO, Pageable pageable) {
        try{
            Page<Map<String, Object>> response = touristSpotSearchService.searchByText(
                    touristSpotSearchDTO.getSearchText(), pageable
            );

            System.out.println("Search Completed --------------------");
            log.info("Search Complete");
            return ResponseEntity.ok(response);

        } catch(Exception e) {
            log.error("Exception occurred while searching for tourist spot", e);
            return ResponseEntity.status(500).body(utilTool.createResponse("status","failed"));
        }
    }

}
