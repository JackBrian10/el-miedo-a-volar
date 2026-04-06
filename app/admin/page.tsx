"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";
import { supabaseAuth } from "../lib/supabase-auth";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  arrayMove,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Illustration {
  id: string;
  title: string;
  image_url: string;
  display_order: number;
}

function SortableCard({
  item,
  onDelete,
  isDeleting,
  onMoveUp,
  onMoveDown,
  onRenameTitle,
}: {
  item: Illustration;
  onDelete: (id: string, imageUrl: string) => void;
  isDeleting: boolean;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onRenameTitle: (id: string, title: string) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [titleValue, setTitleValue] = useState(item.title);

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 50 : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-card border border-accent/20 rounded-xl overflow-hidden group relative"
    >
      {/* Drag handle — desktop only */}
      <div
        {...attributes}
        {...listeners}
        className="absolute top-2 left-2 z-10 bg-white/80 rounded-full w-7 h-7 items-center justify-center cursor-grab active:cursor-grabbing hidden sm:flex opacity-0 group-hover:opacity-100 transition-opacity"
        title="Drag to reorder"
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <circle cx="4" cy="3" r="1" fill="#888" />
          <circle cx="8" cy="3" r="1" fill="#888" />
          <circle cx="4" cy="6" r="1" fill="#888" />
          <circle cx="8" cy="6" r="1" fill="#888" />
          <circle cx="4" cy="9" r="1" fill="#888" />
          <circle cx="8" cy="9" r="1" fill="#888" />
        </svg>
      </div>

      <div className="aspect-[3/4] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.image_url}
          alt={item.title}
          className="w-full h-full object-cover"
          loading="lazy"
          draggable={false}
        />
      </div>
      <div className="p-2">
        {editing ? (
          <input
            autoFocus
            value={titleValue}
            onChange={(e) => setTitleValue(e.target.value)}
            onBlur={() => { setEditing(false); onRenameTitle(item.id, titleValue); }}
            onKeyDown={(e) => { if (e.key === "Enter") { setEditing(false); onRenameTitle(item.id, titleValue); } if (e.key === "Escape") { setEditing(false); setTitleValue(item.title); } }}
            className="w-full text-xs bg-background border border-accent/30 rounded px-1.5 py-0.5 text-foreground outline-none focus:border-accent"
          />
        ) : (
          <p
            className="text-foreground/50 text-xs truncate cursor-pointer hover:text-accent transition-colors"
            title="Click to edit title"
            onClick={() => setEditing(true)}
          >
            {titleValue}
          </p>
        )}
      </div>

      {/* Delete button — always visible on mobile, hover on desktop */}
      <button
        onClick={() => onDelete(item.id, item.image_url)}
        disabled={isDeleting}
        className="absolute top-2 right-2 bg-white/90 hover:bg-accent hover:text-white text-foreground/60 rounded-full w-7 h-7 flex items-center justify-center text-xs transition-colors sm:opacity-0 sm:group-hover:opacity-100 disabled:opacity-50"
        title="Delete"
      >
        {isDeleting ? "..." : "✕"}
      </button>

      {/* Mobile move buttons — always visible on mobile only */}
      <div className="absolute top-2 left-2 flex flex-col gap-1 sm:hidden">
        <button
          onClick={onMoveUp}
          className="bg-white/90 text-foreground/60 rounded-full w-7 h-7 flex items-center justify-center text-xs"
          title="Move up"
        >▲</button>
        <button
          onClick={onMoveDown}
          className="bg-white/90 text-foreground/60 rounded-full w-7 h-7 flex items-center justify-center text-xs"
          title="Move down"
        >▼</button>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [illustrations, setIllustrations] = useState<Illustration[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [draggingOver, setDraggingOver] = useState(false);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  useEffect(() => {
    supabaseAuth.auth.getSession().then(({ data: { session } }) => {
      console.log("Session:", session?.access_token ? "exists" : "missing");
      if (!session) router.push("/admin/login");
    });
    fetchIllustrations();
  }, [router]);

  const fetchIllustrations = async () => {
    const { data } = await supabaseAuth
      .from("illustrations")
      .select("id, title, image_url, display_order")
      .order("display_order");
    if (data) setIllustrations(data);
  };

  const handleRenameTitle = async (id: string, title: string) => {
    await supabaseAuth.from("illustrations").update({ title }).eq("id", id);
    setIllustrations((prev) => prev.map((i) => i.id === id ? { ...i, title } : i));
  };

  const handleMove = async (id: string, direction: "up" | "down") => {
    const index = illustrations.findIndex((i) => i.id === id);
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= illustrations.length) return;
    const reordered = arrayMove(illustrations, index, newIndex).map((item, idx) => ({
      ...item,
      display_order: idx + 1,
    }));
    setIllustrations(reordered);
    setSaving(true);
    await Promise.all(
      reordered.map((item) =>
        supabaseAuth.from("illustrations").update({ display_order: item.display_order }).eq("id", item.id)
      )
    );
    setSaving(false);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = illustrations.findIndex((i) => i.id === active.id);
    const newIndex = illustrations.findIndex((i) => i.id === over.id);
    const reordered = arrayMove(illustrations, oldIndex, newIndex).map((item, idx) => ({
      ...item,
      display_order: idx + 1,
    }));

    setIllustrations(reordered);
    setSaving(true);

    await Promise.all(
      reordered.map((item) =>
        supabaseAuth.from("illustrations").update({ display_order: item.display_order }).eq("id", item.id)
      )
    );

    setSaving(false);
  };

  const resizeToWebP = (file: File, maxWidth = 1200): Promise<Blob> =>
    new Promise((resolve, reject) => {
      const img = new Image();
      const url = URL.createObjectURL(file);
      img.onload = () => {
        const scale = Math.min(1, maxWidth / img.width);
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        canvas.getContext("2d")!.drawImage(img, 0, 0, canvas.width, canvas.height);
        URL.revokeObjectURL(url);
        canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error("Conversion failed")), "image/webp", 0.82);
      };
      img.onerror = reject;
      img.src = url;
    });

  const uploadFiles = async (files: FileList | File[]) => {
    if (!files || files.length === 0) return;

    setUploading(true);
    setUploadError(null);

    for (const file of Array.from(files)) {
      const baseName = file.name
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, "_").replace(/[()]/g, "").toLowerCase()
        .replace(/\.[^.]+$/, "");
      const cleaned = baseName + ".webp";

      const webpBlob = await resizeToWebP(file).catch(() => null);
      const uploadFile = webpBlob ?? file;
      const mimeType = webpBlob ? "image/webp" : "image/jpeg";

      const { error: uploadErr } = await supabaseAuth.storage
        .from("illustrations")
        .upload(cleaned, uploadFile, { contentType: mimeType, upsert: true });

      if (uploadErr) {
        setUploadError(`Upload failed: ${uploadErr.message}`);
        continue;
      }

      const { data: urlData } = supabaseAuth.storage.from("illustrations").getPublicUrl(cleaned);
      const title = cleaned.replace(/\.[^.]+$/, "").replace(/_/g, " ").trim();
      const nextOrder = illustrations.length + 1;

      const { data: { session } } = await supabaseAuth.auth.getSession();
      console.log("Insert with token:", session?.access_token?.slice(0, 20));

      await supabaseAuth.from("illustrations").insert({
        title,
        image_url: urlData.publicUrl,
        display_order: nextOrder,
        is_published: true,
      });
    }

    await fetchIllustrations();
    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
    setUploadSuccess(true);
    setTimeout(() => setUploadSuccess(false), 3000);
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) await uploadFiles(e.target.files);
  };

  const handleDelete = async (id: string, imageUrl: string) => {
    if (!confirm("Delete this illustration?")) return;
    setDeletingId(id);
    const filename = imageUrl.split("/").pop()!;
    await supabaseAuth.storage.from("illustrations").remove([filename]);
    await supabaseAuth.from("illustrations").delete().eq("id", id);
    setIllustrations((prev) => prev.filter((i) => i.id !== id));
    setDeletingId(null);
  };

  const handleLogout = async () => {
    await supabaseAuth.auth.signOut();
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-background px-4 py-10">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.webp" alt="el miedo a volar" className="h-20 w-auto" style={{ mixBlendMode: "multiply" }} />
            <h1 className="text-xl font-bold text-foreground">Admin</h1>
          </div>
          <div className="flex items-center gap-6">
            <a
              href="/"
              className="text-sm text-foreground/50 hover:text-accent transition-colors"
            >
              ← Home
            </a>
            <button
              onClick={handleLogout}
              className="text-sm text-foreground/50 hover:text-accent transition-colors"
            >
              Log out
            </button>
          </div>
        </div>

        {/* Upload */}
        <div className="bg-card border border-accent/20 rounded-2xl p-6 mb-10">
          <h2 className="text-lg font-bold text-foreground mb-4">Upload Illustrations</h2>
          <div
            className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors ${
              draggingOver
                ? "border-accent bg-accent/5 scale-[1.01]"
                : "border-accent/30 hover:border-accent/60"
            }`}
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setDraggingOver(true); }}
            onDragLeave={() => setDraggingOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDraggingOver(false);
              if (e.dataTransfer.files.length > 0) uploadFiles(e.dataTransfer.files);
            }}
          >
            <p className="text-3xl mb-3">{draggingOver ? "📂" : "🖼️"}</p>
            <p className="text-foreground/60 text-sm font-medium">
              {draggingOver ? "Drop to upload" : "Drag & drop images here"}
            </p>
            <p className="text-foreground/30 text-xs mt-1">or click to select — PNG, JPG, WebP</p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp"
            multiple
            className="hidden"
            onChange={handleUpload}
          />
          {uploading && <p className="text-accent text-sm mt-3 text-center">Uploading...</p>}
          {uploadError && <p className="text-red-500 text-sm mt-3 text-center">{uploadError}</p>}
          {uploadSuccess && (
            <p className="text-green-600 text-sm mt-3 text-center font-medium">✓ Upload successful!</p>
          )}
        </div>

        {/* Illustrations grid */}
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-lg font-bold text-foreground">
            Illustrations <span className="text-foreground/40 font-normal text-sm">({illustrations.length})</span>
          </h2>
          {saving && <span className="text-xs text-foreground/40">Saving order...</span>}
        </div>
        <p className="text-foreground/40 text-xs mb-4">Drag illustrations to reorder. Order is saved automatically.</p>

        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={illustrations.map((i) => i.id)} strategy={rectSortingStrategy}>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {illustrations.map((item) => (
                <SortableCard
                  key={item.id}
                  item={item}
                  onDelete={handleDelete}
                  isDeleting={deletingId === item.id}
                  onMoveUp={() => handleMove(item.id, "up")}
                  onMoveDown={() => handleMove(item.id, "down")}
                  onRenameTitle={handleRenameTitle}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
}
