# Troubleshooting

## 1) Deep-link or refresh returns 404 (Netlify)

This app is a SPA (`react-router-dom`), so direct access to nested routes requires server rewrite to `index.html`.

### Netlify checklist
- Confirm `netlify.toml` exists and includes SPA redirect.
- Confirm `public/_redirects` is included in build output.

### Fallback when host rewrite is not available
- Add `VITE_ROUTER_MODE=hash` in `.env` and redeploy.
- URL format becomes `/#/app/...`, which avoids server rewrite requirements.

## 2) Build/dev hangs in iCloud directory

If project files show `compressed,dataless`, iCloud has not fully downloaded local file content. TypeScript/Vite may hang when reading these files.

### Check file state
```bash
ls -lO src/pages/auth/LoginPage.tsx
```

If output includes `dataless`, files are not fully local.

### Fix
1. In Finder, open the project folder and choose "Download Now" for files/folder.
2. Or move project to a non-iCloud local path (recommended for development), for example:
   - `~/Projects/senia-sales-engine`
3. Reinstall dependencies and rebuild:
```bash
npm ci
npm run build
```

## 3) Demo auth unexpectedly works in production

Demo fallback is controlled by:
```bash
VITE_ENABLE_DEMO_MODE=true
```

Set it to `false` in production to require real Supabase auth only.
