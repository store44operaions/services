/*
  # Seed Data for Bihar Services Platform

  1. Insert default categories
  2. Insert Bihar cities
  3. Insert default coupons
  4. Insert admin user (will be created via auth)
  5. Insert sample services
*/

-- Insert categories
INSERT INTO categories (name, slug, icon, description) VALUES
  ('Beauty & Salon', 'salon', '✂️', 'Hair, beauty, and grooming services'),
  ('Event Decorators', 'decorator', '🎨', 'Wedding and event decoration services'),
  ('Car Rental', 'car-rental', '🚗', 'Vehicle rental for any occasion'),
  ('DJ Services', 'dj', '🎵', 'Music and entertainment for events'),
  ('Hotels', 'hotel', '🏨', 'Accommodation and lodging services'),
  ('Catering', 'catering', '🍽️', 'Food and catering services');

-- Insert Bihar cities
INSERT INTO cities (name) VALUES
  ('Patna'), ('Gaya'), ('Bhagalpur'), ('Muzaffarpur'), ('Darbhanga'), 
  ('Bihar Sharif'), ('Arrah'), ('Begusarai'), ('Katihar'), ('Munger'), 
  ('Chhapra'), ('Danapur'), ('Saharsa'), ('Hajipur'), ('Sasaram'), 
  ('Dehri'), ('Siwan'), ('Motihari'), ('Nawada'), ('Bagaha'), 
  ('Buxar'), ('Kishanganj'), ('Sitamarhi'), ('Jamalpur'), ('Jehanabad'), 
  ('Aurangabad'), ('Lakhisarai'), ('Sheikhpura'), ('Supaul'), ('Madhubani'), 
  ('Araria'), ('Samastipur'), ('Purnia'), ('Madhepura'), ('Khagaria'), 
  ('Banka'), ('Jamui'), ('Rohtas'), ('Kaimur'), ('West Champaran'), 
  ('East Champaran');

-- Insert default coupons
INSERT INTO coupons (code, description, discount_type, discount_value, min_amount, max_discount, usage_limit) VALUES
  ('WELCOME10', 'Welcome offer - 10% off', 'percentage', 10, 500, 200, 1000),
  ('SAVE20', 'Save big - 20% off', 'percentage', 20, 1000, 500, 500),
  ('FIRST50', 'First booking - ₹50 off', 'fixed', 50, 300, 50, 2000),
  ('BIHAR25', 'Bihar special - 25% off', 'percentage', 25, 800, 300, 100);

-- Insert sample admin services (these will be created by admin later)
-- We'll add some sample services for each category and city combination

DO $$
DECLARE
  salon_cat_id UUID;
  decorator_cat_id UUID;
  car_rental_cat_id UUID;
  dj_cat_id UUID;
  hotel_cat_id UUID;
  catering_cat_id UUID;
  patna_city_id UUID;
  gaya_city_id UUID;
  muzaffarpur_city_id UUID;
BEGIN
  -- Get category IDs
  SELECT id INTO salon_cat_id FROM categories WHERE slug = 'salon';
  SELECT id INTO decorator_cat_id FROM categories WHERE slug = 'decorator';
  SELECT id INTO car_rental_cat_id FROM categories WHERE slug = 'car-rental';
  SELECT id INTO dj_cat_id FROM categories WHERE slug = 'dj';
  SELECT id INTO hotel_cat_id FROM categories WHERE slug = 'hotel';
  SELECT id INTO catering_cat_id FROM categories WHERE slug = 'catering';
  
  -- Get city IDs
  SELECT id INTO patna_city_id FROM cities WHERE name = 'Patna';
  SELECT id INTO gaya_city_id FROM cities WHERE name = 'Gaya';
  SELECT id INTO muzaffarpur_city_id FROM cities WHERE name = 'Muzaffarpur';

  -- Insert sample services
  INSERT INTO services (admin_created, name, category_id, city_id, price, rating, image_url, description, features) VALUES
    -- Salon Services
    (true, 'Glamour Beauty Salon', salon_cat_id, patna_city_id, 1500, 4.5, 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=800', 'Premium beauty salon offering hair styling, facial treatments, and complete makeover services.', ARRAY['Hair Cut & Styling', 'Facial Treatments', 'Bridal Makeup', 'Nail Art', 'Threading']),
    (true, 'Royal Cuts Unisex Salon', salon_cat_id, gaya_city_id, 1200, 4.3, 'https://images.pexels.com/photos/3992856/pexels-photo-3992856.jpeg?auto=compress&cs=tinysrgb&w=800', 'Modern unisex salon with expert stylists and premium products.', ARRAY['Men & Women Hair Cut', 'Hair Color', 'Beard Styling', 'Spa Treatments']),
    (true, 'Elite Beauty Lounge', salon_cat_id, muzaffarpur_city_id, 1800, 4.7, 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=800', 'Luxury beauty salon with premium services and expert beauticians.', ARRAY['Premium Hair Styling', 'Advanced Facial', 'Bridal Packages', 'Hair Treatments']),
    
    -- Event Decorators
    (true, 'Dream Wedding Decorators', decorator_cat_id, patna_city_id, 25000, 4.8, 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800', 'Complete wedding decoration services with floral arrangements and lighting.', ARRAY['Stage Decoration', 'Floral Arrangements', 'Lighting Setup', 'Theme Decoration', 'Photography Setup']),
    (true, 'Elite Event Planners', decorator_cat_id, muzaffarpur_city_id, 18000, 4.6, 'https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg?auto=compress&cs=tinysrgb&w=800', 'Professional event planning and decoration for all occasions.', ARRAY['Birthday Parties', 'Corporate Events', 'Anniversary Celebrations', 'Custom Themes']),
    (true, 'Royal Decorators', decorator_cat_id, gaya_city_id, 22000, 4.5, 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800', 'Traditional and modern decoration services for all events.', ARRAY['Wedding Decoration', 'Reception Setup', 'Mandap Decoration', 'Lighting']),

    -- Car Rental
    (true, 'Bihar Car Rentals', car_rental_cat_id, patna_city_id, 2500, 4.4, 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=800', 'Premium car rental service with well-maintained vehicles and professional drivers.', ARRAY['Sedan Cars', 'SUV Available', 'Professional Drivers', 'AC Vehicles', '24/7 Service']),
    (true, 'Royal Ride Car Service', car_rental_cat_id, gaya_city_id, 2200, 4.2, 'https://images.pexels.com/photos/1149137/pexels-photo-1149137.jpeg?auto=compress&cs=tinysrgb&w=800', 'Affordable car rental with luxury and economy options.', ARRAY['Economy Cars', 'Luxury Vehicles', 'Airport Pickup', 'Long Distance Travel']),
    (true, 'Premium Car Hire', car_rental_cat_id, muzaffarpur_city_id, 2800, 4.6, 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=800', 'Luxury car rental service with premium vehicles.', ARRAY['Luxury Cars', 'Wedding Cars', 'Corporate Travel', 'Airport Transfer']),

    -- DJ Services
    (true, 'Beat Drop DJ Services', dj_cat_id, patna_city_id, 8000, 4.7, 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=800', 'Professional DJ services with high-quality sound systems and lighting.', ARRAY['Professional DJ', 'Sound System', 'LED Lighting', 'Wireless Mics', 'Dance Floor Setup']),
    (true, 'Party Beats DJ', dj_cat_id, gaya_city_id, 6500, 4.3, 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=800', 'Energetic DJ services for weddings, parties, and corporate events.', ARRAY['Wedding DJ', 'Party Music', 'Corporate Events', 'Sound Equipment']),
    (true, 'Music Masters DJ', dj_cat_id, muzaffarpur_city_id, 7500, 4.5, 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=800', 'Professional DJ services with latest music and equipment.', ARRAY['Latest Music', 'Professional Setup', 'Event Management', 'Lighting Effects']),

    -- Hotels
    (true, 'Grand Bihar Hotel', hotel_cat_id, patna_city_id, 3500, 4.6, 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=800', 'Luxury hotel with modern amenities and excellent service.', ARRAY['AC Rooms', 'Room Service', 'Free WiFi', 'Restaurant', 'Conference Hall']),
    (true, 'Comfort Inn Bihar', hotel_cat_id, gaya_city_id, 2800, 4.2, 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=800', 'Comfortable accommodation with all basic amenities.', ARRAY['Clean Rooms', 'Parking', 'Breakfast', '24hr Front Desk']),
    (true, 'Heritage Hotel', hotel_cat_id, muzaffarpur_city_id, 4200, 4.8, 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=800', 'Premium heritage hotel with traditional hospitality.', ARRAY['Heritage Rooms', 'Traditional Cuisine', 'Event Halls', 'Spa Services']),

    -- Catering
    (true, 'Taste of Bihar Catering', catering_cat_id, patna_city_id, 350, 4.5, 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=800', 'Authentic Bihari cuisine and multi-cuisine catering services.', ARRAY['Bihari Cuisine', 'Multi-Cuisine', 'Veg & Non-Veg', 'Bulk Orders', 'Event Catering']),
    (true, 'Royal Feast Catering', catering_cat_id, muzaffarpur_city_id, 400, 4.4, 'https://images.pexels.com/photos/1199957/pexels-photo-1199957.jpeg?auto=compress&cs=tinysrgb&w=800', 'Premium catering service for weddings and special occasions.', ARRAY['Wedding Catering', 'Live Counters', 'Dessert Section', 'Professional Service']);
END $$;