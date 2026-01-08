import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

// GET - ดึงข้อมูล tasks ทั้งหมด
export async function GET() {
  try {
    const result = await pool.query(
      'SELECT * FROM tasks ORDER BY created_at DESC'
    );
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tasks' },
      { status: 500 }
    );
  }
}

// POST - สร้าง task ใหม่
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, due_date } = body;

    if (!title) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      );
    }

    const result = await pool.query(
      'INSERT INTO tasks (title, due_date) VALUES ($1, $2) RETURNING *',
      [title, due_date || null]
    );

    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error('Error creating task:', error);
    return NextResponse.json(
      { error: 'Failed to create task' },
      { status: 500 }
    );
  }
}
