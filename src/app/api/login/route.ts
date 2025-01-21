import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { dbConnect } from '@/lib/dbConnect'; // Path to your dbConnect
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { name, password } = await req.json();

    // Connect to the database
    const db = await dbConnect();  // Get the DB connection
    const user = await db.collection('users').findOne({ name });

    // Check if user exists
    if (!user) {
      return NextResponse.json({ error: 'Invalid username or password' }, { status: 400 });
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: 'Invalid username or password' }, { status: 400 });
    }

    // Login successful
    return NextResponse.json({ message: 'Login successful!' }, { status: 200 });
  } catch (error) {
    console.error('Error during login:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
