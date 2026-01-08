import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

// PUT - อัพเดท task
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await request.json();
    const { title, completed, due_date } = body;
    const { id } = await params;

    const result = await pool.query(
      `UPDATE tasks
       SET title = COALESCE($1, title),
           completed = COALESCE($2, completed),
           due_date = COALESCE($3, due_date),
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $4
       RETURNING *`,
      [title, completed, due_date, id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Task not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating task:', error);
    return NextResponse.json(
      { error: 'Failed to update task' },
      { status: 500 }
    );
  }
}

// DELETE - ลบ task
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const result = await pool.query(
      'DELETE FROM tasks WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Task not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    return NextResponse.json(
      { error: 'Failed to delete task' },
      { status: 500 }
    );
  }
}
