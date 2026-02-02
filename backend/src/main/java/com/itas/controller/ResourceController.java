package com.itas.controller;

import com.itas.dto.ApiResponse;
import com.itas.model.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.*;

@RestController
@RequestMapping("/api/resources")
@CrossOrigin(origins = "*")
public class ResourceController {
    
    // Mock resources (same as frontend resources.ts)
    private List<Resource> mockResources = new ArrayList<>();
    
    public ResourceController() {
        // Initialize mock resources
        Resource resource1 = new Resource();
        resource1.setId(1L);
        resource1.setTitle("VAT Compliance Handbook 2024");
        resource1.setDescription("Complete guide to VAT compliance for small and medium businesses.");
        resource1.setResourceType("PDF");
        resource1.setFileUrl("/resources/vat-handbook.pdf");
        resource1.setCategory("VAT");
        resource1.setAudience("ALL");
        resource1.setViews(1250);
        resource1.setDownloads(890);
        resource1.setUploadedAt(LocalDateTime.now().minusDays(30));
        
        Resource resource2 = new Resource();
        resource2.setId(2L);
        resource2.setTitle("How to File Tax Returns Online");
        resource2.setDescription("Step-by-step video tutorial for online tax filing.");
        resource2.setResourceType("VIDEO");
        resource2.setFileUrl("/resources/tax-filing.mp4");
        resource2.setCategory("INCOME_TAX");
        resource2.setAudience("TAXPAYER");
        resource2.setViews(3200);
        resource2.setDownloads(1500);
        resource2.setUploadedAt(LocalDateTime.now().minusDays(15));
        
        mockResources.add(resource1);
        mockResources.add(resource2);
    }
    
    @GetMapping("")
    public ResponseEntity<?> getAllResources() {
        return ResponseEntity.ok(new ApiResponse<>("Success", mockResources));
    }
    
    @GetMapping("/search")
    public ResponseEntity<?> searchResources(
            @RequestParam(required = false) String query,
            @RequestParam(required = false) String category) {
        
        List<Resource> results = new ArrayList<>(mockResources);
        
        if (query != null && !query.isEmpty()) {
            results = results.stream()
                .filter(r -> r.getTitle().toLowerCase().contains(query.toLowerCase()) ||
                           r.getDescription().toLowerCase().contains(query.toLowerCase()))
                .toList();
        }
        
        if (category != null && !category.isEmpty()) {
            results = results.stream()
                .filter(r -> r.getCategory().equals(category))
                .toList();
        }
        
        return ResponseEntity.ok(new ApiResponse<>("Success", results));
    }
    
    @PostMapping("/{id}/download")
    public ResponseEntity<?> downloadResource(@PathVariable Long id) {
        Optional<Resource> resource = mockResources.stream()
            .filter(r -> r.getId().equals(id))
            .findFirst();
        
        if (resource.isPresent()) {
            // Increment downloads
            resource.get().setDownloads(resource.get().getDownloads() + 1);
            
            Map<String, String> response = new HashMap<>();
            response.put("downloadUrl", resource.get().getFileUrl());
            
            return ResponseEntity.ok(new ApiResponse<>("Download started", response));
        }
        
        return ResponseEntity.status(404).body("Resource not found");
    }
    
    @PostMapping("/upload")
    public ResponseEntity<?> uploadResource(@RequestBody Resource resourceData) {
        Resource newResource = new Resource();
        newResource.setId(System.currentTimeMillis());
        newResource.setTitle(resourceData.getTitle());
        newResource.setDescription(resourceData.getDescription());
        newResource.setResourceType(resourceData.getResourceType());
        newResource.setFileUrl(resourceData.getFileUrl());
        newResource.setCategory(resourceData.getCategory());
        newResource.setAudience(resourceData.getAudience());
        newResource.setViews(0);
        newResource.setDownloads(0);
        newResource.setUploadedAt(LocalDateTime.now());
        
        mockResources.add(newResource);
        
        return ResponseEntity.ok(new ApiResponse<>("Resource uploaded successfully", newResource));
    }
}
