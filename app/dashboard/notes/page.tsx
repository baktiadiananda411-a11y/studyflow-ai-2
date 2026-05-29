// @ts-nocheck
"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, FileText, Save, Clock, ChevronRight } from "lucide-react";

interface Note {
  id: string;
  title: string;
  content: string;
  date: string;
}

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [activeNote, setActiveNote] = useState<Note | null>(null);

  // Load catatan dari penyimpanan browser saat pertama kali dibuka
  useEffect(() => {
    const savedNotes = localStorage.getItem("studyflow_notes");
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  // Simpan otomatis ke browser setiap ada perubahan pada 'notes'
  useEffect(() => {
    localStorage.setItem("studyflow_notes", JSON.stringify(notes));
  }, [notes]);

  const createNewNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: "Catatan Baru",
      content: "",
      date: new Date().toLocaleDateString("id-ID", { day: 'numeric', month: 'short', year: 'numeric' }),
    };
    setNotes([newNote, ...notes]);
    setActiveNote(newNote);
  };

  const updateActiveNote = (field: "title" | "content", value: string) => {
    if (!activeNote) return;
    
    const updatedNote = { ...activeNote, [field]: value };
    setActiveNote(updatedNote);
    
    // Update juga di daftar catatan utama
    setNotes(notes.map((note) => (note.id === activeNote.id ? updatedNote : note)));
  };

  const deleteNote = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Mencegah klik menyebar ke elemen induk
    const filteredNotes = notes.filter((note) => note.id !== id);
    setNotes(filteredNotes);
    if (activeNote?.id === id) {
      setActiveNote(null);
    }
  };

  return (
    <div className="flex h-full min-h-screen md:min-h-[calc(100vh-76px)] w-full bg-slate-950 text-slate-200">
      
      {/* SIDEBAR KIRI: DAFTAR CATATAN */}
      <div className={`${activeNote ? 'hidden md:flex' : 'flex'} flex-col w-full md:w-80 border-r border-slate-800 bg-slate-900/40 h-full`}>
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <FileText className="w-6 h-6 text-indigo-400" /> Catatanku
          </h1>
          <button 
            onClick={createNewNote}
            className="mt-6 w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-3 rounded-xl font-medium transition-all shadow-lg shadow-indigo-500/20"
          >
            <Plus className="w-5 h-5" /> Buat Catatan
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {notes.length === 0 ? (
            <div className="text-center text-slate-500 mt-10">
              <FileText className="w-10 h-10 mx-auto mb-3 opacity-20" />
              <p className="text-sm">Belum ada catatan.<br/>Buat catatan pertamamu!</p>
            </div>
          ) : (
            notes.map((note) => (
              <div 
                key={note.id}
                onClick={() => setActiveNote(note)}
                className={`group p-4 rounded-2xl cursor-pointer transition-all border ${activeNote?.id === note.id ? 'bg-indigo-500/10 border-indigo-500/30' : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/80'}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className={`font-semibold truncate pr-4 ${activeNote?.id === note.id ? 'text-indigo-300' : 'text-slate-200'}`}>
                    {note.title || "Tanpa Judul"}
                  </h3>
                  <button onClick={(e) => deleteNote(note.id, e)} className="text-slate-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs text-slate-500 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {note.date}
                </p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* AREA KANAN: EDITOR CATATAN */}
      <div className={`${!activeNote ? 'hidden md:flex' : 'flex'} flex-col flex-1 h-full bg-slate-950 relative`}>
        {activeNote ? (
          <div className="flex flex-col h-full">
            {/* Header Editor */}
            <div className="flex items-center gap-4 p-4 md:p-6 border-b border-slate-800/50">
              <button 
                onClick={() => setActiveNote(null)}
                className="md:hidden flex items-center text-slate-400 hover:text-white bg-slate-900 p-2 rounded-lg"
              >
                <ChevronRight className="w-5 h-5 rotate-180" />
              </button>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Save className="w-4 h-4" /> Tersimpan otomatis
              </div>
            </div>

            {/* Area Ketik */}
            <div className="flex-1 overflow-y-auto p-6 md:p-10 max-w-4xl mx-auto w-full">
              <input
                type="text"
                value={activeNote.title}
                onChange={(e) => updateActiveNote("title", e.target.value)}
                placeholder="Judul Catatan..."
                className="w-full bg-transparent border-none outline-none text-3xl md:text-5xl font-bold text-white mb-8 placeholder-slate-700"
              />
              <textarea
                value={activeNote.content}
                onChange={(e) => updateActiveNote("content", e.target.value)}
                placeholder="Mulai mengetik catatan pelajaranmu di sini..."
                className="w-full h-[60vh] bg-transparent border-none outline-none text-slate-300 text-lg leading-relaxed placeholder-slate-700 resize-none"
              ></textarea>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-slate-500">
            <FileText className="w-20 h-20 mb-6 opacity-10" />
            <h2 className="text-xl font-medium text-slate-400">Pilih atau Buat Catatan Baru</h2>
            <p className="mt-2 text-sm">Catatanmu akan tersimpan aman di perangkat ini.</p>
          </div>
        )}
      </div>

    </div>
  );
}