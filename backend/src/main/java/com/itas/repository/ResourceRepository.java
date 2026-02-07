package com.itas.repository;

import com.itas.model.Resource;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ResourceRepository extends JpaRepository<Resource, Long> {
    
    List<Resource> findByCategory(String category);
    
    List<Resource> findByResourceType(String resourceType);
    
    List<Resource> findByAudience(String audience);
    
    List<Resource> findByArchivedTrue();
    
    List<Resource> findByArchivedFalse();
    
    @Query("SELECT r FROM Resource r WHERE " +
           "LOWER(r.title) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(r.description) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<Resource> searchByTitleOrDescription(@Param("query") String query);
    
    @Query("SELECT SUM(r.viewCount) FROM Resource r")
    Long sumViewCount();
    
    @Query("SELECT SUM(r.downloadCount) FROM Resource r")
    Long sumDownloadCount();
    
    @Query("SELECT r FROM Resource r WHERE r.status = :status")
    List<Resource> findByStatus(@Param("status") String status);
    
    @Query("SELECT r FROM Resource r WHERE r.uploadedBy.id = :userId")
    List<Resource> findByUploadedBy(@Param("userId") Long userId);
}