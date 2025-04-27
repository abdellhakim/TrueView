package com.example.trueviewsys.controller;

import com.example.trueviewsys.dto.PasswordChangeDto;
import com.example.trueviewsys.dto.ProfileDto;
import com.example.trueviewsys.service.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/user/profile")
@RequiredArgsConstructor
public class ProfileController {

    private final ProfileService profileService;

    @GetMapping
    public ResponseEntity<ProfileDto> getProfile() {
        return ResponseEntity.ok(profileService.getCurrentUserProfile());
    }

    @PutMapping
    public ResponseEntity<ProfileDto> updateProfile(@RequestBody ProfileDto profileDto) {
        return ResponseEntity.ok(profileService.updateCurrentUserProfile(profileDto));
    }

    @PutMapping("/password")
    public ResponseEntity<String> updatePassword(@RequestBody PasswordChangeDto passwordChangeDto) {
        try {
            profileService.updatePassword(passwordChangeDto.getCurrentPassword(), passwordChangeDto.getNewPassword());
            return ResponseEntity.ok("Password updated successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/picture")
    public ResponseEntity<String> updateProfilePicture(@RequestParam("profilePicture") MultipartFile file) {
        try {
            profileService.updateProfilePicture(file);
            return ResponseEntity.ok("Profile picture updated successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/picture")
    public ResponseEntity<String> deleteProfilePicture() {
        try {
            profileService.deleteProfilePicture();
            return ResponseEntity.ok("Profile picture deleted successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }






}