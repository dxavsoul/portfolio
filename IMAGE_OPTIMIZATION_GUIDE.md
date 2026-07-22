# Image Optimization Guide

The following images in your portfolio need optimization to save ~234 KiB:

## Current Image Files
- `/public/avatar-face.png` - 234KB (Used in Navigation)
- `/public/mxsarmiento.png` - 514KB  
- `/public/mxsarmiento-min.jpg` - 239KB (Used in OG meta tags)

## Optimization Steps

### Option 1: Using Online Tools (Easiest)
1. Visit https://tinypng.com or https://imagecompressor.com
2. Upload each image
3. Download the optimized version
4. Replace the files in `/public/`

### Option 2: Using ImageMagick (Local)
```bash
# Compress PNG files
convert avatar-face.png -strip -interlace Plane -quality 85 avatar-face-optimized.png

# Compress JPG files  
convert mxsarmiento-min.jpg -strip -interlace Plane -quality 85 mxsarmiento-min-optimized.jpg
```

### Option 3: Using Bun Scripts
Create a `scripts/optimize-images.ts`:
```typescript
import sharp from 'sharp';
import { promises as fs } from 'fs';
import { resolve } from 'path';

const imageDir = resolve('./public');
const images = ['avatar-face.png', 'mxsarmiento.png', 'mxsarmiento-min.jpg'];

async function optimizeImages() {
  for (const image of images) {
    const path = resolve(imageDir, image);
    
    if (image.endsWith('.png')) {
      await sharp(path)
        .png({ quality: 80, effort: 9 })
        .toFile(path);
    } else {
      await sharp(path)
        .jpeg({ quality: 85, progressive: true })
        .toFile(path);
    }
    
    console.log(`✓ Optimized ${image}`);
  }
}

optimizeImages();
```

## Recommended Optimization Targets

### PNG Files (avatar-face.png)
- Reduce from 234KB to ~80-100KB (60% reduction)
- Use PNG compression level 9
- Remove metadata with `--strip-all`
- Target: Avatar should be < 50KB

### JPG Files (mxsarmiento-min.jpg)
- Reduce from 239KB to ~60-80KB (70% reduction)
- Use quality 85-90
- Use progressive encoding
- Target: Hero image should be < 80KB

### NEXT: Generate WebP Versions
Once images are optimized, create WebP versions:

```bash
# Convert PNG to WebP
cwebp -q 80 avatar-face.png -o avatar-face.webp

# Convert JPG to WebP
cwebp -q 85 mxsarmiento-min.jpg -o mxsarmiento-min.webp
```

Then reference in your OptimizedImage component:
```tsx
<OptimizedImage
  src="/avatar-face.png"
  srcWebp="/avatar-face.webp"
  alt="Logo"
  priority
/>
```

## Expected Results After Optimization
- **Total image size reduction**: 234KB → ~50-80KB (66% reduction)
- **FCP improvement**: Reduce by additional 200-300ms
- **LCP improvement**: Better performance for image-heavy sections
