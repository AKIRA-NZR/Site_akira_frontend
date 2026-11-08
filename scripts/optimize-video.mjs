import ffmpeg from '@ffmpeg-installer/ffmpeg';
import { execFileSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const inputVideo = path.resolve('public/videos/1405430.mp4');
const outputOptimized = path.resolve('public/videos/1405430-optimized.mp4');
const outputWebm = path.resolve('public/videos/1405430.webm');

console.log('Original size:', (fs.statSync(inputVideo).size / (1024 * 1024)).toFixed(2), 'MB');

console.log('Encoding optimized MP4 (H.264, CRF 28, 1080p, no audio)...');
execFileSync(ffmpeg.path, [
  '-y',
  '-i', inputVideo,
  '-an',
  '-vcodec', 'libx264',
  '-crf', '28',
  '-preset', 'slow',
  '-movflags', '+faststart',
  '-pix_fmt', 'yuv420p',
  outputOptimized
], { stdio: 'inherit' });

console.log('Optimized MP4 size:', (fs.statSync(outputOptimized).size / (1024 * 1024)).toFixed(2), 'MB');

console.log('Encoding optimized WebM (VP9, CRF 34, no audio)...');
try {
  execFileSync(ffmpeg.path, [
    '-y',
    '-i', inputVideo,
    '-an',
    '-vcodec', 'libvpx-vp9',
    '-crf', '34',
    '-b:v', '0',
    '-deadline', 'good',
    '-pix_fmt', 'yuv420p',
    outputWebm
  ], { stdio: 'inherit' });
  console.log('WebM size:', (fs.statSync(outputWebm).size / (1024 * 1024)).toFixed(2), 'MB');
} catch (e) {
  console.warn('VP9 encoding skipped or not supported:', e.message);
}
