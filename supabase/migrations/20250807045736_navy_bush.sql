@@ .. @@
 -- Create categories table
 CREATE TABLE IF NOT EXISTS categories (
   id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
   name text UNIQUE NOT NULL,
+  slug text UNIQUE NOT NULL,
   icon text,
   description text,
   is_active boolean DEFAULT true,
   created_at timestamptz DEFAULT now(),
   updated_at timestamptz DEFAULT now()
 );