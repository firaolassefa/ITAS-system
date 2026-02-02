package com.itas.controller;

import com.itas.dto.ApiResponse;
import com.itas.model.Certificate;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.*;

@RestController
@RequestMapping("/api/certificates")
@CrossOrigin(origins = "*")
public class CertificateController {
    
    // Mock certificates (same as frontend certificates.ts)
    private List<Certificate> mockCertificates = new ArrayList<>();
    
    public CertificateController() {
        // Initialize mock certificate
        Certificate cert = new Certificate();
        cert.setId(1L);
        cert.setCertificateId("ITAS-CERT-2024-001");
        cert.setUserId(1L);
        cert.setCourseId(1L);
        cert.setIssuedAt(LocalDateTime.now().minusDays(10));
        cert.setValidUntil(LocalDateTime.now().plusYears(1));
        cert.setDownloadUrl("/certificates/ITAS-CERT-2024-001.pdf");
        cert.setVerified(true);
        
        mockCertificates.add(cert);
    }
    
    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getUserCertificates(@PathVariable Long userId) {
        List<Certificate> userCerts = mockCertificates.stream()
            .filter(c -> c.getUserId().equals(userId))
            .toList();
        
        return ResponseEntity.ok(new ApiResponse<>("Success", userCerts));
    }
    
    @PostMapping("/generate")
    public ResponseEntity<?> generateCertificate(@RequestBody Map<String, Long> request) {
        Long userId = request.get("userId");
        Long courseId = request.get("courseId");
        
        Certificate newCert = new Certificate();
        newCert.setId(System.currentTimeMillis());
        newCert.setCertificateId("ITAS-CERT-" + System.currentTimeMillis());
        newCert.setUserId(userId);
        newCert.setCourseId(courseId);
        newCert.setIssuedAt(LocalDateTime.now());
        newCert.setValidUntil(LocalDateTime.now().plusYears(1));
        newCert.setDownloadUrl("/certificates/ITAS-CERT-" + System.currentTimeMillis() + ".pdf");
        newCert.setVerified(true);
        
        mockCertificates.add(newCert);
        
        return ResponseEntity.ok(new ApiResponse<>("Certificate generated successfully", newCert));
    }
    
    @GetMapping("/verify/{certificateId}")
    public ResponseEntity<?> verifyCertificate(@PathVariable String certificateId) {
        Optional<Certificate> cert = mockCertificates.stream()
            .filter(c -> c.getCertificateId().equals(certificateId))
            .findFirst();
        
        Map<String, Object> response = new HashMap<>();
        response.put("valid", cert.isPresent());
        response.put("certificate", cert.orElse(null));
        
        return ResponseEntity.ok(new ApiResponse<>("Verification complete", response));
    }
}
