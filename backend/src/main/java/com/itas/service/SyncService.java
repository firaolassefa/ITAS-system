package com.itas.service;

import com.itas.model.SyncRecord;
import com.itas.repository.SyncRecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class SyncService {
    
    @Autowired
    private SyncRecordRepository syncRecordRepository;
    
    public List<SyncRecord> getAllSyncRecords() {
        return syncRecordRepository.findAll();
    }
    
    public SyncRecord getSyncRecordById(Long id) {
        return syncRecordRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Sync record not found with id: " + id));
    }
    
    public List<SyncRecord> getSyncRecordsByStatus(String status) {
        return syncRecordRepository.findAll().stream()
                .filter(s -> status.equals(s.getStatus()))
                .toList();
    }
    
    @Transactional
    public SyncRecord createSyncRecord(String entityType, String operation, String details) {
        SyncRecord syncRecord = new SyncRecord();
        syncRecord.setEntityType(entityType);
        syncRecord.setOperation(operation);
        syncRecord.setStatus("PENDING");
        syncRecord.setSyncDetails(details);
        syncRecord.setCreatedAt(LocalDateTime.now());
        
        return syncRecordRepository.save(syncRecord);
    }
    
    @Transactional
    public SyncRecord updateSyncStatus(Long id, String status, String errorMessage) {
        SyncRecord syncRecord = getSyncRecordById(id);
        
        syncRecord.setStatus(status);
        syncRecord.setErrorMessage(errorMessage);
        syncRecord.setSyncedAt(LocalDateTime.now());
        
        return syncRecordRepository.save(syncRecord);
    }
    
    @Transactional
    public void deleteSyncRecord(Long id) {
        SyncRecord syncRecord = getSyncRecordById(id);
        syncRecordRepository.delete(syncRecord);
    }
    
    @Transactional
    public void retryFailedSync(Long id) {
        SyncRecord syncRecord = getSyncRecordById(id);
        syncRecord.setStatus("PENDING");
        syncRecord.setErrorMessage(null);
        syncRecordRepository.save(syncRecord);
    }
}
