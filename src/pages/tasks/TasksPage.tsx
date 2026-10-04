import {
  Check,
  Circle,
  Edit3,
  Plus,
  Search,
  Trash2,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import type { FormEvent } from "react";

import WorkspaceShell from "../../components/workspace/WorkspaceShell";
import { initialTasks, type Task, type TaskPriority, type TaskStatus } from "../../data/tasks";
import { useLocalStorage } from "../../hooks/useLocalStorage";

import "./TasksPage.css";

const filters = ["All", "Pending", "In Progress", "Done"] as const;

export default function TasksPage() {
  const [tasks, setTasks] = useLocalStorage<Task[]>(
    "careerquest_tasks",
    initialTasks,
  );

  const [activeFilter, setActiveFilter] =
    useState<(typeof filters)[number]>("All");

  const [searchTerm, setSearchTerm] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const [form, setForm] = useState({
    title: "",
    priority: "Medium" as TaskPriority,
    status: "Pending" as TaskStatus,
    category: "Learning",
  });

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesFilter =
        activeFilter === "All" || task.status === activeFilter;

      const normalizedSearch = searchTerm.toLowerCase().trim();

      const matchesSearch =
        !normalizedSearch ||
        task.title.toLowerCase().includes(normalizedSearch) ||
        task.category.toLowerCase().includes(normalizedSearch) ||
        task.priority.toLowerCase().includes(normalizedSearch);

      return matchesFilter && matchesSearch;
    });
  }, [tasks, activeFilter, searchTerm]);

  const openAddModal = () => {
    setEditingTask(null);

    setForm({
      title: "",
      priority: "Medium",
      status: "Pending",
      category: "Learning",
    });

    setIsModalOpen(true);
  };

  const openEditModal = (task: Task) => {
    setEditingTask(task);

    setForm({
      title: task.title,
      priority: task.priority,
      status: task.status,
      category: task.category,
    });

    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.title.trim()) return;

    if (editingTask) {
      setTasks((current) =>
        current.map((task) =>
          task.id === editingTask.id
            ? {
                ...task,
                title: form.title.trim(),
                priority: form.priority,
                status: form.status,
                statusBeforeDone:
                  form.status === task.status
                    ? task.statusBeforeDone
                    : form.status === "Done" && task.status !== "Done"
                      ? task.status
                      : undefined,
                category: form.category.trim() || "Learning",
              }
            : task,
        ),
      );
    } else {
      const newTask: Task = {
        id: Date.now(),
        title: form.title.trim(),
        priority: form.priority,
        status: form.status,
        category: form.category.trim() || "Learning",
        createdAt: new Date().toISOString(),
      };

      setTasks((current) => [newTask, ...current]);
    }

    closeModal();
  };

  const deleteTask = (id: number) => {
    setTasks((current) => current.filter((task) => task.id !== id));
  };

  const completeTask = (id: number) => {
    setTasks((current) =>
      current.map((task) =>
        task.id === id
          ? {
              ...task,
              status:
                task.status === "Done"
                  ? task.statusBeforeDone ?? "Pending"
                  : "Done",
              statusBeforeDone:
                task.status === "Done" ? undefined : task.status,
            }
          : task,
      ),
    );
  };

  const getPriorityClass = (priority: TaskPriority) => {
    return `task-priority task-priority-${priority.toLowerCase()}`;
  };

  const getStatusClass = (status: TaskStatus) => {
    return `task-status task-status-${status
      .toLowerCase()
      .replace(" ", "-")}`;
  };

  return (
    <WorkspaceShell
      title="My Tasks"
      description="Organize your learning tasks, track progress, and keep your career development moving."
      action={
        <button type="button" className="tasks-add-button" onClick={openAddModal}>
          <Plus size={16} />
          Add Task
        </button>
      }
    >
      <section className="tasks-summary-grid">
        <div className="tasks-summary-card">
          <span>Total Tasks</span>
          <strong>{tasks.length}</strong>
        </div>

        <div className="tasks-summary-card">
          <span>Pending</span>
          <strong>{tasks.filter((task) => task.status === "Pending").length}</strong>
        </div>

        <div className="tasks-summary-card">
          <span>In Progress</span>
          <strong>
            {tasks.filter((task) => task.status === "In Progress").length}
          </strong>
        </div>

        <div className="tasks-summary-card tasks-summary-card-orange">
          <span>Completed</span>
          <strong>{tasks.filter((task) => task.status === "Done").length}</strong>
        </div>
      </section>

      <section className="tasks-panel">
        <div className="tasks-toolbar">
          <div className="tasks-filters">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`tasks-filter ${
                  activeFilter === filter ? "tasks-filter-active" : ""
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <label className="tasks-search">
            <Search size={16} />
            <input
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search tasks..."
            />
          </label>
        </div>

        <div className="tasks-list">
          {filteredTasks.length === 0 ? (
            <div className="tasks-empty">
              <Check size={24} />
              <strong>No tasks found</strong>
              <span>Try another search or create a new task.</span>
            </div>
          ) : (
            filteredTasks.map((task, index) => (
              <article
                className="task-row"
                key={task.id}
                style={{ animationDelay: `${index * 45}ms` }}
              >
                <button
                  type="button"
                  className={`task-complete-button ${
                    task.status === "Done" ? "task-complete-active" : ""
                  }`}
                  onClick={() => completeTask(task.id)}
                  aria-label={`Mark ${task.title} as ${
                    task.status === "Done" ? "pending" : "complete"
                  }`}
                >
                  {task.status === "Done" ? (
                    <Check size={14} />
                  ) : (
                    <Circle size={15} />
                  )}
                </button>

                <div className="task-row-content">
                  <div className="task-row-title-line">
                    <h3 className={task.status === "Done" ? "task-done" : ""}>
                      {task.title}
                    </h3>

                    <span className={getPriorityClass(task.priority)}>
                      {task.priority}
                    </span>
                  </div>

                  <div className="task-row-meta">
                    <span>{task.category}</span>
                    <span className={getStatusClass(task.status)}>
                      {task.status}
                    </span>
                  </div>
                </div>

                <div className="task-row-actions">
                  <button
                    type="button"
                    onClick={() => openEditModal(task)}
                    aria-label={`Edit ${task.title}`}
                  >
                    <Edit3 size={15} />
                  </button>

                  <button
                    type="button"
                    onClick={() => deleteTask(task.id)}
                    aria-label={`Delete ${task.title}`}
                    className="task-delete-button"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </article>
            ))
          )}
        </div>
      </section>

      {isModalOpen && (
        <div className="tasks-modal-backdrop" role="presentation">
          <div className="tasks-modal">
            <div className="tasks-modal-header">
              <div>
                <span>TASK MANAGEMENT</span>
                <h2>{editingTask ? "Edit Task" : "Add Task"}</h2>
              </div>

              <button
                type="button"
                onClick={closeModal}
                aria-label="Close modal"
              >
                <X size={19} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <label>
                Task title
                <input
                  value={form.title}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      title: event.target.value,
                    }))
                  }
                  placeholder="e.g. Finish React Hooks lesson"
                  autoFocus
                />
              </label>

              <div className="tasks-form-grid">
                <label>
                  Priority
                  <select
                    value={form.priority}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        priority: event.target.value as TaskPriority,
                      }))
                    }
                  >
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                </label>

                <label>
                  Status
                  <select
                    value={form.status}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        status: event.target.value as TaskStatus,
                      }))
                    }
                  >
                    <option>Pending</option>
                    <option>In Progress</option>
                    <option>Done</option>
                  </select>
                </label>
              </div>

              <label>
                Category
                <input
                  value={form.category}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      category: event.target.value,
                    }))
                  }
                  placeholder="React, JavaScript, Project..."
                />
              </label>

              <div className="tasks-modal-actions">
                <button
                  type="button"
                  className="tasks-cancel-button"
                  onClick={closeModal}
                >
                  Cancel
                </button>

                <button type="submit" className="tasks-save-button">
                  {editingTask ? "Save Changes" : "Create Task"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </WorkspaceShell>
  );
}