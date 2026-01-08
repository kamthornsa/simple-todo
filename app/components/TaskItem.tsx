interface Task {
  id: number;
  title: string;
  completed: boolean;
  due_date: string | null;
}

interface TaskItemProps {
  task: Task;
  onToggle: (id: number, completed: boolean) => void;
  onDelete: (id: number) => void;
}

export default function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  return (
    <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:shadow-md transition-shadow">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id, task.completed)}
        className="w-5 h-5 cursor-pointer accent-blue-600"
      />
      <div className="flex-1">
        <p
          className={`text-lg ${
            task.completed
              ? "line-through text-gray-400"
              : "text-gray-800 dark:text-white"
          }`}
        >
          {task.title}
        </p>
        {task.due_date && (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            📅 ครบกำหนด: {new Date(task.due_date).toLocaleDateString("th-TH")}
          </p>
        )}
      </div>
      <button
        onClick={() => onDelete(task.id)}
        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
      >
        ลบ
      </button>
    </div>
  );
}
