import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const SOURCE_DIR = 'C:\\Users\\dkaua\\Pictures\\Portfolio';
const TARGET_DIR = path.resolve(process.cwd(), 'public/images/front');
const VIDEO_TARGET_DIR = path.resolve(process.cwd(), 'public/videos');
const MANIFEST_PATH = path.resolve(process.cwd(), 'src/shared/media/frontImages.ts');

const SUPPORTED_IMAGES = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif']);

function slugifyFileName(fileName) {
  const ext = path.extname(fileName).toLowerCase();
  const base = path.basename(fileName, path.extname(fileName));
  const clean = base
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return `${clean}${ext}`;
}

async function optimizeImage(srcPath, baseName, targetDir) {
  const srcStat = fs.statSync(srcPath);
  const mtime = srcStat.mtimeMs;

  const dstJpg = path.join(targetDir, `${baseName}.jpg`);
  const dstWebp = path.join(targetDir, `${baseName}.webp`);
  const dstAvif = path.join(targetDir, `${baseName}.avif`);
  const dstMobileWebp = path.join(targetDir, `${baseName}-mobile.webp`);
  const dstMobileAvif = path.join(targetDir, `${baseName}-mobile.avif`);

  const targets = [dstJpg, dstWebp, dstAvif, dstMobileWebp, dstMobileAvif];
  const allExist = targets.every((f) => fs.existsSync(f) && fs.statSync(f).mtimeMs >= mtime);

  if (allExist) {
    return {
      jpgBytes: fs.statSync(dstJpg).size,
      webpBytes: fs.statSync(dstWebp).size,
      avifBytes: fs.statSync(dstAvif).size,
      mobileWebpBytes: fs.statSync(dstMobileWebp).size,
      mobileAvifBytes: fs.statSync(dstMobileAvif).size,
    };
  }

  const pipeline = sharp(srcPath).rotate();

  await Promise.all([
    pipeline
      .clone()
      .resize({ width: 1280, withoutEnlargement: true })
      .jpeg({ quality: 72, mozjpeg: true })
      .toFile(dstJpg),

    pipeline
      .clone()
      .resize({ width: 1280, withoutEnlargement: true })
      .webp({ quality: 66, effort: 4 })
      .toFile(dstWebp),

    pipeline
      .clone()
      .resize({ width: 1280, withoutEnlargement: true })
      .avif({ quality: 50, effort: 4 })
      .toFile(dstAvif),

    pipeline
      .clone()
      .resize({ width: 768, withoutEnlargement: true })
      .webp({ quality: 60, effort: 4 })
      .toFile(dstMobileWebp),

    pipeline
      .clone()
      .resize({ width: 768, withoutEnlargement: true })
      .avif({ quality: 45, effort: 4 })
      .toFile(dstMobileAvif),
  ]);

  return {
    jpgBytes: fs.statSync(dstJpg).size,
    webpBytes: fs.statSync(dstWebp).size,
    avifBytes: fs.statSync(dstAvif).size,
    mobileWebpBytes: fs.statSync(dstMobileWebp).size,
    mobileAvifBytes: fs.statSync(dstMobileAvif).size,
  };
}

export async function syncFrontImages() {
  fs.mkdirSync(TARGET_DIR, { recursive: true });
  fs.mkdirSync(VIDEO_TARGET_DIR, { recursive: true });
  fs.mkdirSync(path.dirname(MANIFEST_PATH), { recursive: true });

  let sourceFiles = [];
  if (fs.existsSync(SOURCE_DIR)) {
    const allFiles = fs.readdirSync(SOURCE_DIR);
    sourceFiles = allFiles
      .filter((file) => SUPPORTED_IMAGES.has(path.extname(file).toLowerCase()))
      .sort((a, b) => a.localeCompare(b, 'en'));

    // Copy MP4 video if present
    const videoFiles = allFiles.filter((file) => path.extname(file).toLowerCase() === '.mp4');
    for (const vFile of videoFiles) {
      const srcVideo = path.join(SOURCE_DIR, vFile);
      const dstVideo = path.join(VIDEO_TARGET_DIR, slugifyFileName(vFile));
      if (!fs.existsSync(dstVideo) || fs.statSync(dstVideo).mtimeMs < fs.statSync(srcVideo).mtimeMs) {
        fs.copyFileSync(srcVideo, dstVideo);
        console.log(`[sync-front-images] Copied video ${vFile} -> public/videos/${slugifyFileName(vFile)}`);
      }
    }
  }

  const syncedEntries = [];

  for (const file of sourceFiles) {
    const srcPath = path.join(SOURCE_DIR, file);
    const stat = fs.statSync(srcPath);
    if (!stat.isFile()) continue;

    const targetFileName = slugifyFileName(file);
    const baseSlug = path.basename(targetFileName, path.extname(targetFileName));

    const sizes = await optimizeImage(srcPath, baseSlug, TARGET_DIR);

    syncedEntries.push({
      id: baseSlug,
      originalName: file,
      fileName: `${baseSlug}.jpg`,
      publicPath: `/images/front/${baseSlug}.jpg`,
      webpPath: `/images/front/${baseSlug}.webp`,
      avifPath: `/images/front/${baseSlug}.avif`,
      mobileWebpPath: `/images/front/${baseSlug}-mobile.webp`,
      mobileAvifPath: `/images/front/${baseSlug}-mobile.avif`,
      bytes: sizes.jpgBytes,
      webpBytes: sizes.webpBytes,
      avifBytes: sizes.avifBytes,
      mobileAvifBytes: sizes.mobileAvifBytes,
    });
  }

  // Fallback para ambientes de CI/CD (Cloudflare Pages) onde os arquivos já estão em public/images/front
  if (syncedEntries.length === 0 && fs.existsSync(TARGET_DIR)) {
    const existingFiles = fs
      .readdirSync(TARGET_DIR)
      .filter((file) => file.endsWith('.jpg') && !file.includes('-mobile'))
      .sort((a, b) => a.localeCompare(b, 'en'));

    for (const file of existingFiles) {
      const baseSlug = path.basename(file, path.extname(file));
      const fullPath = path.join(TARGET_DIR, file);
      const stat = fs.statSync(fullPath);
      if (!stat.isFile()) continue;

      const webpFile = path.join(TARGET_DIR, `${baseSlug}.webp`);
      const avifFile = path.join(TARGET_DIR, `${baseSlug}.avif`);
      const mobileAvifFile = path.join(TARGET_DIR, `${baseSlug}-mobile.avif`);

      syncedEntries.push({
        id: baseSlug,
        originalName: file,
        fileName: file,
        publicPath: `/images/front/${file}`,
        webpPath: `/images/front/${baseSlug}.webp`,
        avifPath: `/images/front/${baseSlug}.avif`,
        mobileWebpPath: `/images/front/${baseSlug}-mobile.webp`,
        mobileAvifPath: `/images/front/${baseSlug}-mobile.avif`,
        bytes: stat.size,
        webpBytes: fs.existsSync(webpFile) ? fs.statSync(webpFile).size : 0,
        avifBytes: fs.existsSync(avifFile) ? fs.statSync(avifFile).size : 0,
        mobileAvifBytes: fs.existsSync(mobileAvifFile) ? fs.statSync(mobileAvifFile).size : 0,
      });
    }
  }

  const findEntry = (sub, fallbackIdx = 0) => {
    const found = syncedEntries.find((item) => item.id.includes(sub));
    return found ?? syncedEntries[fallbackIdx % Math.max(1, syncedEntries.length)];
  };

  const createSet = (entry) => ({
    src: entry.publicPath,
    webp: entry.webpPath,
    avif: entry.avifPath,
    mobileWebp: entry.mobileWebpPath,
    mobileAvif: entry.mobileAvifPath,
  });

  const entryChromeSurfer = findEntry('1401469', 0);
  const entryHalftoneDark = findEntry('902085', 1);
  const entryAkiraBike = findEntry('1396090', 2);
  const entryMoebiusTruss = findEntry('607758', 3);
  const entryCrimsonMoon = findEntry('1331354', 4);
  const entryCrimsonOni = findEntry('1360883', 5);
  const entryBerserkForge = findEntry('wallhaven', 6);
  const entryStarryCosmos = findEntry('491593', 7);

  const tsContent = `/**
 * Auto-generated by scripts/sync-front-images.mjs
 * Source folder: C:\\Users\\dkaua\\Pictures\\Portfolio
 */
import { withBase } from '../routing/paths';

export interface ResponsiveImageSet {
  readonly src: string;
  readonly webp: string;
  readonly avif: string;
  readonly mobileWebp: string;
  readonly mobileAvif: string;
}

export interface FrontImageAsset {
  readonly id: string;
  readonly originalName: string;
  readonly fileName: string;
  readonly publicPath: string;
  readonly webpPath: string;
  readonly avifPath: string;
  readonly mobileWebpPath: string;
  readonly mobileAvifPath: string;
  readonly bytes: number;
  readonly webpBytes?: number;
  readonly avifBytes?: number;
  readonly mobileAvifBytes?: number;
}

const RAW_ENTRIES: readonly FrontImageAsset[] = ${JSON.stringify(syncedEntries, null, 2)} as const;

export const FRONT_IMAGES: readonly FrontImageAsset[] = RAW_ENTRIES.map((item) => ({
  ...item,
  publicPath: withBase(item.publicPath),
  webpPath: withBase(item.webpPath),
  avifPath: withBase(item.avifPath),
  mobileWebpPath: withBase(item.mobileWebpPath),
  mobileAvifPath: withBase(item.mobileAvifPath),
}));

const resolveSet = (raw: { src: string; webp: string; avif: string; mobileWebp: string; mobileAvif: string }): ResponsiveImageSet => ({
  src: withBase(raw.src),
  webp: withBase(raw.webp),
  avif: withBase(raw.avif),
  mobileWebp: withBase(raw.mobileWebp),
  mobileAvif: withBase(raw.mobileAvif),
});

/** Conjuntos de Imagens Curadas da Pasta Portfolio (AVIF + WebP + Fallback JPG) */
export const PHOTO_CHROME_SURFER_SET: ResponsiveImageSet = resolveSet(${JSON.stringify(createSet(entryChromeSurfer), null, 2)});
export const PHOTO_HALFTONE_DARK_SET: ResponsiveImageSet = resolveSet(${JSON.stringify(createSet(entryHalftoneDark), null, 2)});
export const PHOTO_AKIRA_BIKE_SET: ResponsiveImageSet = resolveSet(${JSON.stringify(createSet(entryAkiraBike), null, 2)});
export const PHOTO_MOEBIUS_TRUSS_SET: ResponsiveImageSet = resolveSet(${JSON.stringify(createSet(entryMoebiusTruss), null, 2)});
export const PHOTO_CRIMSON_MOON_SET: ResponsiveImageSet = resolveSet(${JSON.stringify(createSet(entryCrimsonMoon), null, 2)});
export const PHOTO_CRIMSON_ONI_SET: ResponsiveImageSet = resolveSet(${JSON.stringify(createSet(entryCrimsonOni), null, 2)});
export const PHOTO_BERSERK_FORGE_SET: ResponsiveImageSet = resolveSet(${JSON.stringify(createSet(entryBerserkForge), null, 2)});
export const PHOTO_STARRY_COSMOS_SET: ResponsiveImageSet = resolveSet(${JSON.stringify(createSet(entryStarryCosmos), null, 2)});

export const VIDEO_FEATURED_STAGE = withBase('/videos/1405430.mp4');
`;

  fs.writeFileSync(MANIFEST_PATH, tsContent, 'utf8');
  console.log(`[sync-front-images] Optimized and synced ${syncedEntries.length} portfolio image(s) to AVIF, WebP and JPG.`);
}

await syncFrontImages();
