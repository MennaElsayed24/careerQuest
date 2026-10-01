import {
  Edit3,
  Pin,
  PinOff,
  Plus,
  Search,
  Trash2,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import type { FormEvent } from "react";

import WorkspaceShell from "../../components/workspace/WorkspaceShell";
import { useLocalStorage } from "../../hooks/useLocalStorage";

import "./NotesPage.css";

interface Note {
  id: number;
  title: string;
  content: string;
  pinned: boolean;
  createdAt: string;
  updatedAt: string;
}

const initialNotes: Note[] = [
  {
    id: 1,
    title: "React Hooks Summary",
    content: "useState and useEffect examples...",
    pinned: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    title: "CSS Flexbox Tips",
    content: "justify-content, align-items, flex-direction...",
    pinned: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 3,
    title: "Router Setup Steps",
    content: "BrowserRouter, Routes, and Route...",
    pinned: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 4,
    title: "Component Ideas",
    content: "TaskCard, ProgressCard, Modal, Navbar...",
    pinned: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 5,
    title: "Props vs State",
    content: "Props are read-only. State is mutable...",
    pinned: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 6,
    title: "Project Checklist",
    content: "CRUD, Routing, Responsive Design, Props, State...",
    pinned: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export default function NotesPage() {
  const [notes, setNotes] = useLocalStorage<Note[]>(
    "careerquest_notes",
    initialNotes,
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);

  const [form, setForm] = useState({
    title: "",
    content: "",
  });

  const filteredNotes = useMemo(() => {
    const query = searchTerm.toLowerCase().trim();

    return [...notes]
      .sort((a, b) => Number(b.pinned) - Number(a.pinned))
      .filter(
        (note) =>
          !query ||
          note.title.toLowerCase().includes(query) ||
          note.content.toLowerCase().includes(query),
      );
  }, [notes, searchTerm]);

  const openAddModal = () => {
    setEditingNote(null);
    setForm({ title: "", content: "" });
    setIsModalOpen(true);
  };

  const openEditModal = (note: Note) => {
    setEditingNote(note);
    setForm({
      title: note.title,
      content: note.content,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingNote(null);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.title.trim() || !form.content.trim()) return;

    const now = new Date().toISOString();

    if (editingNote) {
      setNotes((current) =>
        current.map((note) =>
          note.id === editingNote.id
            ? {
                ...note,
                title: form.title.trim(),
                content: form.content.trim(),
                updatedAt: now,
              }
            : note,
        ),
      );
    } else {
      setNotes((current) => [
        {
          id: Date.now(),
          title: form.title.trim(),
          content: form.content.trim(),
          pinned: false,
          createdAt: now,
          updatedAt: now,
        },
        ...current,
      ]);
    }

    closeModal();
  };

  const deleteNote = (id: number) => {
    setNotes((current) => current.filter((note) => note.id !== id));
  };

  const togglePin = (id: number) => {
    setNotes((current) =>
      current.map((note) =>
        note.id === id
          ? {
              ...note,
              pinned: !note.pinned,
            }
          : note,
      ),
    );
  };

  return (
    <WorkspaceShell
      title="My Notes"
      description="Capture important ideas, learning notes, project thoughts, and anything you want to remember."
      action={
        <button type="button" className="notes-add-button" onClick={openAddModal}>
          <Plus size={16} />
          Add Note
        </button>
      }
    >
      <section className="notes-toolbar">
        <div>
          <span>YOUR KNOWLEDGE BASE</span>
          <strong>{notes.length} notes</strong>
        </div>

        <label className="notes-search">
          <Search size={16} />
          <input
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search notes..."
          />
        </label>
      </section>

      <section className="notes-grid">
        {filteredNotes.length === 0 ? (
          <div className="notes-empty">
            <Search size={24} />
            <strong>No notes found</strong>
            <span>Try another search or create a new note.</span>
          </div>
        ) : (
          filteredNotes.map((note, index) => (
            <article
              className={`note-card ${
                note.pinned ? "note-card-pinned" : ""
              }`}
              key={note.id}
              style={{ animationDelay: `${index * 55}ms` }}
            >
              <div className="note-card-top">
                <span className="note-card-label">
                  {note.pinned ? "PINNED NOTE" : "NOTE"}
                </span>

                <button
                  type="button"
                  onClick={() => togglePin(note.id)}
                  aria-label={note.pinned ? "Unpin note" : "Pin note"}
                  className={note.pinned ? "note-pin-active" : ""}
                >
                  {note.pinned ? <Pin size={15} /> : <PinOff size={15} />}
                </button>
              </div>

              <h2>{note.title}</h2>

              <p>{note.content}</p>

              <div className="note-card-footer">
                <span>
                  Updated{" "}
                  {new Date(note.updatedAt).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                  })}
                </span>

                <div>
                  <button
                    type="button"
                    onClick={() => openEditModal(note)}
                    aria-label={`Edit ${note.title}`}
                  >
                    <Edit3 size={14} />
                  </button>

                  <button
                    type="button"
                    onClick={() => deleteNote(note.id)}
                    aria-label={`Delete ${note.title}`}
                    className="note-delete"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </article>
          ))
        )}
      </section>

      {isModalOpen && (
        <div className="notes-modal-backdrop">
          <div className="notes-modal">
            <div className="notes-modal-header">
              <div>
                <span>NOTE MANAGEMENT</span>
                <h2>{editingNote ? "Edit Note" : "Add Note"}</h2>
              </div>

              <button type="button" onClick={closeModal}>
                <X size={19} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <label>
                Note title
                <input
                  value={form.title}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      title: event.target.value,
                    }))
                  }
                  placeholder="e.g. React Hooks Summary"
                  autoFocus
                />
              </label>

              <label>
                Note content
                <textarea
                  value={form.content}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      content: event.target.value,
                    }))
                  }
                  placeholder="Write your note here..."
                  rows={7}
                />
              </label>

              <div className="notes-modal-actions">
                <button
                  type="button"
                  className="notes-cancel-button"
                  onClick={closeModal}
                >
                  Cancel
                </button>

                <button type="submit" className="notes-save-button">
                  {editingNote ? "Save Changes" : "Create Note"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </WorkspaceShell>
  );
}