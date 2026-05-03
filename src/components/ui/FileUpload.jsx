import { useRef, useState } from 'react'

export default function FileUpload({ accept, onFileSelect, accentColor = 'border-study text-study' }) {
  const [isDragging, setIsDragging] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [file, setFile] = useState(null)
  const fileInputRef = useRef(null)

  const accentHex = accentColor.includes('resume')
    ? '#F59E0B'
    : accentColor.includes('code')
      ? '#8B5CF6'
      : '#3B82F6'

  const handleDragEnter = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0])
    }
  }

  const handleFile = (selectedFile) => {
    setFile(selectedFile)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 1500)
    if (onFileSelect) onFileSelect(selectedFile)
  }

  const handleRemove = (e) => {
    e.stopPropagation()
    setFile(null)
    setShowSuccess(false)
    if (fileInputRef.current) fileInputRef.current.value = ''
    if (onFileSelect) onFileSelect(null)
  }

  return (
    <div
      className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer dark:bg-[#161B22]
        ${isDragging ? 'bg-opacity-10 bg-current border-current ' + accentColor : 'border-neutral-300 dark:border-[#30363D] hover:border-current ' + accentColor}
      `}
      style={isDragging ? { borderColor: accentHex, backgroundColor: `${accentHex}11` } : undefined}
      onClick={() => fileInputRef.current?.click()}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleChange}
        accept={accept}
        className="hidden"
      />
      
      {showSuccess ? (
        <div className="flex flex-col items-center">
          <div className="checkmark-pop w-14 h-14 mb-4 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="text-lg font-medium text-neutral-700 dark:text-[#E6EDF3]">File ready</p>
          <p className="text-sm text-neutral-500 dark:text-[#8B949E] mt-1">{file?.name}</p>
        </div>
      ) : !file ? (
        <div className="flex flex-col items-center">
          <svg className="w-12 h-12 mb-4 text-neutral-400 dark:text-[#8B949E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <p className="text-lg font-medium text-neutral-700 dark:text-[#E6EDF3]">Click to upload or drag and drop</p>
          <p className="text-sm text-neutral-500 dark:text-[#8B949E] mt-1">PDF or TXT up to 10MB</p>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 mb-4 rounded-lg bg-current bg-opacity-10 flex items-center justify-center">
             <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
               <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
             </svg>
          </div>
          <p className="text-lg font-medium text-neutral-800 dark:text-[#E6EDF3] break-all">{file.name}</p>
          <p className="text-sm text-neutral-500 dark:text-[#8B949E] mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
          <button 
            onClick={handleRemove}
            className="mt-4 text-sm font-medium hover:underline focus:outline-none"
          >
            Remove file
          </button>
        </div>
      )}
    </div>
  )
}
