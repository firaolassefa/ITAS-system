package com.itas.controller;

import com.itas.dto.ApiResponse;
import com.itas.dto.LoginRequest;
import com.itas.model.User;
import com.itas.model.UserType;
import com.itas.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {
    
    @Autowired
    private UserRepository userRepository;
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        Optional<User> user = userRepository.findByUsernameAndPassword(
            request.getUsername(), 
            request.getPassword()
        );
        
        if (user.isPresent()) {
            // Create response without password
            Map<String, Object> userData = new HashMap<>();
            userData.put("id", user.get().getId());
            userData.put("username", user.get().getUsername());
            userData.put("fullName", user.get().getFullName());
            userData.put("email", user.get().getEmail());
            userData.put("userType", user.get().getUserType());
            userData.put("taxNumber", user.get().getTaxNumber());
            userData.put("companyName", user.get().getCompanyName());
            userData.put("active", user.get().isActive());
            userData.put("createdAt", user.get().getCreatedAt());
            
            Map<String, Object> response = new HashMap<>();
            response.put("user", userData);
            response.put("token", "real-token-" + System.currentTimeMillis());
            
            return ResponseEntity.ok(new ApiResponse<>("Login successful", response));
        }
        
        return ResponseEntity.status(401).body(new ApiResponse<>("Invalid credentials", null));
    }
    
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        // Check if username exists
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body(
                new ApiResponse<>("Username already exists", null)
            );
        }
        
        // Set default values
        user.setActive(true);
        user.setCreatedAt(LocalDateTime.now());
        user.setUserType(UserType.TAXPAYER);
        
        // Save to database
        User savedUser = userRepository.save(user);
        
        // Remove password from response
        savedUser.setPassword(null);
        
        return ResponseEntity.ok(new ApiResponse<>("Registration successful", savedUser));
    }
    
    @GetMapping("/users")
    public ResponseEntity<?> getAllUsers() {
        return ResponseEntity.ok(userRepository.findAll());
    }
}

