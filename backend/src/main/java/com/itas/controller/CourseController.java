package com.itas.controller;

import com.itas.dto.ApiResponse;
import com.itas.model.Course;
import com.itas.model.Enrollment;
import com.itas.repository.CourseRepository;
import com.itas.repository.EnrollmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.*;

@RestController
@RequestMapping("/api/courses")
@CrossOrigin(origins = "*")
public class CourseController {
    
    @Autowired
    private CourseRepository courseRepository;
    
    @Autowired
    private EnrollmentRepository enrollmentRepository;
    
    // Mock courses (same as frontend courses.ts)
    private List<Course> mockCourses = new ArrayList<>();
    private List<Enrollment> mockEnrollments = new ArrayList<>();
    
    public CourseController() {
        // Initialize mock courses
        Course course1 = new Course();
        course1.setId(1L);
        course1.setTitle("VAT Fundamentals for Beginners");
        course1.setDescription("Learn basic VAT concepts, registration, and filing procedures.");
        course1.setCategory("VAT");
        course1.setDifficulty("BEGINNER");
        course1.setDurationHours(4);
        course1.setModules(Arrays.asList("Introduction to VAT", "VAT Registration Process", "Filing VAT Returns"));
        course1.setPublished(true);
        
        Course course2 = new Course();
        course2.setId(2L);
        course2.setTitle("Income Tax Calculation");
        course2.setDescription("Complete guide to calculating and filing income tax returns.");
        course2.setCategory("INCOME_TAX");
        course2.setDifficulty("INTERMEDIATE");
        course2.setDurationHours(6);
        course2.setModules(Arrays.asList("Understanding Tax Brackets", "Deductions and Allowances"));
        course2.setPublished(true);
        
        mockCourses.add(course1);
        mockCourses.add(course2);
    }
    
    @GetMapping("")
    public ResponseEntity<?> getAllCourses() {
        return ResponseEntity.ok(new ApiResponse<>("Success", mockCourses));
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getCourseById(@PathVariable Long id) {
        Optional<Course> course = mockCourses.stream()
            .filter(c -> c.getId().equals(id))
            .findFirst();
        
        if (course.isPresent()) {
            return ResponseEntity.ok(new ApiResponse<>("Success", course.get()));
        } else {
            return ResponseEntity.status(404).body("Course not found");
        }
    }
    
    @PostMapping("/enroll")
    public ResponseEntity<?> enroll(@RequestBody Map<String, Long> request) {
        Long userId = request.get("userId");
        Long courseId = request.get("courseId");
        
        Enrollment enrollment = new Enrollment();
        enrollment.setId(System.currentTimeMillis());
        enrollment.setUserId(userId);
        enrollment.setCourseId(courseId);
        enrollment.setEnrolledAt(LocalDateTime.now());
        enrollment.setProgress(0.0);
        enrollment.setStatus("ENROLLED");
        
        mockEnrollments.add(enrollment);
        
        Map<String, Object> response = new HashMap<>();
        response.put("enrollmentId", enrollment.getId());
        
        return ResponseEntity.ok(new ApiResponse<>("Successfully enrolled in course", response));
    }
    
    @PutMapping("/progress")
    public ResponseEntity<?> updateProgress(@RequestBody Map<String, Object> request) {
        Long enrollmentId = ((Number) request.get("enrollmentId")).longValue();
        double progress = ((Number) request.get("progress")).doubleValue();
        
        // In real app, update in database
        return ResponseEntity.ok(new ApiResponse<>("Progress updated", null));
    }
    
    @GetMapping("/enrollments/{userId}")
    public ResponseEntity<?> getUserEnrollments(@PathVariable Long userId) {
        List<Map<String, Object>> response = new ArrayList<>();
        
        for (Enrollment enrollment : mockEnrollments) {
            if (enrollment.getUserId().equals(userId)) {
                Map<String, Object> item = new HashMap<>();
                item.put("id", enrollment.getId());
                item.put("userId", enrollment.getUserId());
                item.put("courseId", enrollment.getCourseId());
                item.put("enrolledAt", enrollment.getEnrolledAt());
                item.put("progress", enrollment.getProgress());
                item.put("status", enrollment.getStatus());
                
                // Find course
                Optional<Course> course = mockCourses.stream()
                    .filter(c -> c.getId().equals(enrollment.getCourseId()))
                    .findFirst();
                
                if (course.isPresent()) {
                    item.put("course", course.get());
                }
                
                response.add(item);
            }
        }
        
        return ResponseEntity.ok(new ApiResponse<>("Success", response));
    }
}
