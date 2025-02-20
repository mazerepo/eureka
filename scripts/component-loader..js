// component-loader.js
class ComponentLoader {
    static async load(section) {
      try {
        const response = await fetch(`./${section}.html`);
        if (!response.ok) throw new Error(`Failed to load ${section}`);
        const html = await response.text();
        const element = document.getElementById(section);
        if (!element) throw new Error(`${section} element not found`);
        
        element.innerHTML = html;
        element.classList.add('component-loaded');
        
        // Dispatch custom event when components are loaded
        document.dispatchEvent(new CustomEvent('components-loaded', {
          detail: { section }
        }));
        
        return true;
      } catch (error) {
        console.error(`ComponentLoader Error (${section}):`, error);
        return false;
      }
    }
  }
  
  // Initialize component loading
  window.addEventListener('DOMContentLoaded', async () => {
    await Promise.all([
      ComponentLoader.load('header'),
      ComponentLoader.load('footer')
    ]);
  });