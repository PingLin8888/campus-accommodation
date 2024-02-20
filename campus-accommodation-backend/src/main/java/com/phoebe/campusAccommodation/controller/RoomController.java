package com.phoebe.campusAccommodation.controller;

import com.phoebe.campusAccommodation.model.Room;
import com.phoebe.campusAccommodation.response.RoomResponse;
import com.phoebe.campusAccommodation.service.IRoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;

//inject dependencies into this class.
@RequiredArgsConstructor
public class RoomController {

    private IRoomService roomService;
    public ResponseEntity<RoomResponse> addNewRoom(@RequestParam("photo") MultipartFile photo,
                                                   @RequestParam("roomType")String roomType,
                                                   @RequestParam("roomPrice")BigDecimal roomPrice) {
        Room savedRoom = roomService.addNewRoom(photo, roomType, roomPrice);
        RoomResponse response = new RoomResponse(savedRoom.getId(), savedRoom.getRoomType(), savedRoom.getRoomPrice());
        return ResponseEntity.ok(response);
    }
}
