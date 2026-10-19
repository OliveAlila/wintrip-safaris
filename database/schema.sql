CREATE TABLE IF NOT EXISTS destinations (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(160) NOT NULL UNIQUE,
  region VARCHAR(60) NOT NULL,
  description VARCHAR(500) NOT NULL,
  image_url VARCHAR(1000) DEFAULT NULL,
  visa_note VARCHAR(60) DEFAULT NULL,
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS enquiries (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(160) NOT NULL,
  email VARCHAR(190) NOT NULL,
  destination VARCHAR(160) DEFAULT NULL,
  travel_date DATE DEFAULT NULL,
  message TEXT NOT NULL,
  status ENUM('new','contacted','in_progress','closed','spam') NOT NULL DEFAULT 'new',
  created_at DATETIME NOT NULL,
  INDEX idx_enquiries_status_created (status, created_at),
  INDEX idx_enquiries_email (email)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(190) NOT NULL UNIQUE,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

INSERT IGNORE INTO destinations (name, region, description, image_url, visa_note, sort_order) VALUES
('Barbados','Caribbean','Rum, reggae, and Caribbean beaches.','https://images.unsplash.com/photo-1580541631950-7282082b03fe?auto=format&fit=crop&w=900&q=80',NULL,1),
('Lamu','Kenya','A UNESCO World Heritage island where Swahili culture and dhow sailing shape the pace of life.','https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=900&q=80',NULL,2),
('Nairobi','Kenya','Kenya’s capital for culture, dining and city energy.','https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=900&q=80',NULL,3),
('Maasai Mara','Kenya','Endless plains, big cats and the Great Migration.','https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=900&q=80',NULL,4),
('Diani & the South Coast','Kenya','Powder-white sand, turquoise water and coastal adventures.','https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=900&q=80',NULL,5),
('Mombasa','Kenya','Old Town, Fort Jesus and easy beach escapes.','https://images.unsplash.com/photo-1509233725247-49e657c54213?auto=format&fit=crop&w=900&q=80',NULL,6),
('Zanzibar','Africa','Spice plantations, Stone Town and beautiful beaches.','https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=900&q=80','Visa-free',7),
('Naivasha & the Rift','Kenya','Lake outings, cycling and Rift Valley views.','https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=900&q=80',NULL,8),
('Dubai','Middle East','Skyscrapers, desert safaris and world-class shopping.','https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=80',NULL,9),
('Cape Town','Africa','Table Mountain, winelands and the Garden Route.','https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&w=900&q=80','Visa-free',10),
('Rwanda','Africa','Gorilla trekking and Kigali’s vibrant city scene.','https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=900&q=80','Visa-free',11),
('Mauritius','Africa','Turquoise lagoons and memorable island stays.','https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=900&q=80','Visa-free',12),
('Seychelles','Africa','Granite-boulder beaches and barefoot luxury.','https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=900&q=80','Visa on arrival',13),
('Abu Dhabi','Middle East','Grand architecture, Yas Island and cultural experiences.','https://images.unsplash.com/photo-1512632578888-169bbbc64f33?auto=format&fit=crop&w=900&q=80',NULL,14),
('Doha, Qatar','Middle East','A modern skyline alongside rich cultural heritage.','https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=900&q=80','Visa on arrival',15),
('Bali, Indonesia','Asia','Rice terraces, temples and beach resorts.','https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=80','Visa on arrival',16),
('Singapore','Asia','Gardens, skyline views and memorable food.','https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=900&q=80','Visa-free',17),
('Malaysia / Kuala Lumpur','Asia','A striking skyline, island escapes and cultural variety.','https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=900&q=80','Visa-free',18),
('Europe','Europe','A curated itinerary linking iconic cities and landscapes.','https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=900&q=80',NULL,19),
('Malindi & Watamu','Kenya','Marine parks, coastal charm and underwater discovery.','https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=900&q=80',NULL,20),
('Amboseli','Kenya','Elephant herds framed by Kilimanjaro.','https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=900&q=80',NULL,21),
('Tsavo','Kenya','Vast wilderness, red-dusted elephants and open horizons.','https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=900&q=80',NULL,22),
('Samburu','Kenya','Remote northern landscapes and distinctive wildlife.','https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=900&q=80',NULL,23),
('Lake Nakuru','Kenya','Flamingos, rhinos and Rift Valley scenery.','https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=900&q=80',NULL,24),
('Lake Elementaita','Kenya','A quieter lakeside escape known for birdlife.','https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=900&q=80',NULL,25),
('Mount Kenya','Kenya','Mountain trails and highland lodge escapes.','https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=80',NULL,26),
('Uganda','Africa','Gorilla trekking, the source of the Nile and lush landscapes.','https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=900&q=80','Visa-free',27),
('Johannesburg','Africa','Urban energy, history and culture.','https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=900&q=80','Visa-free',28),
('Thailand','Asia','Temples, beaches and street-food adventures.','https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=900&q=80','Visa on arrival',29),
('Indonesia','Asia','Explore beyond Bali to volcanoes, islands and temples.','https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=80','Visa on arrival',30),
('China','Asia','Historic landmarks and fast-changing cities.','https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=900&q=80',NULL,31),
('Japan','Asia','Cherry blossoms, ancient temples and modern cities.','https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=900&q=80',NULL,32),
('India','Asia','Rich heritage, regional cuisines and varied landscapes.','https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=900&q=80',NULL,33);
