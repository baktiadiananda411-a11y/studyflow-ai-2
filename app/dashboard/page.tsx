import { BookOpen, Flame, Trophy } from "lucide-react";

const subjectCards = [
  {
    title: "Kalkulus Lanjut",
    status: "Sedang aktif",
    progress: "78% selesai",
    icon: BookOpen,
    accent: "from-indigo-500 to-sky-500",
  },
  {
    title: "Produk Kreatif",
    status: "Tugas due besok",
    progress: "3 modul tersisa",
    icon: Flame,
    accent: "from-orange-500 to-amber-400",
  },
  {
    title: "Bahasa Jawa",
    status: "Review vocabulary",
    progress: "52% selesai",
    icon: Trophy,
    accent: "from-violet-500 to-fuchsia-500",
  },
];

export default function DashboardPage() {
  return (
    <div className="w-full pb-6 md:pb-10">
      <div className="w-full space-y-6 md:space-y-10">
        <section className="rounded-2xl md:rounded-3xl border border-slate-800/80 bg-slate-950/70 p-4 md:p-6 lg:p-8 shadow-2xl shadow-slate-950/30 backdrop-blur-lg">
          <div className="flex flex-col gap-4 md:gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs md:text-sm uppercase tracking-[0.35em] text-slate-500 mb-2 md:mb-3">Selamat datang kembali</p>
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-semibold text-white">Halo, Bakti! 👋</h1>
              <p className="mt-2 md:mt-3 max-w-2xl text-sm md:text-base text-slate-400">Lihat ringkasan belajar hari ini, lanjutkan tugas, dan capai targetmu dengan lebih fokus.</p>
            </div>

            <div className="grid grid-cols-2 gap-3 md:gap-4">
              <div className="rounded-2xl md:rounded-3xl border border-slate-800/70 bg-slate-900/80 px-3 md:px-5 py-3 md:py-4 text-center">
                <p className="text-xs md:text-sm text-slate-400">Hari streak</p>
                <p className="mt-1 md:mt-2 text-2xl md:text-3xl font-semibold text-slate-100">3</p>
              </div>
              <div className="rounded-2xl md:rounded-3xl border border-slate-800/70 bg-slate-900/80 px-3 md:px-5 py-3 md:py-4 text-center">
                <p className="text-xs md:text-sm text-slate-400">Level belajar</p>
                <p className="mt-1 md:mt-2 text-2xl md:text-3xl font-semibold text-slate-100">12</p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:gap-6 lg:grid-cols-[1.5fr_1fr]">
          <div className="grid gap-4 md:gap-6">
            <div className="grid gap-3 md:gap-4 grid-cols-1 sm:grid-cols-2">
              {subjectCards.map((subject) => (
                <div key={subject.title} className="rounded-2xl md:rounded-3xl border border-slate-800/70 bg-slate-900/80 p-4 md:p-6 shadow-sm shadow-slate-950/20 transition hover:border-indigo-500/40 hover:bg-slate-900">
                  <div className="flex items-center justify-between gap-3 md:gap-4">
                    <div>
                      <p className="text-xs md:text-sm text-slate-400">Mata pelajaran</p>
                      <h2 className="mt-1 md:mt-2 text-lg md:text-xl font-semibold text-white">{subject.title}</h2>
                    </div>
                    <div className={`rounded-xl md:rounded-2xl bg-gradient-to-br ${subject.accent} p-2 md:p-3 text-white flex-shrink-0`}>
                      <subject.icon className="w-4 md:w-5 h-4 md:h-5" />
                    </div>
                  </div>
                  <div className="mt-3 md:mt-5 space-y-1 md:space-y-2">
                    <p className="text-xs md:text-sm text-slate-400">{subject.status}</p>
                    <p className="text-xs md:text-sm font-medium text-slate-100">{subject.progress}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-2xl md:rounded-3xl border border-slate-800/70 bg-slate-900/80 p-4 md:p-6 lg:p-8 shadow-sm shadow-slate-950/20">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 md:gap-4">
                <div>
                  <p className="text-xs md:text-sm uppercase tracking-[0.35em] text-slate-500">Fokus hari ini</p>
                  <h2 className="mt-2 md:mt-3 text-lg md:text-2xl font-semibold text-white">Tingkatkan produktivitas</h2>
                </div>
                <Flame className="w-6 md:w-7 h-6 md:h-7 text-orange-400 flex-shrink-0" />
              </div>

              <div className="mt-4 md:mt-6 grid gap-3 md:gap-4 grid-cols-1 sm:grid-cols-2">
                <div className="rounded-2xl md:rounded-3xl bg-slate-950/70 p-4 md:p-5">
                  <p className="text-xs md:text-sm text-slate-400">Target tugas</p>
                  <p className="mt-2 md:mt-3 text-base md:text-lg font-semibold text-white">Lengkapi ringkasan</p>
                </div>
                <div className="rounded-2xl md:rounded-3xl bg-slate-950/70 p-4 md:p-5">
                  <p className="text-xs md:text-sm text-slate-400">Waktu belajar</p>
                  <p className="mt-2 md:mt-3 text-base md:text-lg font-semibold text-white">2 jam lagi</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl md:rounded-3xl border border-slate-800/70 bg-slate-900/80 p-4 md:p-6 lg:p-8 shadow-sm shadow-slate-950/20">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 md:gap-4">
              <div>
                <p className="text-xs md:text-sm uppercase tracking-[0.35em] text-slate-500">Ringkasan belajarmu</p>
                <h2 className="mt-2 md:mt-3 text-lg md:text-2xl font-semibold text-white">Aktivitas terbaru</h2>
              </div>
              <Trophy className="w-6 md:w-7 h-6 md:h-7 text-violet-400 flex-shrink-0" />
            </div>

            <div className="mt-6 md:mt-8 space-y-3 md:space-y-4">
              <div className="rounded-2xl md:rounded-3xl bg-slate-950/70 p-4 md:p-5">
                <p className="text-xs md:text-sm text-slate-400">Kalkulus Lanjut</p>
                <p className="mt-1 md:mt-2 text-sm md:text-base text-white">Menyelesaikan 2 modul dan latihan konsep integral.</p>
              </div>
              <div className="rounded-2xl md:rounded-3xl bg-slate-950/70 p-4 md:p-5">
                <p className="text-xs md:text-sm text-slate-400">Produk Kreatif</p>
                <p className="mt-1 md:mt-2 text-sm md:text-base text-white">Mempersiapkan presentasi ide bisnis untuk tugas minggu ini.</p>
              </div>
              <div className="rounded-2xl md:rounded-3xl bg-slate-950/70 p-4 md:p-5">
                <p className="text-xs md:text-sm text-slate-400">Bahasa Jawa</p>
                <p className="mt-1 md:mt-2 text-sm md:text-base text-white">Latihan kosa kata dan frasa sehari-hari.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
