export default function TabBar({ tabs, activeTab, onChange, accentColor = 'bg-study text-study' }) {
  // accentColor should ideally pass classes for active state, e.g., 'text-study border-study'
  
  return (
    <div className="border-b border-neutral-200 dark:border-[#30363D]">
      <nav className="-mb-px flex space-x-6" aria-label="Tabs">
        {tabs.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => onChange(tab)}
              className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors
                ${isActive 
                  ? `${accentColor.replace('bg-', 'border-').replace('text-', 'text-')} `
                  : 'border-transparent text-neutral-500 dark:text-[#8B949E] hover:text-neutral-700 dark:hover:text-[#E6EDF3] hover:border-neutral-300 dark:hover:border-[#30363D]'
                }
              `}
            >
              {tab}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
