/*
# Create images table for infinite scroll gallery

1. New Tables
- `images` - stores photo metadata for the infinite scroll gallery
  - `id` (uuid, primary key) - unique identifier
  - `url` (text, not null) - the image URL
  - `thumbnail_url` (text, not null) - smaller version for quick loading
  - `title` (text) - image title/caption
  - `author` (text) - photographer name
  - `width` (integer) - original width
  - `height` (integer) - original height
  - `created_at` (timestamptz) - when the image was added
  - `category` (text) - photo category (nature, architecture, people, travel, etc.)

2. Security
- Enable RLS on `images`.
- Allow public read access (no auth required for this gallery).
*/

CREATE TABLE IF NOT EXISTS images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  url text NOT NULL,
  thumbnail_url text NOT NULL,
  title text NOT NULL,
  author text NOT NULL,
  width integer NOT NULL,
  height integer NOT NULL,
  category text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE images ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_images" ON images;
CREATE POLICY "anon_select_images" ON images FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_images" ON images;
CREATE POLICY "anon_insert_images" ON images FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_images" ON images;
CREATE POLICY "anon_update_images" ON images FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_images" ON images;
CREATE POLICY "anon_delete_images" ON images FOR DELETE
  TO anon, authenticated USING (true);
