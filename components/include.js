async function fetchHtml(path) {
  const response = await fetch(path, { cache: 'no-store' });
  if (!response.ok) throw new Error(`Failed to load ${path}: ${response.status}`);
  return response.text();
}

async function includeComponents() {
  const nodes = document.querySelectorAll('[data-include]');
  for (const node of nodes) {
    const path = node.dataset.include;
    try {
      const html = await fetchHtml(path);
      node.innerHTML = html;
    } catch (error) {
      console.error(error);
    }
  }
}

document.addEventListener('DOMContentLoaded', includeComponents);
