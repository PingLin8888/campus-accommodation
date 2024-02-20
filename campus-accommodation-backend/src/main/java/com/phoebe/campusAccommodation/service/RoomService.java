package com.phoebe.campusAccommodation.service;

import com.phoebe.campusAccommodation.model.Room;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;

public class RoomService implements IRoomService{

    @Override
    public Room addNewRoom(MultipartFile photo, String roomType, BigDecimal roomPrice) {
        return null;
    }
}
