import TaskItem from "./TaskItem";

interface Task {
  id: number;
  title: string;
  completed: boolean;
  due_date: string | null;
  created_at: string;
  updated_at: string;
}

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: number, completed: boolean) => void;
  onDelete: (id: number) => void;
}

export default function TaskList({ tasks, onToggle, onDelete }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="space-y-3">
        <p className="text-center text-gray-500 dark:text-gray-400 py-8">
          ไม่มีงานในรายการ
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
