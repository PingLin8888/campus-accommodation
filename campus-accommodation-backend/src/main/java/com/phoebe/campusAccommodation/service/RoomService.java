package com.phoebe.campusAccommodation.service;

import com.phoebe.campusAccommodation.exception.InternalServerException;
import com.phoebe.campusAccommodation.exception.ResourceNotFoundException;
import com.phoebe.campusAccommodation.model.Room;
import com.phoebe.campusAccommodation.repository.RoomRepository;
import com.phoebe.campusAccommodation.response.RoomResponse;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.sql.rowset.serial.SerialBlob;
import java.io.IOException;
import java.math.BigDecimal;
import java.sql.Blob;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.PriorityQueue;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RoomService {

    private final RoomRepository roomRepository;
    /*order Room objects based on the value returned by their getRoomPrice method, in ascending order by default.*/
    private PriorityQueue<Room> cheapestRooms;
    private PriorityQueue<Room> mostInDemandRooms;

    @PostConstruct
    public void init(){
        List<Room> allRooms = roomRepository.findAll();

        // Initialize min-heap for cheapest rooms
        cheapestRooms = new PriorityQueue<>(Comparator.comparing(Room::getRoomPrice));
        cheapestRooms.addAll(allRooms.stream().filter(Room::isAvailable).collect(Collectors.toList()));

        // Initialize max-heap for most in-demand rooms
        mostInDemandRooms = new PriorityQueue<>((r1, r2) -> Integer.compare(r2.getBookings().size(), r1.getBookings().size()));
        mostInDemandRooms.addAll(allRooms);
    }

    public Room addNewRoom(MultipartFile photo, String roomType, BigDecimal roomPrice) throws IOException, SQLException {
        Room room = new Room();
        room.setRoomType(roomType);
        room.setRoomPrice(roomPrice);
        if(!photo.isEmpty()){
            byte[] photoBytes = photo.getBytes();
            Blob photoBlob = new SerialBlob(photoBytes);
            room.setPhoto(photoBlob);
        }
        Room savedRoom = roomRepository.save(room);
        if (savedRoom.isAvailable()) {
            cheapestRooms.offer(savedRoom);
        }
        mostInDemandRooms.offer(savedRoom);
        return savedRoom;
    }

    public List<String> getAllRoomTypes() {
        return roomRepository.findDistinctRoomTypes();
    }

    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }


    public byte[] getRoomPhotoByRoomId(Long roomId) throws SQLException {
        Optional<Room> theRoom = roomRepository.findById(roomId);
        if (theRoom.isEmpty()) {
            throw new ResourceNotFoundException("Sorry, room not found.");
        }
        Blob photoBlob = theRoom.get().getPhoto();
        if (photoBlob != null) {
            return photoBlob.getBytes(1, (int) photoBlob.length());
        }
        return null;
    }

    public void deleteRoom(Long id) {
        Optional<Room> room = roomRepository.findById(id);
        if (room.isPresent()) {
            Room theRoom = room.get();
            cheapestRooms.remove(theRoom);
            mostInDemandRooms.remove(theRoom);
            roomRepository.deleteById(id);
        }
    }

    public Room updateRoom(Long roomId, String roomType, BigDecimal roomPrice, byte[] photoBytes) {
        Room room = roomRepository.findById(roomId).orElseThrow(() -> new ResourceNotFoundException("Room not found."));
        if (roomType != null) {
            room.setRoomType(roomType);
        }
        if (roomPrice != null) {
            room.setRoomPrice(roomPrice);
        }
        if (photoBytes != null && photoBytes.length > 0) {
            try{
                room.setPhoto(new SerialBlob(photoBytes));
            }catch (SQLException exception){
                throw new InternalServerException("Error updating room");
            }

        }

        Room updatedRoom = roomRepository.save(room);
        if (updatedRoom.isAvailable()) {
            cheapestRooms.remove(updatedRoom);
            cheapestRooms.offer(updatedRoom);
        }
        mostInDemandRooms.remove(updatedRoom);
        mostInDemandRooms.offer(updatedRoom);
        return updatedRoom;
    }

    public Optional<Room> getRoomById(Long roomId) {
        return Optional.of(roomRepository.findById(roomId).get());
    }

    public List<Room> getAvailableRooms(LocalDate checkInDate, LocalDate checkOutDate, String roomType) {
        return roomRepository.findAvailableRoomsByDatesAndType(checkInDate, checkOutDate, roomType);
    }

    public Room getCheapestAvailableRoom() {
        while (!cheapestRooms.isEmpty() && !cheapestRooms.peek().isAvailable()) {
            cheapestRooms.poll();
        }
        return cheapestRooms.peek();
    }

    public Room getMostInDemandRoom() {
        return mostInDemandRooms.peek();
    }
}
