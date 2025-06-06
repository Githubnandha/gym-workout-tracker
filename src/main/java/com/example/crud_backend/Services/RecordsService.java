package com.example.crud_backend.Services;

import com.example.crud_backend.Models.RecordDto;
import com.example.crud_backend.Repositories.RecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class RecordsService {
    @Autowired
    RecordRepository recordRepository;

    public List<RecordDto> allRecords() {
        return recordRepository.findAll();
    }

    public void saveRecord(RecordDto obj) {
        recordRepository.save(obj);
    }

    public void deleteRecordById(Long id) {
        recordRepository.deleteById(id);
    }

    public int updateRecords(Long id, int weight) {
        return recordRepository.updateRecords(id,weight);
    }
}
