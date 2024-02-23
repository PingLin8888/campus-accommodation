package com.phoebe.campusAccommodation.repository;

import com.phoebe.campusAccommodation.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RoomRepository extends JpaRepository<Room, Long> {
    List<String> findDistinctRoomTypes();
}
