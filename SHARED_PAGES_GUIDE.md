# SENIA Sales Engine - Shared Pages & OneDrive Integration Guide

## Overview

This document describes the new shared pages and OneDrive Business integration layer added to the SENIA Sales Engine. These components are used by both employees and managers (bosses) for notification management, settings, and file handling.

## Files Created

### 1. Pages (Shared)

#### NotificationCenter.tsx
**Location:** `src/pages/shared/NotificationCenter.tsx`

Full-page notification management interface with:
- Unread count badge in header
- "Mark all as read" functionality
- Filter tabs: All | Followup | Commission | Achievement | System
- Notifications grouped by date (Today, Yesterday, Earlier)
- Each notification shows:
  - Type-specific icon with color coding
  - Title and message preview
  - Time ago formatting
  - Priority badge (Urgent/High/Normal/Low)
  - Action buttons (mark as read, navigate, delete)
- Empty state when no notifications
- Full dark mode support

**Features:**
- Real-time filtering and grouping
- Click to navigate to related page
- Auto-mark as read on click
- Individual delete capability
- Responsive layout

**Usage:**
```tsx
import { NotificationCenter } from '@/pages/shared/NotificationCenter'

// Add route
<Route path="/app/notifications" element={<NotificationCenter />} />
```

#### SettingsPage.tsx
**Location:** `src/pages/shared/SettingsPage.tsx`

Complete user settings page with sections:

**个人资料 (Profile)**
- Avatar with mock upload button
- Full name input
- Email (read-only)
- Phone input
- Save button with success feedback

**安全设置 (Security)**
- Change password section
- Current password input with visibility toggle
- New password input with visibility toggle
- Confirm password input
- Password validation (8+ chars, match)
- Error and success messages

**外观 (Appearance)**
- Dark/Light mode toggle
- Language selector (Chinese/English mock)

**通知偏好 (Notification Preferences)**
- Toggle switches for notification types:
  - Followup reminders
  - Commission notifications
  - Achievement notifications
  - Email notifications

**关于 (About)**
- App name and version
- Support email link

**Usage:**
```tsx
import { SettingsPage } from '@/pages/shared/SettingsPage'

// Add route
<Route path="/app/settings" element={<SettingsPage />} />
```

### 2. OneDrive Integration

#### onedrive.ts
**Location:** `src/lib/onedrive.ts`

Core OneDrive Business integration service with:

**Key Types:**
```typescript
interface OneDriveFile {
  id: string
  name: string
  size: number
  mimeType: string
  webUrl: string
  downloadUrl?: string
  createdAt: string
  modifiedAt: string
  parentPath: string
  version: string
}

interface UploadRequest {
  file: File
  folder: string
  customerId?: string
  projectId?: string
  quoteId?: string
  paymentId?: string
  fileType: string
}
```

**Core Service Methods:**

1. **initialize(config)** - Initialize with Azure AD credentials
   ```typescript
   oneDriveService.initialize({
     clientId: 'your-client-id',
     redirectUri: 'https://app.senia.com',
     middlewareUrl: 'https://api.senia.com'
   })
   ```

2. **uploadFile(request)** - Upload file to OneDrive
   ```typescript
   const result = await oneDriveService.uploadFile({
     file: selectedFile,
     folder: '/senia-sales/customers/cust-001/attachments',
     fileType: 'quote',
     customerId: 'cust-001'
   })
   ```

3. **getPreviewUrl(fileId)** - Get signed URL for preview
   ```typescript
   const url = await oneDriveService.getPreviewUrl('file-id')
   // Returns time-limited URL (1 hour expiration)
   ```

4. **downloadFile(fileId)** - Download file as Blob
   ```typescript
   const blob = await oneDriveService.downloadFile('file-id')
   // Use blob for download or preview
   ```

5. **deleteFile(fileId)** - Permanently delete file
   ```typescript
   const success = await oneDriveService.deleteFile('file-id')
   ```

6. **listFiles(folder)** - List files in folder
   ```typescript
   const files = await oneDriveService.listFiles(
     '/senia-sales/customers/cust-001/attachments'
   )
   ```

**Folder Structure:**
```
/senia-sales-engine/
├── customers/{customerId}/attachments
├── projects/{projectId}/attachments
├── quotes/{quoteId}/attachments
└── payments/{paymentId}/attachments
```

**Demo Mode:**
When OneDrive is not configured, the service operates in demo mode:
- Files are stored locally in browser
- Simulates upload with mock metadata
- No actual OneDrive operations

#### onedrive-edge-function.ts
**Location:** `src/lib/middleware/onedrive-edge-function.ts`

Reference implementation for Supabase Edge Function middleware:

**Endpoints to Implement:**
- `POST /api/onedrive/upload` - File upload
- `GET /api/onedrive/signed-url` - Generate preview URL
- `GET /api/onedrive/download` - Download file
- `DELETE /api/onedrive/delete` - Delete file
- `GET /api/onedrive/list` - List files

**Key Features:**
- Microsoft Graph API authentication (client credentials flow)
- Direct upload for files < 4MB
- Resumable upload sessions for large files (4MB+)
- Automatic token caching and refresh
- Permission validation via Supabase JWT
- Audit logging for all operations

**Deployment:**
```bash
# 1. Set Supabase environment variables
# MICROSOFT_CLIENT_ID
# MICROSOFT_CLIENT_SECRET
# MICROSOFT_TENANT_ID
# ONEDRIVE_DRIVE_ID

# 2. Deploy function
supabase functions deploy onedrive-middleware

# 3. Update frontend middleware URL
oneDriveService.initialize({
  middlewareUrl: 'https://[project-id].supabase.co/functions/v1/onedrive-middleware'
})
```

### 3. Reusable Components

#### FileUpload.tsx
**Location:** `src/components/FileUpload.tsx`

Drag-and-drop file upload component:

**Features:**
- Drag & drop area with visual feedback
- File type validation
- Size limit enforcement (default 100MB)
- Upload progress bar
- Success confirmation with file details
- Error handling and display
- OneDrive info message in demo mode
- Supported formats: PDF, DOC, DOCX, XLS, XLSX, JPG, PNG, ZIP

**Props:**
```typescript
interface FileUploadProps {
  onUploadComplete?: (file: OneDriveFile) => void
  onUploadError?: (error: Error) => void
  folder: string // OneDrive folder path
  fileType: string // attachment type
  customerId?: string
  projectId?: string
  quoteId?: string
  paymentId?: string
  maxSizeMB?: number // default 100
  className?: string
}
```

**Usage:**
```tsx
import { FileUpload } from '@/components/FileUpload'

<FileUpload
  folder="/senia-sales/customers/cust-001/attachments"
  fileType="quote"
  customerId="cust-001"
  onUploadComplete={(file) => {
    console.log('File uploaded:', file.name)
  }}
  onUploadError={(error) => {
    console.error('Upload failed:', error)
  }}
/>
```

#### NotificationDrawer.tsx
**Location:** `src/components/NotificationDrawer.tsx`

Slide-in notification drawer component:

**Features:**
- Right-side slide-in drawer
- Shows latest unread notifications (max 5)
- Unread count badge
- Click outside or ESC to close
- Notification actions on hover
- "View all" link to full notification center
- Quick dismiss capability
- Navigation integration

**Props:**
```typescript
interface NotificationDrawerProps {
  isOpen: boolean
  onClose: () => void
}
```

**Usage:**
```tsx
import { NotificationDrawer } from '@/components/NotificationDrawer'

const [drawerOpen, setDrawerOpen] = useState(false)

return (
  <>
    <button onClick={() => setDrawerOpen(true)}>
      Notifications
    </button>
    <NotificationDrawer
      isOpen={drawerOpen}
      onClose={() => setDrawerOpen(false)}
    />
  </>
)
```

## Architecture

### Security Model

**Frontend:**
- Never stores Microsoft Graph credentials
- All file operations through middleware
- Uses Supabase JWT for authentication

**Middleware (Supabase Edge Function):**
- Stores and refreshes access tokens securely
- Validates user permissions
- Implements rate limiting
- Logs all operations for audit trail

**OneDrive:**
- Stores actual files
- Implements permission checks
- Provides signed URLs for time-limited access

### Data Flow

```
Frontend Client
    ↓
Supabase JWT Auth
    ↓
Middleware (Edge Function)
    ↓
Microsoft Graph API
    ↓
OneDrive Business
```

### File Organization

All files are organized in a consistent folder structure:

```
/senia-sales-engine/
├── customers/
│   ├── cust-001/
│   │   └── attachments/
│   │       ├── 2026-04-04_customer_cust-001_photo.jpg
│   │       └── 2026-04-04_customer_cust-001_contract.pdf
│   └── cust-002/
│       └── attachments/
├── projects/
│   ├── proj-001/
│   │   └── attachments/
│   └── proj-002/
│       └── attachments/
├── quotes/
│   └── ...
└── payments/
    └── ...
```

## Integration Points

### In Employee Dashboard

**Add Notification Bell to Header:**
```tsx
import { NotificationDrawer } from '@/components/NotificationDrawer'

export function EmployeeLayout() {
  const [notifDrawerOpen, setNotifDrawerOpen] = useState(false)
  
  return (
    <>
      {/* ... existing layout ... */}
      <button 
        onClick={() => setNotifDrawerOpen(true)}
        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
      >
        <Bell className="w-6 h-6" />
      </button>
      <NotificationDrawer
        isOpen={notifDrawerOpen}
        onClose={() => setNotifDrawerOpen(false)}
      />
    </>
  )
}
```

### In Settings Access

**Add Settings to Navigation:**
```tsx
const NAV_ITEMS = [
  // ... existing items ...
  { label: '设置', icon: Settings, href: '/app/settings' }
]

// Route
<Route path="/app/settings" element={<SettingsPage />} />
```

### In File Upload Forms

**Use FileUpload Component:**
```tsx
import { FileUpload } from '@/components/FileUpload'

export function CustomerDetail() {
  const { customerId } = useParams()
  
  return (
    <div>
      <h3>附件</h3>
      <FileUpload
        folder={oneDriveService.getFolderPath('customer', customerId!)}
        fileType="document"
        customerId={customerId}
        onUploadComplete={handleFileAdded}
      />
    </div>
  )
}
```

## Production Setup Checklist

- [ ] Register Azure AD application
- [ ] Configure Microsoft Graph permissions (Files.ReadWrite.All)
- [ ] Set up Supabase Edge Function
- [ ] Deploy middleware with environment variables
- [ ] Update oneDrive.ts with production middleware URL
- [ ] Configure CORS for OneDrive domains
- [ ] Set up audit logging for file operations
- [ ] Test large file uploads (>4MB)
- [ ] Configure email notifications (if needed)
- [ ] Test dark mode on all pages
- [ ] Set up error tracking/monitoring
- [ ] Performance test with 1000+ notifications
- [ ] Load test file upload with concurrent users

## Testing

### Unit Tests

```typescript
describe('oneDriveService', () => {
  it('should upload file successfully', async () => {
    const file = new File(['test'], 'test.pdf', { type: 'application/pdf' })
    const result = await oneDriveService.uploadFile({
      file,
      folder: '/test',
      fileType: 'document'
    })
    expect(result).toBeDefined()
    expect(result.name).toBe('test.pdf')
  })

  it('should validate file size', () => {
    const largeFile = new File(['x'.repeat(200 * 1024 * 1024)], 'large.pdf')
    const validation = oneDriveService.validateFile(largeFile, 100)
    expect(validation.valid).toBeFalsy()
  })
})
```

### Integration Tests

- Test complete upload/download cycle
- Test notification filtering and grouping
- Test settings persistence
- Test dark mode toggle
- Test NotificationDrawer open/close behavior

## Performance Considerations

1. **Notification Loading:** Paginate notifications if count > 100
2. **File List:** Implement lazy loading for folder contents
3. **Large Files:** Use resumable upload for files > 4MB
4. **Token Caching:** Cache Microsoft Graph tokens for 55 minutes
5. **Drawer:** Unload drawer DOM when closed to save memory

## Accessibility

- All buttons have proper ARIA labels
- Keyboard navigation support (ESC to close drawers)
- Color contrast meets WCAG AA standards
- Form labels properly associated with inputs
- Error messages announced to screen readers

## Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile browsers: iOS Safari 14+, Chrome Android

## Troubleshooting

### OneDrive Upload Fails
1. Check middleware URL configuration
2. Verify Supabase JWT is valid
3. Check Azure AD credentials in Supabase env vars
4. Review middleware logs for Microsoft Graph errors

### Notifications Not Appearing
1. Verify DEMO_NOTIFICATIONS are loaded
2. Check browser console for errors
3. Verify read/unread state in notification objects

### Dark Mode Not Working
1. Check useThemeStore hook
2. Verify CSS dark mode classes are applied
3. Clear browser cache and refresh

## Future Enhancements

- [ ] Real-time notifications via WebSocket
- [ ] Notification preferences per entity type
- [ ] Two-factor authentication in settings
- [ ] File preview with Office Online
- [ ] Bulk file operations
- [ ] Notification delivery via email/SMS
- [ ] Profile picture upload to OneDrive
- [ ] File sharing and permissions management
