package com.example.crud_backend.Controllers;

import com.example.crud_backend.Models.RecordDto;
import com.example.crud_backend.Services.RecordsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class RecordsController {
      @Autowired
      RecordsService recordsService;
      @GetMapping("/")
      public List<RecordDto> allRecords() {
          return recordsService.allRecords();
      }
      @PostMapping("/")
      public void saveRecords(@RequestBody RecordDto obj) {
            recordsService.saveRecord(obj);
      }
      @PostMapping("delete/{id}")
      public void deleteRecords(@PathVariable Long id) {
            System.out.println(id);
            recordsService.deleteRecordById(id);
      }
      @PostMapping("update/{id}")
      public void  updateRecords(@PathVariable Long id,@RequestBody Map<String,Object> weight) {
            int updated = recordsService.updateRecords(id,Integer.parseInt(weight.get("weight").toString()));
            System.out.println("Number of rows: "+updated);
      }
}
