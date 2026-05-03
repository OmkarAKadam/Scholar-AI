export function parseMarkdown(text) {
  if (!text) return ''
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/^### (.*$)/gm, '<h3 class="text-lg font-semibold mt-3 mb-1 dark:text-[#E6EDF3]">$1</h3>')
    .replace(/^## (.*$)/gm, '<h2 class="text-xl font-bold mt-4 mb-2 dark:text-[#E6EDF3]">$1</h2>')
    .replace(/^• (.*$)/gm, '<li class="ml-4 list-disc mb-1">$1</li>')
    .replace(/^\* (.*$)/gm, '<li class="ml-4 list-disc mb-1">$1</li>')
    .replace(/^- (.*$)/gm, '<li class="ml-4 list-disc mb-1">$1</li>')
    .replace(/\n/g, '<br/>')
}
