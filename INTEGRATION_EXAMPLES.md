# Integration Examples - Shared Pages & OneDrive

## 1. Adding Notification Center to Routes

```typescript
// src/App.tsx
import { NotificationCenter } from '@/pages/shared/NotificationCenter'
import { SettingsPage } from '@/pages/shared/SettingsPage'

function App() {
  return (
    <Routes>
      {/* Shared pages - accessible by both employee and boss */}
      <Route path="/app/notifications" element={<NotificationCenter />} />
      <Route path="/app/settings" element={<SettingsPage />} />
      
      {/* ... rest of routes ... */}
    </Routes>
  )
}
```

## 2. Integrating Notification Drawer in Layout

```typescript
// src/layouts/EmployeeLayout.tsx
import { useState } from 'react'
import { Bell, Gear, LogOut } from 'lucide-react'
import { NotificationDrawer } from '@/components/NotificationDrawer'

export function EmployeeLayout() {
  const [notificationDrawerOpen, setNotificationDrawerOpen] = useState(false)
  const navigate = useNavigate()
  
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 flex flex-col">
        {/* ... navigation items ... */}
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        {/* Header with notification bell */}
        <header className="h-16 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-6">
          <h1 className="text-xl font-bold">SENIA Sales Engine</h1>
          
          <div className="flex items-center gap-4">
            {/* Notification Bell */}
            <button
              onClick={() => setNotificationDrawerOpen(true)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors relative"
              title="通知"
            >
              <Bell className="w-6 h-6 text-gray-600 dark:text-gray-300" />
              {/* Unread badge */}
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>

            {/* Settings */}
            <button
              onClick={() => navigate('/app/settings')}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              title="设置"
            >
              <Gear className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            </button>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              title="登出"
            >
              <LogOut className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      {/* Notification Drawer */}
      <NotificationDrawer
        isOpen={notificationDrawerOpen}
        onClose={() => setNotificationDrawerOpen(false)}
      />
    </div>
  )
}
```

## 3. Using FileUpload in Customer Detail Page

```typescript
// src/pages/employee/CustomerDetail.tsx
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { FileUpload } from '@/components/FileUpload'
import { oneDriveService, type OneDriveFile } from '@/lib/onedrive'
import { DEMO_CUSTOMERS } from '@/lib/demoData'

export function CustomerDetail() {
  const { customerId } = useParams()
  const [uploadedFiles, setUploadedFiles] = useState<OneDriveFile[]>([])
  
  const customer = DEMO_CUSTOMERS.find(c => c.id === customerId)
  const folderPath = oneDriveService.getFolderPath('customer', customerId!)

  const handleFileUploaded = (file: OneDriveFile) => {
    setUploadedFiles(prev => [file, ...prev])
    console.log(`File uploaded: ${file.name}`)
  }

  const handleUploadError = (error: Error) => {
    console.error('Upload failed:', error.message)
    // Show toast notification
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">{customer?.name}</h1>

      {/* Customer Details */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div>
          <label className="text-sm text-gray-600 dark:text-gray-400">Email</label>
          <p className="font-medium">{customer?.email}</p>
        </div>
        <div>
          <label className="text-sm text-gray-600 dark:text-gray-400">Phone</label>
          <p className="font-medium">{customer?.phone}</p>
        </div>
      </div>

      {/* Attachments Section */}
      <div className="border-t border-gray-200 dark:border-gray-800 pt-8">
        <h2 className="text-lg font-bold mb-4">附件</h2>

        {/* File Upload */}
        <FileUpload
          folder={folderPath}
          fileType="document"
          customerId={customerId}
          onUploadComplete={handleFileUploaded}
          onUploadError={handleUploadError}
          className="mb-6"
        />

        {/* Uploaded Files List */}
        {uploadedFiles.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              已上传文件
            </h3>
            <div className="space-y-1">
              {uploadedFiles.map(file => (
                <div
                  key={file.id}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(file.createdAt).toLocaleDateString('zh-CN')}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <a
                      href={file.webUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-500 hover:text-blue-600"
                    >
                      查看
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
```

## 4. Initializing OneDrive Service in App Startup

```typescript
// src/main.tsx
import { oneDriveService } from '@/lib/onedrive'

// Initialize OneDrive service at app startup
if (import.meta.env.PROD) {
  // Production: Real OneDrive
  oneDriveService.initialize({
    clientId: import.meta.env.VITE_MICROSOFT_CLIENT_ID,
    redirectUri: import.meta.env.VITE_APP_URL,
    middlewareUrl: import.meta.env.VITE_API_URL,
  })
} else {
  // Development: Demo mode (still initialize for UI)
  oneDriveService.initialize({
    clientId: 'demo-client',
    redirectUri: 'http://localhost:5173',
    middlewareUrl: 'http://localhost:3000',
  })
}

ReactDOM.render(<App />, document.getElementById('root'))
```

## 5. Using FileUpload in Quote Page

```typescript
// src/pages/employee/QuoteDetail.tsx
import { FileUpload } from '@/components/FileUpload'
import { oneDriveService } from '@/lib/onedrive'

export function QuoteDetail() {
  const { quoteId, customerId } = useParams()
  const folderPath = oneDriveService.getFolderPath('quote', quoteId!)

  return (
    <div className="space-y-8">
      {/* Quote Details */}
      <div>
        <h2 className="text-xl font-bold mb-4">报价详情</h2>
        {/* ... quote content ... */}
      </div>

      {/* Quote Attachments */}
      <div className="border-t pt-6">
        <h3 className="text-lg font-bold mb-4">报价附件</h3>
        <FileUpload
          folder={folderPath}
          fileType="quote"
          customerId={customerId}
          quoteId={quoteId}
          maxSizeMB={50}
        />
      </div>

      {/* Contract/Approval Attachments */}
      <div className="border-t pt-6">
        <h3 className="text-lg font-bold mb-4">合同文件</h3>
        <FileUpload
          folder={folderPath}
          fileType="contract"
          customerId={customerId}
          quoteId={quoteId}
        />
      </div>
    </div>
  )
}
```

## 6. Accessing Settings from Different Roles

```typescript
// Both EmployeeLayout and BossLayout can access settings
import { SettingsPage } from '@/pages/shared/SettingsPage'

// In BossLayout.tsx
<Route path="/app/settings" element={<SettingsPage />} />

// In EmployeeLayout.tsx
<Route path="/app/settings" element={<SettingsPage />} />
```

## 7. Creating Custom Notification Types

```typescript
// src/lib/demoData.ts
import { Notification } from '@/types'

export const DEMO_NOTIFICATIONS: Notification[] = [
  {
    id: 'notif-1',
    recipient_id: 'user-123',
    type: 'followup_due',
    priority: 'high',
    title: 'Follow-up Due',
    message: 'You have a follow-up scheduled for Acme Construction Inc',
    related_entity_type: 'followup',
    related_entity_id: 'followup-001',
    read: false,
    read_at: null,
    action_url: '/app/followups/followup-001',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  // ... more notifications
]
```

## 8. Environment Variables Setup

```bash
# .env.local
VITE_MICROSOFT_CLIENT_ID=your-client-id-from-azure
VITE_APP_URL=http://localhost:5173
VITE_API_URL=http://localhost:3000
```

## 9. TypeScript Usage with Notification Types

```typescript
// src/hooks/useNotifications.ts
import { useState, useCallback } from 'react'
import { Notification, NotificationType } from '@/types'

export function useNotifications(initialNotifications: Notification[]) {
  const [notifications, setNotifications] = useState(initialNotifications)

  const markAsRead = useCallback((id: string) => {
    setNotifications(prev =>
      prev.map(n =>
        n.id === id
          ? { ...n, read: true, read_at: new Date().toISOString() }
          : n
      )
    )
  }, [])

  const filterByType = useCallback((type: NotificationType) => {
    return notifications.filter(n => n.type === type)
  }, [notifications])

  const deleteNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }, [])

  return {
    notifications,
    markAsRead,
    filterByType,
    deleteNotification,
  }
}

// Usage
const { notifications, markAsRead, filterByType } = useNotifications(
  DEMO_NOTIFICATIONS
)
```

## 10. File Preview Implementation

```typescript
// src/components/FilePreview.tsx
import { useState } from 'react'
import { oneDriveService } from '@/lib/onedrive'

interface FilePreviewProps {
  fileId: string
  fileName: string
}

export function FilePreview({ fileId, fileName }: FilePreviewProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleShowPreview = async () => {
    setLoading(true)
    try {
      const url = await oneDriveService.getPreviewUrl(fileId)
      setPreviewUrl(url)
    } catch (error) {
      console.error('Failed to get preview URL:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <button onClick={handleShowPreview} disabled={loading}>
        {loading ? 'Loading...' : 'Preview'}
      </button>

      {previewUrl && (
        <div className="mt-4">
          <iframe
            src={previewUrl}
            className="w-full h-[600px] border border-gray-200 rounded-lg"
            title={fileName}
          />
        </div>
      )}
    </div>
  )
}
```

## Production Deployment Checklist

```markdown
## Pre-Launch Checklist

- [ ] OneDrive middleware deployed to Supabase
- [ ] Azure AD app credentials set in Supabase env vars
- [ ] Frontend environment variables configured
- [ ] CORS policies updated for OneDrive domains
- [ ] Notification system tested end-to-end
- [ ] File upload tested with files >100MB
- [ ] Settings page accessibility verified
- [ ] Dark mode tested on all browsers
- [ ] Mobile responsive layout verified
- [ ] Error handling tested (network failures, auth failures)
- [ ] Load testing completed (1000+ concurrent users)
- [ ] Audit logging enabled on middleware
- [ ] Backup strategy verified
- [ ] Support documentation completed
- [ ] User training materials prepared
```
