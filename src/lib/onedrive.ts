/**
 * OneDrive Business Integration Layer
 * 
 * ARCHITECTURE:
 * - Frontend NEVER holds Microsoft Graph high-privilege credentials
 * - All file operations go through a controlled middleware/edge function
 * - Supabase stores file metadata only
 * - OneDrive stores actual files
 * 
 * PRODUCTION SETUP:
 * 1. Register Azure AD App with Files.ReadWrite.All permission
 * 2. Set up Supabase Edge Function or separate API server as middleware
 * 3. Middleware handles OAuth token refresh and file operations
 * 4. Frontend calls middleware endpoints, authenticated via Supabase JWT
 */

export interface OneDriveFile {
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

export interface UploadRequest {
  file: File
  folder: string // e.g., '/senia-sales/customers/{customerId}/attachments'
  customerId?: string
  projectId?: string
  quoteId?: string
  paymentId?: string
  fileType: string // attachment type: quote, contract, photo, floor_plan, invoice, specification, document, other
}

export interface OneDriveConfig {
  clientId: string
  redirectUri: string
  middlewareUrl: string // URL of the middleware/edge function
}

/**
 * Middleware API endpoints
 * These are the endpoints your Supabase Edge Function or backend server should implement
 */
const MIDDLEWARE_ENDPOINTS = {
  upload: '/api/onedrive/upload',
  download: '/api/onedrive/download',
  preview: '/api/onedrive/preview',
  delete: '/api/onedrive/delete',
  list: '/api/onedrive/list',
  getSignedUrl: '/api/onedrive/signed-url',
}

/**
 * OneDriveService - Manages all OneDrive Business file operations
 * 
 * In production:
 * - Token storage: Secure server-side session (never in frontend)
 * - Token refresh: Handled by middleware automatically
 * - Error handling: Middleware propagates errors with proper HTTP status codes
 * - Audit logging: Middleware logs all file operations
 */
class OneDriveService {
  private config: OneDriveConfig | null = null
  private isConfigured = false

  /**
   * Initialize the OneDrive service with configuration
   * Call this once at app startup
   */
  initialize(config: OneDriveConfig) {
    this.config = config
    this.isConfigured = true
    console.log('OneDrive service initialized')
  }

  /**
   * Check if OneDrive is configured
   */
  get configured() {
    return this.isConfigured
  }

  /**
   * Upload file through middleware
   * 
   * In production:
   * - Middleware validates file type and size
   * - Middleware checks user permissions
   * - Large files use resumable upload sessions
   * - Success returns OneDrive file metadata
   */
  async uploadFile(request: UploadRequest): Promise<OneDriveFile | null> {
    if (!this.isConfigured) {
      console.warn('OneDrive not configured. File upload simulated.')
      return this.mockUpload(request)
    }

    try {
      const formData = new FormData()
      formData.append('file', request.file)
      formData.append('folder', request.folder)
      formData.append('fileType', request.fileType)
      if (request.customerId) formData.append('customerId', request.customerId)
      if (request.projectId) formData.append('projectId', request.projectId)
      if (request.quoteId) formData.append('quoteId', request.quoteId)
      if (request.paymentId) formData.append('paymentId', request.paymentId)

      const response = await fetch(
        `${this.config!.middlewareUrl}${MIDDLEWARE_ENDPOINTS.upload}`,
        {
          method: 'POST',
          body: formData,
          headers: {
            // Supabase will add Authorization header automatically via middleware
            'Accept': 'application/json',
          },
        }
      )

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Upload failed')
      }

      return await response.json()
    } catch (error) {
      console.error('OneDrive upload error:', error)
      throw error
    }
  }

  /**
   * Get signed preview URL through middleware
   * 
   * Returns a time-limited signed URL for previewing the file
   * Useful for displaying documents, images, etc. inline
   */
  async getPreviewUrl(fileId: string): Promise<string> {
    if (!this.isConfigured) {
      console.warn('OneDrive not configured. Preview URL not available.')
      return '#preview-not-available'
    }

    try {
      const response = await fetch(
        `${this.config!.middlewareUrl}${MIDDLEWARE_ENDPOINTS.getSignedUrl}?fileId=${fileId}`,
        {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
        }
      )

      if (!response.ok) {
        throw new Error('Failed to get preview URL')
      }

      const data = await response.json()
      return data.url
    } catch (error) {
      console.error('Error getting preview URL:', error)
      return '#preview-error'
    }
  }

  /**
   * Download file through middleware
   * 
   * Returns file as Blob for local download
   * Middleware handles permission checks and audit logging
   */
  async downloadFile(fileId: string): Promise<Blob | null> {
    if (!this.isConfigured) {
      console.warn('OneDrive not configured. Download not available.')
      return null
    }

    try {
      const response = await fetch(
        `${this.config!.middlewareUrl}${MIDDLEWARE_ENDPOINTS.download}?fileId=${fileId}`,
        {
          method: 'GET',
        }
      )

      if (!response.ok) {
        throw new Error('Download failed')
      }

      return await response.blob()
    } catch (error) {
      console.error('OneDrive download error:', error)
      throw error
    }
  }

  /**
   * Delete file through middleware
   * 
   * Permanently deletes file from OneDrive
   * Middleware handles permission checks and maintains audit trail
   */
  async deleteFile(fileId: string): Promise<boolean> {
    if (!this.isConfigured) {
      console.warn('OneDrive not configured. Delete simulated.')
      return true
    }

    try {
      const response = await fetch(
        `${this.config!.middlewareUrl}${MIDDLEWARE_ENDPOINTS.delete}`,
        {
          method: 'DELETE',
          body: JSON.stringify({ fileId }),
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        }
      )

      if (!response.ok) {
        throw new Error('Delete failed')
      }

      return true
    } catch (error) {
      console.error('OneDrive delete error:', error)
      return false
    }
  }

  /**
   * List files in a folder through middleware
   * 
   * Retrieves file list for a specific path
   * Useful for showing file history and managing attachments
   */
  async listFiles(folder: string): Promise<OneDriveFile[]> {
    if (!this.isConfigured) {
      console.warn('OneDrive not configured. Returning empty list.')
      return []
    }

    try {
      const response = await fetch(
        `${this.config!.middlewareUrl}${MIDDLEWARE_ENDPOINTS.list}?folder=${encodeURIComponent(folder)}`,
        {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
        }
      )

      if (!response.ok) {
        throw new Error('Failed to list files')
      }

      const data = await response.json()
      return data.files || []
    } catch (error) {
      console.error('Error listing files:', error)
      return []
    }
  }

  /**
   * Mock upload for demo mode
   * 
   * Used when OneDrive is not configured
   * Creates a local file metadata entry
   */
  private mockUpload(request: UploadRequest): OneDriveFile {
    return {
      id: `mock-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: request.file.name,
      size: request.file.size,
      mimeType: request.file.type,
      webUrl: `#${request.file.name}`,
      createdAt: new Date().toISOString(),
      modifiedAt: new Date().toISOString(),
      parentPath: request.folder,
      version: '1.0',
    }
  }

  /**
   * Get folder structure for organizing files
   * 
   * Returns standard OneDrive folder paths based on entity type
   * Used to organize sales documents by customer, project, quote, etc.
   */
  getFolderPath(
    type: 'customer' | 'project' | 'quote' | 'payment',
    entityId: string
  ): string {
    const base = '/senia-sales-engine'
    switch (type) {
      case 'customer':
        return `${base}/customers/${entityId}/attachments`
      case 'project':
        return `${base}/projects/${entityId}/attachments`
      case 'quote':
        return `${base}/quotes/${entityId}/attachments`
      case 'payment':
        return `${base}/payments/${entityId}/attachments`
      default:
        return base
    }
  }

  /**
   * Generate standard file naming for uploads
   * 
   * Ensures consistent naming conventions in OneDrive
   */
  getStandardFileName(
    originalName: string,
    fileType: string,
    entityType: string,
    entityId: string
  ): string {
    const timestamp = new Date().toISOString().split('T')[0]
    const ext = originalName.split('.').pop()
    return `${timestamp}_${entityType}_${entityId}_${fileType}.${ext}`
  }

  /**
   * Validate file for upload
   * 
   * Frontend validation before sending to middleware
   * Middleware performs final security checks
   */
  validateFile(file: File, maxSizeMB: number = 100): { valid: boolean; error?: string } {
    const maxSizeBytes = maxSizeMB * 1024 * 1024

    if (file.size > maxSizeBytes) {
      return {
        valid: false,
        error: `File size exceeds ${maxSizeMB}MB limit`,
      }
    }

    const allowedTypes = [
      'application/pdf',
      'image/jpeg',
      'image/png',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/zip',
    ]

    if (!allowedTypes.includes(file.type)) {
      return {
        valid: false,
        error: `File type ${file.type} not allowed`,
      }
    }

    return { valid: true }
  }
}

// Export singleton instance
export const oneDriveService = new OneDriveService()

/**
 * MIDDLEWARE IMPLEMENTATION GUIDE
 * 
 * Your Supabase Edge Function or backend server should implement these endpoints:
 * 
 * POST /api/onedrive/upload
 * - Receive file upload
 * - Validate user permissions
 * - Call Microsoft Graph API to upload
 * - Return file metadata
 * 
 * GET /api/onedrive/signed-url?fileId=xxx
 * - Generate time-limited signed URL
 * - Return URL valid for 1 hour
 * 
 * GET /api/onedrive/download?fileId=xxx
 * - Stream file download
 * - Log access for audit
 * 
 * DELETE /api/onedrive/delete
 * - Delete file from OneDrive
 * - Validate permissions
 * - Log deletion
 * 
 * GET /api/onedrive/list?folder=xxx
 * - List files in folder
 * - Return file metadata array
 * 
 * ERROR HANDLING:
 * - Return 401 for auth failures
 * - Return 403 for permission issues
 * - Return 404 for not found
 * - Return 413 for file too large
 * - Return 500 with meaningful error message for server errors
 */
