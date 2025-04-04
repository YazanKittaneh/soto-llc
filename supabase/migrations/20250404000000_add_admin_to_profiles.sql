-- Add is_admin column to profiles table
ALTER TABLE profiles
ADD COLUMN is_admin boolean DEFAULT false;

-- Create or replace function to set admin status
CREATE OR REPLACE FUNCTION public.set_admin(user_id uuid, admin_status boolean)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE public.profiles
  SET is_admin = admin_status
  WHERE id = user_id;
END;
$$;

-- Create policy to allow admins to update admin status
CREATE POLICY "Admins can update admin status" 
ON profiles FOR UPDATE
USING (auth.uid() = id OR (SELECT is_admin FROM profiles WHERE id = auth.uid()))
WITH CHECK (auth.uid() = id OR (SELECT is_admin FROM profiles WHERE id = auth.uid()));
