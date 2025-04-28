package com.example.trueviewsys.service;

import com.example.trueviewsys.dto.ProfileDto;
import org.springframework.web.multipart.MultipartFile;

public interface ProfileService {
    ProfileDto getCurrentUserProfile();
    ProfileDto updateCurrentUserProfile(ProfileDto profileDto);
    void updatePassword(String currentPassword, String newPassword);
    void updateProfilePicture(MultipartFile file);
    void deleteProfilePicture();
}