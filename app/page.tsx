"use client";

import { useState, useEffect } from "react";
import TaskForm from "@/app/components/TaskForm";
import TaskList from "@/app/components/TaskList";
import TaskStats from "@/app/components/TaskStats";

interface Task {
  id: number;
  title: string;
  completed: boolean;
  due_date: string | null;
  created_at: string;
  updated_at: string;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDueDate, setNewTaskDueDate] = useState("");
  const [loading, setLoading] = useState(false);

  // ดึงข้อมูล tasks
  const fetchTasks = async () => {
    try {
      const response = await fetch("/api/tasks");
      if (response.ok) {
        const data = await response.json();
        setTasks(data);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // เพิ่ม task ใหม่
  const addTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    setLoading(true);
    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newTaskTitle,
          due_date: newTaskDueDate || null,
        }),
      });

      if (response.ok) {
        setNewTaskTitle("");
        setNewTaskDueDate("");
        await fetchTasks();
      }
    } catch (error) {
      console.error("Error adding task:", error);
    } finally {
      setLoading(false);
    }
  };

  // อัพเดทสถานะ completed
  const toggleTask = async (id: number, completed: boolean) => {
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !completed }),
      });

      if (response.ok) {
        await fetchTasks();
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // ลบ task
  const deleteTask = async (id: number) => {
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await fetchTasks();
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
      <main className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-8 text-center">
          📝 Todo List
        </h1>

        <TaskForm
          newTaskTitle={newTaskTitle}
          newTaskDueDate={newTaskDueDate}
          loading={loading}
          onTitleChange={setNewTaskTitle}
          onDueDateChange={setNewTaskDueDate}
          onSubmit={addTask}
        />

        <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />

        <TaskStats tasks={tasks} />
      </main>
    </div>
  );
}
