package com.example.prashantminiproject.repository;

import com.example.prashantminiproject.model.House;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface HouseRepository extends JpaRepository<House, Long> {

}
