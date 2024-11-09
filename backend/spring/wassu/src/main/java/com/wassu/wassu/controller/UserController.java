package com.wassu.wassu.controller;

import com.wassu.wassu.dto.user.UserProfileDTO;
import com.wassu.wassu.dto.user.UserProfileUpdateDTO;
import com.wassu.wassu.dto.user.UserPasswordUpdateDTO;
import com.wassu.wassu.service.user.UserService;
import com.wassu.wassu.security.JwtUtil;
import com.wassu.wassu.repository.UserRepository;
import com.wassu.wassu.util.UtilTool;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

@RestController
@RequestMapping("/wassu/user")
@AllArgsConstructor
@Slf4j
public class UserController {
    private final UserService userService;
    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;
    private final UtilTool utilTool;


    // 사용자 정보 조회
    @GetMapping("/profile")
    public Optional<UserProfileDTO> getProfile(@RequestHeader(value="Authorization") String accessToken) {
        String token = accessToken.replace("Bearer ", "");
        String userEmail = jwtUtil.extractUserEmail(token);
        if (userRepository.findByEmail(userEmail).isPresent()) {
            return userService.findUserByEmail(userEmail);
        }
        log.info("User not found: {}", userEmail);
        return Optional.empty();
    }

    // 사용자 정보 수정
    @PutMapping(value = "/profile/edit", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> editProfile(
            @RequestHeader(value="Authorization") String accessToken,
            @RequestPart("UserProfileUpdateDTO") UserProfileUpdateDTO userProfileUpdateDTO,
            @RequestPart(value="file", required = false) MultipartFile file
    ) {
        String token = accessToken.replace("Bearer ", "");
        String userEmail = jwtUtil.extractUserEmail(token);
        if (userRepository.findByEmail(userEmail).isPresent()) {
            userService.updateUser(userEmail, userProfileUpdateDTO, file);
            log.info("User profile updated: {}", userEmail);
            return ResponseEntity.ok(utilTool.createResponse("status", "success"));
        }
        log.info("User not found: {}", userEmail);
        return ResponseEntity.status(404).body(utilTool.createResponse("status", "failed"));
    }

    // 사용자 비밀번호 수정
    @PutMapping("/change-password")
    public ResponseEntity<?> updatePassword(@RequestHeader(value="Authorization") String accessToken, @RequestBody UserPasswordUpdateDTO userPasswordUpdateDTO) {
        String token = accessToken.replace("Bearer ", "");
        String userEmail = jwtUtil.extractUserEmail(token);
        if (userRepository.findByEmail(userEmail).isPresent()) {
            Boolean updated = userService.updateUserPassword(userEmail, userPasswordUpdateDTO);
            if (updated){
                return ResponseEntity.ok(utilTool.createResponse("status", "success"));
            } else {
                return ResponseEntity.status(404).body(utilTool.createResponse("status", "failed"));
            }
        }
        log.error("User not found while change password: {}", userEmail);
        return ResponseEntity.status(404).body(utilTool.createResponse("status", "failed"));
    }
}