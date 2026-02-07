
package com.itas.controller;

import com.itas.dto.ApiResponse;
import com.itas.dto.NotificationRequest;
import com.itas.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/notifications")
public class NotificationController {
    
    @Autowired
    private NotificationService notificationService;
    
    @PostMapping("/send")
    public ResponseEntity<?> sendNotification(@RequestBody NotificationRequest request) {
        notificationService.sendNotification(request);
        return ResponseEntity.ok(new ApiResponse<>("Notification sent successfully", null));
    }
    
    @GetMapping("/campaigns")
    public ResponseEntity<?> getNotificationCampaigns() {
        return ResponseEntity.ok(new ApiResponse<>("Campaigns retrieved", 
            notificationService.getCampaigns()));
    }
}