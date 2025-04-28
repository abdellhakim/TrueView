package com.example.trueviewsys.service;

import com.example.trueviewsys.dto.ProfileDto;
import com.example.trueviewsys.model.User;
import com.example.trueviewsys.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder; // Import PasswordEncoder
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDate;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProfileServiceImpl implements ProfileService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public ProfileDto getCurrentUserProfile() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return new ProfileDto(
                user.getUsername(),
                user.getEmail(),
                user.getDateOfBirth() != null ? user.getDateOfBirth().toString() : null,
                user.getProfilePictureUrl()
        );
    }

    @Override
    public ProfileDto updateCurrentUserProfile(ProfileDto profileDto) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setUsername(profileDto.getUsername());
        user.setEmail(profileDto.getEmail());
        if (profileDto.getDateOfBirth() != null) {
            user.setDateOfBirth(LocalDate.parse(profileDto.getDateOfBirth()));
        }

        userRepository.save(user);

        return new ProfileDto(
                user.getUsername(),
                user.getEmail(),
                user.getDateOfBirth() != null ? user.getDateOfBirth().toString() : null,
                user.getProfilePictureUrl()
        );
    }

    @Override
    public void updatePassword(String currentPassword, String newPassword) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(currentPassword, user.getPassword())) {
            throw new RuntimeException("Current password is incorrect");
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }

    @Override
    public void updateProfilePicture(MultipartFile file) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        try {
            // Save the file to storage and get the URL
            String fileUrl = saveFileToStorage(file);

            // Update the user's profile picture URL
            user.setProfilePictureUrl(fileUrl);
            userRepository.save(user);
        } catch (Exception e) {
            throw new RuntimeException("Failed to upload profile picture");
        }
    }

    @Override
    public void deleteProfilePicture() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Remove the profile picture URL
        String filePath = user.getProfilePictureUrl();
        if (filePath != null) {
            // Delete the file from disk
            user.setProfilePictureUrl(null);
            userRepository.save(user);

        }

        user.setProfilePictureUrl(null);
        userRepository.save(user);
    }

    private String saveFileToStorage(MultipartFile file) throws IOException {
        // Ensure the file is not empty
        if (file.isEmpty()) {
            throw new RuntimeException("File is empty");
        }

        // Generate a unique filename
        String fileName = UUID.randomUUID().toString() + "." + getFileExtension(file.getOriginalFilename());

        // Define the upload directory (relative to the project root)
        Path uploadDir = Paths.get("uploads");

        // Create the directory if it doesn't exist
        if (!Files.exists(uploadDir)) {
            Files.createDirectories(uploadDir);
        }

        // Define the path where the file will be stored
        Path filePath = uploadDir.resolve(fileName);

        // Copy the file to the directory
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        // Return the file URL that will be publicly accessible
        return "/uploads/" + fileName;
    }

    private void deleteFile(String filePath) throws IOException {
        Path file = Paths.get("uploads", filePath.replace("/uploads/", ""));
        if (Files.exists(file)) {
            Files.delete(file); // Delete the file from disk
        }
    }

    private String getFileExtension(String fileName) {
        return fileName.substring(fileName.lastIndexOf(".") + 1);
    }



}
