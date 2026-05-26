"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase/config";
import { collection, addDoc, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import { Plus, Trash2, FileText, Loader2 } from "lucide-react";

interface Note {
  id: string;
  content: string;
}

export default function NotesPage() {
  const { user } = useAuth();
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  const fetchNotes = async () => {
    if (!user) return;
    try {
      const q = query(collection(db, "notes"), where("userId", "==", user.uid));
      const querySnapshot = await getDocs(q);
      const notesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        content: doc.data().content,
      }));
      setNotes(notesData);
    } catch (error) {
      console.error("Gagal mengambil catatan:", error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [user]);

  const addNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim() || !user) return;
    
    setIsLoading(true);
    try {
      await addDoc(collection(db, "notes"), {
        content: newNote,
        userId: user.uid,
        createdAt: new Date(),
      });
      setNewNote("");
      fetchNotes();
    } catch (error) {
      console.error("Gagal menyimpan catatan:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteNote = async (noteId: string) => {
    try {
      await deleteDoc(doc(db, "notes", noteId));
      setNotes(notes.filter(note => note.id !== noteId));
    } catch (error) {
      console.error("Gagal menghapus catatan:", error);
    }
  };

  if (isFetching) {
    return (
      <div className="flex justify-center items-center h-64 text-indigo-400">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-8 flex items-center gap-2 md:gap-3 text-slate-100">
        <FileText className="text-indigo-500 w-6 md:w-8 h-6 md:h-8" />
        Catatan Belajar
      </h1>

      <form onSubmit={addNote} className="bg-slate-900 p-4 md:p-6 rounded-lg md:rounded-2xl mb-4 md:mb-8 shadow-xl">
        <textarea
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Tulis ringkasan materi atau catatan praktikum di sini..."
          className="w-full bg-slate-950 text-slate-100 rounded-lg md:rounded-xl p-3 md:p-4 text-sm md:text-base focus:ring-2 focus:ring-indigo-500 focus:outline-none min-h-[100px] md:min-h-[120px] mb-3 md:mb-4 shadow-inner"
        />
        <button
          type="submit"
          disabled={isLoading || !newNote.trim()}
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 md:px-6 py-2 md:py-2 rounded-lg md:rounded-xl flex items-center gap-2 font-medium transition-all disabled:opacity-50 text-sm md:text-base"
        >
          {isLoading ? <Loader2 className="w-4 md:w-5 h-4 md:h-5 animate-spin" /> : <Plus className="w-4 md:w-5 h-4 md:h-5" />}
          Simpan Catatan
        </button>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        {notes.length === 0 ? (
          <p className="text-slate-500 col-span-full text-center py-6 md:py-8 text-sm md:text-base">Belum ada catatan. Yuk buat catatan pertamamu!</p>
        ) : (
          notes.map((note) => (
            <div key={note.id} className="bg-slate-900 p-4 md:p-6 rounded-lg md:rounded-2xl flex flex-col justify-between group shadow-md hover:shadow-indigo-900/20 transition-all">
              <p className="text-slate-300 whitespace-pre-wrap mb-4 md:mb-6 text-sm md:text-base break-words">{note.content}</p>
              <button
                onClick={() => deleteNote(note.id)}
                className="self-end p-2 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                title="Hapus Catatan"
              >
                <Trash2 className="w-4 md:w-5 h-4 md:h-5" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}