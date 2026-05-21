-- Create sites table
CREATE TABLE IF NOT EXISTS sites (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nom TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for performance
CREATE INDEX IF NOT EXISTS idx_sites_created_at ON sites(created_at DESC);

-- Enable RLS
ALTER TABLE sites ENABLE ROW LEVEL SECURITY;

-- Policy: Users can see all sites (for now, make them public)
CREATE POLICY "Sites are viewable by everyone" ON sites
  FOR SELECT USING (true);

-- Policy: Users can create sites
CREATE POLICY "Users can create sites" ON sites
  FOR INSERT WITH CHECK (true);

-- Policy: Users can update their sites
CREATE POLICY "Users can update sites" ON sites
  FOR UPDATE USING (true);

-- Policy: Users can delete their sites
CREATE POLICY "Users can delete sites" ON sites
  FOR DELETE USING (true);
