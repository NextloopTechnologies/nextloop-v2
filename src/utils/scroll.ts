// utils/scroll.ts

export function scrollToSection(id: string) {
  const element = document.querySelector(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}
