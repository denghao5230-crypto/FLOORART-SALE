import { useState, useRef } from 'react'
import { Upload, X, CheckCircle, AlertCircle, File, FileText, Image } from 'lucide-react'
import { oneDriveService, type UploadRequest, type OneDriveFile } from '@/lib/onedrive'

interface FileUploadProps {
  onUploadComplete?: (file: OneDriveFile) => void
  onUploadError?: (error: Error) => void
  folder: string
  fileType: string
  customerId?: string
  projectId?: string
  quoteId?: string
  paymentId?: string
  maxSizeMB?: number
  className?: string
}

export function FileUpload({
  onUploadComplete,
  onUploadError,
  folder,
  fileType,
  customerId,
  projectId,
  quoteId,
  paymentId,
  maxSizeMB = 100,
  className = '',
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadedFile, setUploadedFile] = useState<OneDriveFile | null>(null)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Get file icon based on type
  const getFileIcon = (mimeType: string) => {
    if (mimeType.startsWith('image/')) {
      return <Image className="w-8 h-8" />
    }
    if (mimeType.includes('pdf') || mimeType.includes('word') || mimeType.includes('sheet')) {
      return <FileText className="w-8 h-8" />
    }
    return <File className="w-8 h-8" />
  }

  // Format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
  }

  // Handle file selection
  const handleFileSelect = async (file: File) => {
    setError(null)

    // Validate file
    const validation = oneDriveService.validateFile(file, maxSizeMB)
    if (!validation.valid) {
      setError(validation.error || 'File validation failed')
      onUploadError?.(new Error(validation.error))
      return
    }

    // Upload file
    setIsUploading(true)
    setUploadProgress(0)

    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + Math.random() * 30
        })
      }, 300)

      const uploadRequest: UploadRequest = {
        file,
        folder,
        fileType,
        customerId,
        projectId,
        quoteId,
        paymentId,
      }

      const result = await oneDriveService.uploadFile(uploadRequest)

      clearInterval(progressInterval)
      setUploadProgress(100)

      if (result) {
        setUploadedFile(result)
        onUploadComplete?.(result)

        // Reset after 3 seconds
        setTimeout(() => {
          setUploadedFile(null)
          setIsUploading(false)
          setUploadProgress(0)
        }, 3000)
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Upload failed')
      setError(error.message)
      onUploadError?.(error)
      setIsUploading(false)
      setUploadProgress(0)
    }
  }

  // Handle drag and drop
  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  // Handle file input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files
    if (files && files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  // Show success state
  if (uploadedFile && uploadProgress === 100) {
    return (
      <div className={`p-4 border-2 border-green-200 dark:border-green-800 rounded-lg bg-green-50 dark:bg-green-900/20 ${className}`}>
        <div className="flex items-center gap-3">
          <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="font-medium text-green-900 dark:text-green-300 truncate">
              {uploadedFile.name}
            </p>
            <p className="text-sm text-green-700 dark:text-green-400">
              {formatFileSize(uploadedFile.size)}
            </p>
          </div>
          <button
            onClick={() => {
              setUploadedFile(null)
              setUploadProgress(0)
            }}
            className="p-1 text-green-600 hover:bg-green-200 dark:hover:bg-green-800 rounded transition-colors flex-shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    )
  }

  // Show uploading state
  if (isUploading) {
    return (
      <div className={`p-4 border-2 border-blue-200 dark:border-blue-800 rounded-lg bg-blue-50 dark:bg-blue-900/20 ${className}`}>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Upload className="w-5 h-5 text-blue-600 dark:text-blue-400 animate-pulse" />
            <p className="font-medium text-blue-900 dark:text-blue-300">上传中...</p>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 bg-blue-200 dark:bg-blue-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 dark:bg-blue-400 transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>

          <p className="text-sm text-blue-700 dark:text-blue-400">
            {Math.round(uploadProgress)}%
          </p>
        </div>
      </div>
    )
  }

  // Show normal drop zone
  return (
    <div className={className}>
      {/* Error Message */}
      {error && (
        <div className="mb-3 p-3 border-l-4 border-red-500 bg-red-50 dark:bg-red-900/20 rounded">
          <div className="flex gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-red-900 dark:text-red-300 text-sm">上传失败</p>
              <p className="text-red-700 dark:text-red-400 text-sm">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Drop Zone */}
      <div
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`p-8 border-2 border-dashed rounded-lg transition-colors cursor-pointer ${
          isDragging
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
            : 'border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 hover:border-blue-400 dark:hover:border-blue-600'
        }`}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleInputChange}
          className="hidden"
          accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.zip"
        />

        <div className="flex flex-col items-center justify-center gap-3">
          <div className={`p-3 rounded-lg ${isDragging ? 'bg-blue-200 dark:bg-blue-800' : 'bg-gray-100 dark:bg-gray-800'}`}>
            <Upload className={`w-6 h-6 ${isDragging ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'}`} />
          </div>

          <div className="text-center">
            <p className="font-medium text-gray-900 dark:text-white">
              {isDragging ? '放开来上传文件' : '拖拽文件或点击上传'}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              最大文件大小: {maxSizeMB}MB
            </p>
          </div>

          {/* Supported formats */}
          <div className="text-xs text-gray-500 dark:text-gray-400">
            支持: PDF, DOC, DOCX, XLS, XLSX, JPG, PNG, ZIP
          </div>
        </div>
      </div>

      {/* OneDrive Info */}
      {!oneDriveService.configured && (
        <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded text-sm text-yellow-800 dark:text-yellow-300">
          本地演示模式: 文件存储在浏览器本地。生产环境将使用 OneDrive Business。
        </div>
      )}
    </div>
  )
}
