package com.example.crud_backend.Repositories;

import com.example.crud_backend.Models.RecordDto;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface RecordRepository  extends JpaRepository<RecordDto,Long> {

    @Modifying
    @Transactional
    @Query(value = "update gym_records set weight = :weight where id = :id",nativeQuery = true)
    int updateRecords(Long id,int weight);
}
