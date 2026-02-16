"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

type Bookmark = {
  id: string;
  title: string;
  url: string;
  created_at: string;
};

export default function Dashboard() {
  const router = useRouter();

  const [user, setUser] = useState<any>(null);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  // ✅ Get Logged In User
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        router.push("/");
      } else {
        setUser(data.user);
        await fetchBookmarks(data.user.id);
      }

      setPageLoading(false);
    };

    getUser();
  }, [router]);

  // ✅ Fetch Bookmarks
  const fetchBookmarks = async (userId: string) => {
    const { data } = await supabase
      .from("bookmarks")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    setBookmarks((data as Bookmark[]) || []);
  };

  // ✅ Add Bookmark
  const addBookmark = async () => {
    if (!title.trim() || !url.trim()) return;

    setLoading(true);

    const { error } = await supabase.from("bookmarks").insert([
      {
        title: title.trim(),
        url: url.trim(),
        user_id: user.id,
      },
    ]);

    setLoading(false);

    if (!error) {
      setTitle("");
      setUrl("");
      fetchBookmarks(user.id);
    }
  };

  // ✅ Delete Bookmark
  const deleteBookmark = async (id: string) => {
    await supabase.from("bookmarks").delete().eq("id", id);
    fetchBookmarks(user.id);
  };

  // ✅ Logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  const handleKeyDownAdd = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addBookmark();
    }
  };

  if (pageLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-100">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-500 border-t-transparent" />
          <p className="text-sm text-slate-300">Loading your dashboard…</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-4xl flex-col px-4 py-8">
        {/* Top bar */}
        <header className="mb-8 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold tracking-tight">
              Hey, {user.email?.split("@")[0] || user.email}
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              Save and manage your favorite links in one place.
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1 rounded-full border border-slate-700 bg-slate-900 px-4 py-1.5 text-xs font-medium text-slate-200 shadow-sm transition hover:border-red-500 hover:bg-red-500/10 hover:text-red-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
            Logout
          </button>
        </header>

        {/* Content layout */}
        <main className="grid gap-6 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1.4fr)]">
          {/* Add Bookmark Card */}
          <section
            className="group rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900/80 to-slate-950/80 p-5 shadow-lg shadow-slate-950/40 transition hover:border-slate-600 hover:shadow-slate-900/80 focus-within:border-indigo-500 focus-within:shadow-indigo-500/30"
          >
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-400">
                  New bookmark
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  Paste a URL and give it a label; hit Enter or click add.
                </p>
              </div>
              <span className="rounded-full bg-slate-900 px-2 py-0.5 text-[10px] font-medium text-slate-400">
                {bookmarks.length} saved
              </span>
            </div>

            <div className="space-y-3">
              <div className="space-y-1.5">
                <label
                  htmlFor="title"
                  className="text-xs font-medium text-slate-300"
                >
                  Title
                </label>
                <input
                  id="title"
                  type="text"
                  placeholder="e.g. Supabase Docs – Auth"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  onKeyDown={handleKeyDownAdd}
                  className="w-full rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 shadow-inner shadow-slate-950 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/60"
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="url"
                  className="text-xs font-medium text-slate-300"
                >
                  URL
                </label>
                <input
                  id="url"
                  type="url"
                  placeholder="https://…"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onKeyDown={handleKeyDownAdd}
                  className="w-full rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 shadow-inner shadow-slate-950 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/60"
                />
              </div>

              <button
                onClick={addBookmark}
                disabled={loading || !title.trim() || !url.trim()}
                className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-500 px-4 py-2 text-sm font-medium text-slate-50 shadow-md shadow-indigo-500/30 transition hover:bg-indigo-400 hover:shadow-lg hover:shadow-indigo-500/50 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400 disabled:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/80"
              >
                {loading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-200 border-t-transparent" />
                    Saving…
                  </>
                ) : (
                  <>
                    <span className="text-lg leading-none">＋</span>
                    Add bookmark
                  </>
                )}
              </button>
            </div>
          </section>

          {/* Bookmarks list */}
          <section className="flex min-h-[260px] flex-col rounded-2xl border border-slate-800 bg-slate-950/70 p-5 shadow-lg shadow-slate-950/40">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-400">
                Your links
              </h2>
              {bookmarks.length > 0 && (
                <span className="text-[11px] text-slate-500">
                  Newest first
                </span>
              )}
            </div>

            {bookmarks.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center rounded-xl border border-dashed border-slate-800 bg-slate-950/50 px-4 py-6 text-center">
                <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-slate-500">
                  <span className="text-lg">🔖</span>
                </div>
                <p className="text-sm font-medium text-slate-200">
                  No bookmarks yet
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Add your first link using the form on the left.
                </p>
              </div>
            ) : (
              <div className="flex-1 space-y-2 overflow-y-auto pr-1">
                {bookmarks.map((bookmark) => (
                  <div
                    key={bookmark.id}
                    className="group flex items-center justify-between gap-3 rounded-lg border border-slate-800 bg-slate-950/70 px-3 py-2 text-sm text-slate-100 shadow-sm transition hover:-translate-y-[1px] hover:border-indigo-500/70 hover:bg-slate-900/80 hover:shadow-md hover:shadow-slate-900/80"
                  >
                    <div className="min-w-0 flex-1">
                      <a
                        href={bookmark.url}
                        target="_blank"
                        rel="noreferrer"
                        className="line-clamp-1 break-all text-[13px] font-medium text-slate-100 underline-offset-2 transition hover:text-indigo-300 hover:underline"
                      >
                        {bookmark.title || bookmark.url}
                      </a>
                      <p className="mt-0.5 line-clamp-1 break-all text-[11px] text-slate-500">
                        {bookmark.url}
                      </p>
                    </div>

                    <button
                      onClick={() => deleteBookmark(bookmark.id)}
                      className="shrink-0 rounded-full border border-transparent px-2 py-1 text-[11px] font-medium text-red-300 opacity-70 transition hover:border-red-500/40 hover:bg-red-500/10 hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/80"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}
