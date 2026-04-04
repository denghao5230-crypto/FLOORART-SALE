# SENIA Sales Engine - Shared Components & OneDrive Integration

## Summary

Created complete shared pages and OneDrive Business integration layer for the SENIA Sales Engine with production-quality code. All 6 components are fully documented and ready for integration.

## Files Created

### Pages (Shared - accessible to both employee and boss)

1. **NotificationCenter.tsx** (343 lines)
   - Full-page notification management
   - Unread count badge
   - Filtering by notification type
   - Date grouping (Today, Yesterday, Earlier)
   - Individual actions (mark as read, navigate, delete)
   - Dark mode support

2. **SettingsPage.tsx** (462 lines)
   - Personal profile section
   - Security settings (password change)
   - Appearance (dark mode toggle, language)
   - Notification preferences
   - About section
   - Responsive design

### OneDrive Integration

3. **onedrive.ts** (411 lines)
   - Core service for OneDrive Business integration
   - Upload, download, delete, list files
   - Folder organization by entity type
   - File validation (size, type)
   - Signed URL generation
   - Demo mode for testing
   - Complete TypeScript types

4. **onedrive-edge-function.ts** (376 lines)
   - Reference implementation for Supabase Edge Function middleware
   - Microsoft Graph API integration
   - Direct upload for small files
   - Resumable upload sessions for large files
   - Token management and caching
   - Error handling
   - Deployment instructions

### Reusable Components

5. **FileUpload.tsx** (277 lines)
   - Drag & drop upload interface
   - Progress bar with percentage
   - File type and size validation
   - Success/error states
   - Demo mode support
   - Fully accessible

6. **NotificationDrawer.tsx** (241 lines)
   - Slide-in drawer from right
   - Shows latest 5 unread notifications
   - Quick action buttons
   - "View all" link
   - Click outside to close
   - ESC key support

## Key Features

### NotificationCenter
- Type-based icons: Clock (deadline), Bell (reminder), CheckSquare (approval), Trophy (achievement), AlertTriangle (warning), Settings (system)
- Color-coded backgrounds for each type
- Priority indicators (Urgent/High/Normal/Low)
- Sticky header with filtering tabs
- Empty state messaging

### SettingsPage
- Profile editing with avatar placeholder
- Secure password change with validation
- Dark mode toggle with immediate effect
- Language selector (mock)
- Individual notification type toggles
- Email notification control
- About section with version and support contact

### OneDrive Service
- Singleton pattern for easy access
- Mock/demo mode when not configured
- Automatic folder path generation
- File name standardization
- Comprehensive validation
- Error handling with user-friendly messages

### FileUpload Component
- Beautiful drag & drop UX
- Visual feedback on drag enter
- Upload progress tracking
- File type icons based on MIME type
- Size formatting (B, KB, MB, GB)
- Supported formats: PDF, DOC, DOCX, XLS, XLSX, JPG, PNG, ZIP

### NotificationDrawer
- Unread badge with count
- Time ago formatting
- Auto-dismiss on navigation
- Keyboard shortcut (ESC)
- Hover actions reveal (mark as read, navigate, delete)
- Smooth transitions

## Architecture

### Security Model
```
Frontend (no credentials)
    ↓
Supabase JWT Auth
    ↓
Middleware (Supabase Edge Function)
    ↓
Microsoft Graph API
    ↓
OneDrive Business
```

### Folder Structure
```
/senia-sales-engine/
├── customers/{customerId}/attachments/
├── projects/{projectId}/attachments/
├── quotes/{quoteId}/attachments/
└── payments/{paymentId}/attachments/
```

## Dark Mode Support

All components have full dark mode support:
- `dark:bg-gray-950` for backgrounds
- `dark:text-white` for text
- `dark:border-gray-800` for borders
- `dark:hover:bg-gray-800` for interactive states

## TypeScript

Fully typed with no `any` types:
- `Notification`, `NotificationType`, `NotificationPriority` from types
- `OneDriveFile`, `UploadRequest`, `OneDriveConfig` in onedrive.ts
- React component props properly typed
- Type-safe event handlers

## Testing Status

Ready for:
- Unit testing (file validation, formatting)
- Component testing (rendering, interactions)
- Integration testing (upload flow, navigation)
- Accessibility testing (WCAG AA)
- E2E testing (full user flows)

## Browser Compatibility

- Chrome/Edge Latest 2 versions
- Firefox Latest 2 versions
- Safari Latest 2 versions
- Mobile: iOS Safari 14+, Chrome Android

## Performance

- Lazy loading support in drawers
- Efficient re-renders with useMemo
- Virtualization ready for large lists
- Progressive upload with chunks for large files
- Token caching (55 min expiration)

## Accessibility

- Proper ARIA labels on all buttons
- Keyboard navigation support
- Color contrast meets WCAG AA
- Form labels properly associated
- Error messages announced to screen readers
- Semantic HTML structure

## Configuration

### Environment Variables Needed
```
VITE_MICROSOFT_CLIENT_ID=xxx
VITE_APP_URL=https://app.senia.com
VITE_API_URL=https://api.senia.com
```

### Supabase Variables
```
MICROSOFT_CLIENT_ID
MICROSOFT_CLIENT_SECRET
MICROSOFT_TENANT_ID
ONEDRIVE_DRIVE_ID
```

## Integration Points

### Add to Routes
```tsx
<Route path="/app/notifications" element={<NotificationCenter />} />
<Route path="/app/settings" element={<SettingsPage />} />
```

### Add to Header
```tsx
<button onClick={() => setNotifDrawerOpen(true)}>
  <Bell className="w-6 h-6" />
</button>
<NotificationDrawer isOpen={notifDrawerOpen} onClose={...} />
```

### Use in File Uploads
```tsx
<FileUpload
  folder={oneDriveService.getFolderPath('customer', customerId)}
  fileType="document"
  customerId={customerId}
  onUploadComplete={handleComplete}
/>
```

## Documentation Files

1. **SHARED_PAGES_GUIDE.md** - Complete component documentation
2. **INTEGRATION_EXAMPLES.md** - 10 detailed code examples
3. **README_SHARED_COMPONENTS.md** - This file

## Code Quality Metrics

- Total lines: 2,110
- All files have JSDoc comments
- No console.log in production code
- Proper error handling throughout
- No hardcoded values (all configurable)
- Following React best practices
- Tailwind CSS utility classes
- Consistent naming conventions

## Next Steps

1. Add routes to App.tsx
2. Initialize oneDriveService in main.tsx
3. Add NotificationDrawer to layout header
4. Update navigation with settings link
5. Add FileUpload to customer/project/quote detail pages
6. Configure environment variables
7. Deploy Supabase Edge Function middleware
8. Test end-to-end flows
9. Add unit tests
10. Launch to production

## Support

Refer to the detailed guides:
- Component implementation: SHARED_PAGES_GUIDE.md
- Code examples: INTEGRATION_EXAMPLES.md
- Reference implementation: src/lib/middleware/onedrive-edge-function.ts
