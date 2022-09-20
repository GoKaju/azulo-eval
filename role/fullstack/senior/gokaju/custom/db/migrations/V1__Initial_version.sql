
CREATE DATABASE IF NOT EXISTS ${DATABASE}; -- Create the working database

CREATE TABLE airport.Location (
    id INT AUTO_INCREMENT PRIMARY KEY,
    country VARCHAR(50) NOT NULL,
    provinceOrState VARCHAR(50) NOT NULL,
    longitude decimal(11,7) NOT NULL,
    latitude decimal(11,7) NOT NULL
);

CREATE TABLE airport.AirportOperator (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE airport.Airport (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    airportOperatorId INT NOT NULL,
    airportCode VARCHAR(5) NOT NULL,
    locationId INT NOT NULL,
    priorityOrder INT NOT NULL,
    FOREIGN KEY (airportOperatorId) REFERENCES airport.AirportOperator(id),
    FOREIGN KEY (locationId) REFERENCES airport.Location(id)
);

