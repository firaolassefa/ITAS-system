package com.itas.repository;

import com.itas.model.Notification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.time.LocalDateTime;
import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    
    Page<Notification> findByStatus(String status, Pageable pageable);
    
    Page<Notification> findBySenderId(Long senderId, Pageable pageable);
    
    @Query("SELECT n FROM Notification n WHERE " +
           "(:status IS NULL OR n.status = :status) AND " +
           "(:type IS NULL OR n.notificationType = :type)")
    Page<Notification> findNotificationsWithFilters(
            @Param("status") String status,
            @Param("type") String type,
            Pageable pageable);
    
    List<Notification> findByStatusAndScheduledForBefore(String status, LocalDateTime dateTime);
    
    @Query("SELECT n FROM Notification n WHERE n.targetAudience = :audience AND n.status = 'SENT'")
    List<Notification> findByTargetAudience(@Param("audience") String audience);
}