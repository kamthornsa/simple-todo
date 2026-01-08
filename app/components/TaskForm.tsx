interface TaskFormProps {
  newTaskTitle: string;
  newTaskDueDate: string;
  loading: boolean;
  onTitleChange: (value: string) => void;
  onDueDateChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function TaskForm({
  newTaskTitle,
  newTaskDueDate,
  loading,
  onTitleChange,
  onDueDateChange,
  onSubmit,
}: TaskFormProps) {
  return (
    <form onSubmit={onSubmit} className="mb-8">
      <div className="flex flex-col gap-4 sm:flex-row">
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="เพิ่มงานใหม่..."
          className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          disabled={loading}
        />
        <input
          type="date"
          value={newTaskDueDate}
          onChange={(e) => onDueDateChange(e.target.value)}
          className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "กำลังเพิ่ม..." : "เพิ่ม"}
        </button>
      </div>
    </form>
  );
}
