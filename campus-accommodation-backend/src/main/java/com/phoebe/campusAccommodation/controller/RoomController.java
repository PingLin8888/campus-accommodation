package com.phoebe.campusAccommodation.controller;

import com.phoebe.campusAccommodation.model.Room;
import com.phoebe.campusAccommodation.response.RoomResponse;
import com.phoebe.campusAccommodation.service.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.sql.SQLException;
import java.util.List;

//inject dependencies into this class.
@CrossOrigin(origins = "*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/rooms")
public class RoomController {

    @Autowired
    private RoomService roomService;
    @PostMapping("/add/new-room")
    public ResponseEntity<RoomResponse> addNewRoom(@RequestParam("photo") MultipartFile photo,
                                                   @RequestParam("roomType")String roomType,
                                                   @RequestParam("roomPrice")BigDecimal roomPrice) throws SQLException, IOException {
        Room savedRoom = roomService.addNewRoom(photo, roomType, roomPrice);
        RoomResponse response = new RoomResponse(savedRoom.getId(), savedRoom.getRoomType(), savedRoom.getRoomPrice());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/room/types")
    public List<String> getRoomTypes(){
        return roomService.getAllRoomTypes();
    }
}
