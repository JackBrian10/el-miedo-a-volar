import { createClient } from "@supabase/supabase-js";
import { readFileSync, readdirSync } from "fs";
import { join, extname, basename } from "path";

const supabaseUrl = "https://kowwnptiiukgcrsghhbn.supabase.co";
const supabaseKey = "sb_publishable_65y-zPae1XNhOqy7xBtacA_3FFSbOVW";
const supabase = createClient(supabaseUrl, supabaseKey);

const ILLUSTRATIONS_DIR = "/tmp/ilustraciones_webp2";

const files = readdirSync(ILLUSTRATIONS_DIR).filter((f) =>
  [".png", ".jpg", ".jpeg", ".webp"].includes(extname(f).toLowerCase())
);

console.log(`Found ${files.length} images. Uploading...`);

for (let i = 0; i < files.length; i++) {
  const file = files[i];
  const filePath = join(ILLUSTRATIONS_DIR, file);
  const fileBuffer = readFileSync(filePath);
  const ext = extname(file).toLowerCase();
  const mimeType = ext === ".webp" ? "image/webp" : ext === ".png" ? "image/png" : "image/jpeg";

  // Clean filename for storage
  const storageName = file
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "_")
    .replace(/[()]/g, "")
    .toLowerCase();

  console.log(`[${i + 1}/${files.length}] Uploading ${storageName}...`);

  const { error: uploadError } = await supabase.storage
    .from("illustrations")
    .upload(storageName, fileBuffer, { contentType: mimeType, upsert: true });

  if (uploadError) {
    console.error(`  ✗ Upload failed: ${uploadError.message}`);
    continue;
  }

  const { data: urlData } = supabase.storage
    .from("illustrations")
    .getPublicUrl(storageName);

  const title = basename(file, extname(file))
    .replace(/_/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const { error: dbError } = await supabase.from("illustrations").insert({
    title,
    image_url: urlData.publicUrl,
    display_order: i + 1,
    is_published: true,
  });

  if (dbError) {
    console.error(`  ✗ DB insert failed: ${dbError.message}`);
  } else {
    console.log(`  ✓ Done`);
  }
}

console.log("\nAll done!");
