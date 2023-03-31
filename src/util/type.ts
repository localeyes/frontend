export type PlaceType =
	| 'accounting'
	| 'airport'
	| 'amusement_park'
	| 'aquarium'
	| 'art_gallery'
	| 'atm'
	| 'bakery'
	| 'bank'
	| 'bar'
	| 'beauty_salon'
	| 'bicycle_store'
	| 'book_store'
	| 'bowling_alley'
	| 'bus_station'
	| 'cafe'
	| 'campground'
	| 'car_dealer'
	| 'car_rental'
	| 'car_repair'
	| 'car_wash'
	| 'casino'
	| 'cemetery'
	| 'church'
	| 'city_hall'
	| 'clothing_store'
	| 'convenience_store'
	| 'courthouse'
	| 'dentist'
	| 'department_store'
	| 'doctor'
	| 'drugstore'
	| 'electrician'
	| 'electronics_store'
	| 'embassy'
	| 'fire_station'
	| 'florist'
	| 'funeral_home'
	| 'furniture_store'
	| 'gas_station'
	| 'gym'
	| 'hair_care'
	| 'hardware_store'
	| 'hindu_temple'
	| 'home_goods_store'
	| 'hospital'
	| 'insurance_agency'
	| 'jewelry_store'
	| 'laundry'
	| 'lawyer'
	| 'library'
	| 'light_rail_station'
	| 'liquor_store'
	| 'local_government_office'
	| 'locksmith'
	| 'lodging'
	| 'meal_delivery'
	| 'meal_takeaway'
	| 'mosque'
	| 'movie_rental'
	| 'movie_theater'
	| 'moving_company'
	| 'museum'
	| 'night_club'
	| 'painter'
	| 'park'
	| 'parking'
	| 'pet_store'
	| 'pharmacy'
	| 'physiotherapist'
	| 'plumber'
	| 'police'
	| 'post_office'
	| 'real_estate_agency'
	| 'restaurant'
	| 'roofing_contractor'
	| 'rv_park'
	| 'school'
	| 'secondary_school'
	| 'shoe_store'
	| 'shopping_mall'
	| 'spa'
	| 'stadium'
	| 'storage'
	| 'store'
	| 'subway_station'
	| 'synagogue'
	| 'taxi_stand'
	| 'tourist_attraction'
	| 'train_station'
	| 'transit_station'
	| 'travel_agency'
	| 'university'
	| 'veterinary_care'
	| 'zoo';

// types from the Google Places API
export const TYPE_TO_PRETTY = new Map<PlaceType, string>([
	['accounting', 'Accounting'],
	['airport', 'Airport'],
	['amusement_park', 'Amusement Park'],
	['aquarium', 'Aquarium'],
	['art_gallery', 'Art Gallery'],
	['atm', 'ATM'],
	['bakery', 'Bakery'],
	['bank', 'Bank'],
	['bar', 'Bar'],
	['beauty_salon', 'Beauty Salon'],
	['bicycle_store', 'Bicycle Store'],
	['book_store', 'Book Store'],
	['bowling_alley', 'Bowling Alley'],
	['bus_station', 'Bus Station'],
	['cafe', 'Cafe'],
	['campground', 'Campground'],
	['car_dealer', 'Car Dealer'],
	['car_rental', 'Car Rental'],
	['car_repair', 'Car Repair'],
	['car_wash', 'Car Wash'],
	['casino', 'Casino'],
	['cemetery', 'Cemetery'],
	['church', 'Church'],
	['city_hall', 'City Hall'],
	['clothing_store', 'Clothing Store'],
	['convenience_store', 'Convenience Store'],
	['courthouse', 'Courthouse'],
	['dentist', 'Dentist'],
	['department_store', 'Department Store'],
	['doctor', 'Doctor'],
	['drugstore', 'Drugstore'],
	['electrician', 'Electrician'],
	['electronics_store', 'Electronics Store'],
	['embassy', 'Embassy'],
	['fire_station', 'Fire Station'],
	['florist', 'Florist'],
	['funeral_home', 'Funeral Home'],
	['furniture_store', 'Furniture Store'],
	['gas_station', 'Gas Station'],
	['gym', 'Gym'],
	['hair_care', 'Hair Care'],
	['hardware_store', 'Hardware Store'],
	['hindu_temple', 'Hindu Temple'],
	['home_goods_store', 'Home Goods Store'],
	['hospital', 'Hospital'],
	['insurance_agency', 'Insurance Agency'],
	['jewelry_store', 'Jewelry Store'],
	['laundry', 'Laundry'],
	['lawyer', 'Lawyer'],
	['library', 'Library'],
	['light_rail_station', 'Light Rail Station'],
	['liquor_store', 'Liquor Store'],
	['local_government_office', 'Local Government Office'],
	['locksmith', 'Locksmith'],
	['lodging', 'Lodging'],
	['meal_delivery', 'Meal Delivery'],
	['meal_takeaway', 'Meal Takeaway'],
	['mosque', 'Mosque'],
	['movie_rental', 'Movie Rental'],
	['movie_theater', 'Movie Theater'],
	['moving_company', 'Moving Company'],
	['museum', 'Museum'],
	['night_club', 'Night Club'],
	['painter', 'Painter'],
	['park', 'Park'],
	['parking', 'Parking'],
	['pet_store', 'Pet Store'],
	['pharmacy', 'Pharmacy'],
	['physiotherapist', 'Physiotherapist'],
	['plumber', 'Plumber'],
	['police', 'Police'],
	['post_office', 'Post Office'],
	['real_estate_agency', 'Real Estate Agency'],
	['restaurant', 'Restaurant'],
	['roofing_contractor', 'Roofing Contractor'],
	['rv_park', 'RV Park'],
	['school', 'School'],
	['secondary_school', 'Secondary School'],
	['shoe_store', 'Shoe Store'],
	['shopping_mall', 'Shopping Mall'],
	['spa', 'Spa'],
	['stadium', 'Stadium'],
	['storage', 'Storage'],
	['store', 'Store'],
	['subway_station', 'Subway Station'],
	['synagogue', 'Synagogue'],
	['taxi_stand', 'Taxi Stand'],
	['tourist_attraction', 'Tourist Attraction'],
	['train_station', 'Train Station'],
	['transit_station', 'Transit Station'],
	['travel_agency', 'Travel Agency'],
	['university', 'University'],
	['veterinary_care', 'Veterinary Care'],
	['zoo', 'Zoo'],
]);
