package com.phoebe.campusAccommodation.service;

import com.phoebe.campusAccommodation.exception.InternalServerException;
import com.phoebe.campusAccommodation.exception.ResourceNotFoundException;
import com.phoebe.campusAccommodation.model.Room;
import com.phoebe.campusAccommodation.repository.RoomRepository;
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
    public void initializeHeaps() {
        List<Room> allRooms = roomRepository.findAllWithBookings();

        // Initialize min-heap for cheapest rooms
        cheapestRooms = new PriorityQueue<>(Comparator.comparing(Room::getRoomPrice, Comparator.nullsLast(BigDecimal::compareTo)));
        cheapestRooms.addAll(allRooms.stream().filter(Room::isAvailable).collect(Collectors.toList()));


        // Initialize max-heap for most in-demand rooms
        mostInDemandRooms = new PriorityQueue<>((r1, r2) -> Integer.compare(r2.getDemand(), r1.getDemand()));
        mostInDemandRooms.addAll(allRooms);
    }

    public Room addNewRoom(MultipartFile photo, String roomType, BigDecimal roomPrice) throws IOException, SQLException {
        Room room = new Room();
        room.setRoomType(roomType);
        room.setBasePrice(roomPrice);
        room.adjustPriceBasedOnDemand();
        if (!photo.isEmpty()) {
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
            room.setBasePrice(roomPrice);
        }
        if (photoBytes != null && photoBytes.length > 0) {
            try {
                room.setPhoto(new SerialBlob(photoBytes));
            } catch (SQLException exception) {
                throw new InternalServerException("Error updating room");
            }
        }

        Room updatedRoom = roomRepository.save(room);
        updateRoom(updatedRoom);
        return updatedRoom;
    }

    public synchronized void updateRoom(Room updatedRoom) {
        boolean removed;
        System.out.println("update room price: " + updatedRoom.getRoomPrice());
        removed = cheapestRooms.remove(updatedRoom);
        if (removed) {
            System.out.println("Room removed successfully from cheapestRooms.");
        } else {
            System.out.println("Failed to remove room from cheapestRooms.");
        }
        cheapestRooms.offer(updatedRoom);
        System.out.println("cheapestRooms offer room price: " + cheapestRooms.peek().getRoomPrice());
        // Remove and reinsert the room in the most in-demand rooms queue
        removed = mostInDemandRooms.remove(updatedRoom);
        if (removed) {
            System.out.println("Room removed successfully from mostInDemandRooms.");
        } else {
            System.out.println("Failed to remove room from mostInDemandRooms.");
        }

        mostInDemandRooms.offer(updatedRoom);
    }


    public Optional<Room> getRoomById(Long roomId) {
        return Optional.of(roomRepository.findById(roomId).get());
    }

    public List<Room> getAvailableRooms(LocalDate checkInDate, LocalDate checkOutDate, String roomType) {
        return roomRepository.findAvailableRoomsByDatesAndType(checkInDate, checkOutDate, roomType);
    }

    public Room getCheapestAvailableRoom() {
//        while (!cheapestRooms.isEmpty() && !cheapestRooms.peek().isAvailable()) {
//            cheapestRooms.poll();
//        }
        return cheapestRooms.peek();
    }

    public Room getMostInDemandRoom() {
        return mostInDemandRooms.peek();
    }

    public void updatePricesBasedOnDemand() {
        List<Room> rooms = roomRepository.findAll();
        for (Room room : rooms) {
            room.adjustPriceBasedOnDemand();
            roomRepository.save(room);
            updateRoom(room);
        }
        initializeHeaps();
    }

    public void syncHeaps() {
        initializeHeaps();
    }
}
