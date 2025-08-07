@@ .. @@
 -- Insert categories
-INSERT INTO categories (name, icon, description) VALUES
-  ('Beauty & Salon', '✂️', 'Hair, beauty, and grooming services'),
-  ('Event Decorators', '🎨', 'Wedding and event decoration services'),
-  ('Car Rental', '🚗', 'Vehicle rental for any occasion'),
-  ('DJ Services', '🎵', 'Music and entertainment for events'),
-  ('Hotels', '🏨', 'Accommodation and lodging services'),
-  ('Catering', '🍽️', 'Food and catering services')
+INSERT INTO categories (name, slug, icon, description) VALUES
+  ('Beauty & Salon', 'salon', '✂️', 'Hair, beauty, and grooming services'),
+  ('Event Decorators', 'decorator', '🎨', 'Wedding and event decoration services'),
+  ('Car Rental', 'car-rental', '🚗', 'Vehicle rental for any occasion'),
+  ('DJ Services', 'dj', '🎵', 'Music and entertainment for events'),
+  ('Hotels', 'hotel', '🏨', 'Accommodation and lodging services'),
+  ('Catering', 'catering', '🍽️', 'Food and catering services')
 ON CONFLICT (name) DO NOTHING;