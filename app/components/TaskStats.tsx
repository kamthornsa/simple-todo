interface Task {
  completed: boolean;
}

interface TaskStatsProps {
  tasks: Task[];
}

export default function TaskStats({ tasks }: TaskStatsProps) {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const pending = tasks.filter((t) => !t.completed).length;

  return (
    <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-600">
      <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
        <span>ทั้งหมด: {total} งาน</span>
        <span>เสร็จแล้ว: {completed} งาน</span>
        <span>ค้างอยู่: {pending} งาน</span>
      </div>
    </div>
  );
}
