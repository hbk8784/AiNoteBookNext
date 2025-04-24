-- First, let's check the current table structure
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'notes' 
AND column_name = 'user_id';

-- Then apply our changes
BEGIN;

-- Drop existing foreign key constraint if it exists
DO $$ 
BEGIN
    IF EXISTS (
        SELECT 1 
        FROM information_schema.table_constraints 
        WHERE constraint_name = 'fk_user'
    ) THEN
        ALTER TABLE notes DROP CONSTRAINT fk_user;
    END IF;
END $$;

-- Change the column type
ALTER TABLE notes 
ALTER COLUMN user_id TYPE uuid USING user_id::uuid;

-- Add the foreign key constraint
ALTER TABLE notes
ADD CONSTRAINT fk_user
FOREIGN KEY (user_id)
REFERENCES auth.users(id)
ON DELETE CASCADE;

COMMIT;

-- Verify the foreign key constraint
SELECT 
    tc.constraint_name, 
    tc.table_name, 
    kcu.column_name, 
    ccu.table_name AS foreign_table_name,
    ccu.column_name AS foreign_column_name 
FROM 
    information_schema.table_constraints AS tc 
    JOIN information_schema.key_column_usage AS kcu
      ON tc.constraint_name = kcu.constraint_name
    JOIN information_schema.constraint_column_usage AS ccu
      ON ccu.constraint_name = tc.constraint_name
WHERE tc.constraint_type = 'FOREIGN KEY' 
AND tc.table_name = 'notes';

-- First get a valid user_id
SELECT id FROM auth.users LIMIT 1;

-- Then use that ID to insert a test note
INSERT INTO notes (title, content, color, date, user_id)
VALUES (
    'Test Note',
    'This is a test note to verify the changes',
    'emerald',
    CURRENT_TIMESTAMP,
    'ccb4a577-11c3-4396-801e-09cb7d33a1dd'  -- Use the ID from the previous query
)
RETURNING *; 