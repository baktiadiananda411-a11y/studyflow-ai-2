// @ts-nocheck
"use client";

import { useState, useEffect } from "react";
import { auth, db } from "@/lib/firebase/config"; 
import { onAuthStateChanged } from "firebase/auth";
import { collection, addDoc, updateDoc, deleteDoc, doc, query, where, orderBy, onSnapshot } from "firebase/firestore";
import { Plus, Trash2, FileText, Save, Clock, ChevronRight, CloudLightning } from "lucide-react";

interface Note {
  id: string;
  title: string;
  content: string;
  date: string;
  userId: string;
}

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [activeNote, setActiveNote] = useState<Note | null>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);

  // 1. Pantau Status Login Pengguna
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
        setNotes([]);
        setActiveNote(null);
      }
    });
    return () => unsubscribe();
  }, []);

  // 2. Ambil Data Catatan Real-time dari Firestore (Hanya milik user yang login)
  useEffect(() => {
    if (!currentUser) return;

    // Query: Ambil catatan milik userId ini, urutkan dari yang terbaru berdasarkan waktu pembuatan
    const q = query(
      collection(db, "notes"),
      where("userId", "==", currentUser.uid),
      orderBy("createdAt", "desc")
    );

    // onSnapshot membuat data otomatis ter-update di layar tanpa perlu refresh hlm
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const notesData: Note[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        notesData.push({
          id: doc.id,
          title: data.title,
          content: data.content,
          date: data.date,
          userId: data.userId,
        });
      });
      setNotes(notesData);
      
      // Jaga agar editor tetap sinkron jika catatan aktif di-update di tempat lain
      if (activeNote) {
        const currentActive = notesData.find(n => n.id === activeNote.id);
        if (currentActive) {
          setActiveNote(currentActive);
        }
      }
    }, (error) => {
      console.error("Gagal mengambil data dari Firestore:", error);
    });

    return () => unsubscribe();
  }, [currentUser]);

  // 3. Tambah Catatan Baru ke Firestore
  const createNewNote = async () => {
    if (!currentUser) return alert("Silakan login terlebih dahulu untuk membuat catatan!");

    const formattedDate = new Date().toLocaleDateString("id-ID", { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });

    try {
      const docRef = await addDoc(collection(db, "notes"), {
        title: "Catatan Baru",
        content: "",
        date: formattedDate,
        userId: currentUser.uid,
        createdAt: new Date() // Dipakai untuk sistem sorting/pengurutan
      });

      const newNote: Note = {
        id: docRef.id,
        title: "Catatan Baru",
        content: "",
        date: formattedDate,
        userId: currentUser.uid
      };
      
      setActiveNote(newNote);
    } catch (error) {
      console.error("Gagal menambah catatan:", error);
    }
  };

  // 4. Update Judul atau Isi Catatan ke Firestore
  const updateActiveNote = async (field: "title" | "content", value: string) => {
    if (!activeNote || !currentUser) return;
    
    // Update local state terlebih dahulu agar ketikan terasa instan & enteng
    const updatedNote = { ...activeNote, [field]: value };
    setActiveNote(updatedNote);
    setIsSaving(true);

    try {
      const noteDocRef = doc(db, "notes", activeNote.id);
      await updateDoc(noteDocRef, {
        [field]: value
      });
      setIsSaving(false);
    } catch (error) {
      console.error("Gagal mengupdate catatan ke database:", error);
      setIsSaving(false);
    }
  };

  // 5. Hapus Catatan dari Firestore
  const deleteNote = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); 
    if (!confirm("Apakah kamu yakin ingin menghapus catatan ini?")) return;

    try {
      await deleteDoc(doc(db, "notes", id));
      if (activeNote?.id === id) {
        setActiveNote(null);
      }
    } catch (error) {
      console.error("Gagal menghapus catatan:", error);
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
          {!currentUser ? (
            <div className="text-center text-slate-500 mt-10 p-2">
              <p className="text-sm">Silakan login di menu profil atau sidebar untuk melihat catatan cloud kamu.</p>
            </div>
          ) : notes.length === 0 ? (
            <div className="text-center text-slate-500 mt-10">
              <FileText className="w-10 h-10 mx-auto mb-3 opacity-20" />
              <p className="text-sm">Belum ada catatan database.<br/>Yuk buat sekarang!</p>
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
            <div className="flex items-center justify-between p-4 md:p-6 border-b border-slate-800/50">
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setActiveNote(null)}
                  className="md:hidden flex items-center text-slate-400 hover:text-white bg-slate-900 p-2 rounded-lg"
                >
                  <ChevronRight className="w-5 h-5 rotate-180" />
                </button>
                <div className="flex items-center gap-2 text-sm text-indigo-400 font-medium">
                  <Save className={`w-4 h-4 ${isSaving ? 'animate-spin' : ''}`} /> 
                  {isSaving ? "Menyimpan ke Cloud..." : "Tersimpan di Cloud"}
                </div>
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
                placeholder="Mulai menulis catatan pelajaran, rumus, atau materi penting..."
                className="w-full h-[60vh] bg-transparent border-none outline-none text-slate-300 text-lg leading-relaxed placeholder-slate-700 resize-none"
              ></textarea>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-slate-500">
            <CloudLightning className="w-20 h-20 mb-6 opacity-10 text-indigo-400" />
            <h2 className="text-xl font-medium text-slate-400">Cloud Notes Storage</h2>
            <p className="mt-2 text-sm text-center px-4">Pilih catatan di samping atau buat baru.<br/>Semua perubahan akan langsung disinkronisasi ke Firebase.</p>
          </div>
        )}
      </div>

    </div>
  );
}