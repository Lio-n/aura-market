import { browser } from '$app/environment';

export const resize = (containerId: string, resizeId: string) => {
  const contenedor = document.getElementById(containerId);
  const resize = document.getElementById(resizeId);
  let isResizing = false;

  if (!contenedor || !resize || !browser) return;

  // Iniciar el efecto de arrastre cuando se presiona el mouse
  resize.addEventListener('mousedown', (e) => {
    isResizing = true;
    e.preventDefault();
  });

  // Actualizar dimensiones en función de la posición del mouse
  document.addEventListener('mousemove', (e) => {
    if (isResizing) {
      const newWidth = e.clientX - contenedor.getBoundingClientRect().left;
      const newHeight = e.clientY - contenedor.getBoundingClientRect().top;

      contenedor.style.width = `${newWidth}px`;
      contenedor.style.height = `${newHeight}px`;
    }
  });

  // Finalizar el efecto de arrastre cuando se suelta el mouse
  document.addEventListener('mouseup', () => {
    isResizing = false;
  });
};
