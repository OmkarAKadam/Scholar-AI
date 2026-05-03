export default function Button({ 
  children, 
  variant = 'primary', 
  color = 'brand', // 'brand', 'study', 'resume', 'code'
  isLoading = false, 
  className = '',
  ...props 
}) {
  const baseStyles = "inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-[#0D1117] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
  
  const colors = {
    brand: {
      primary: 'bg-brand-primary text-white hover:bg-brand-dark focus:ring-brand-primary border border-transparent',
      secondary: 'bg-brand-light text-brand-dark hover:bg-green-100 focus:ring-brand-primary border border-transparent dark:bg-[#16351F] dark:text-[#E6EDF3] dark:hover:bg-[#1A6B32]',
      outline: 'bg-white text-brand-primary hover:bg-brand-light focus:ring-brand-primary border border-brand-primary dark:bg-[#161B22] dark:hover:bg-[#0D1117]',
    },
    study: {
      primary: 'bg-study text-white hover:bg-study-dark focus:ring-study border border-transparent',
      secondary: 'bg-study-light text-study-dark hover:bg-blue-100 focus:ring-study border border-transparent dark:bg-[#10213F] dark:text-[#E6EDF3] dark:hover:bg-[#1D4ED8]',
      outline: 'bg-white text-study hover:bg-study-light focus:ring-study border border-study dark:bg-[#161B22] dark:hover:bg-[#0D1117]',
    },
    resume: {
      primary: 'bg-resume text-white hover:bg-resume-dark focus:ring-resume border border-transparent',
      secondary: 'bg-resume-light text-resume-dark hover:bg-amber-100 focus:ring-resume border border-transparent dark:bg-[#3A2605] dark:text-[#E6EDF3] dark:hover:bg-[#B45309]',
      outline: 'bg-white text-resume hover:bg-resume-light focus:ring-resume border border-resume dark:bg-[#161B22] dark:hover:bg-[#0D1117]',
    },
    code: {
      primary: 'bg-code text-white hover:bg-code-dark focus:ring-code border border-transparent',
      secondary: 'bg-code-light text-code-dark hover:bg-purple-100 focus:ring-code border border-transparent dark:bg-[#24154D] dark:text-[#E6EDF3] dark:hover:bg-[#6D28D9]',
      outline: 'bg-white text-code hover:bg-code-light focus:ring-code border border-code dark:bg-[#161B22] dark:hover:bg-[#0D1117]',
    }
  }

  const colorStyles = colors[color] || colors.brand
  const variantStyle = colorStyles[variant] || colorStyles.primary

  return (
    <button 
      className={`${baseStyles} ${variantStyle} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {children}
    </button>
  )
}
