import { action, makeObservable, observable } from 'mobx';

class ThemeStoreClass {
  public isDarkMode = localStorage.getItem('isLightMode') !== 'true';

  constructor() {
    makeObservable(this, {
      isDarkMode: observable,
      toggleTheme: action.bound,
    });
    if (!this.isDarkMode) {
      document.body.classList.remove('dark');
    }
  }

  toggleTheme() {
    document.body.classList.toggle('dark');
    this.isDarkMode = document.body.classList.contains('dark');
    if (this.isDarkMode) {
      localStorage.removeItem('isLightMode');
    } else {
      localStorage.setItem('isLightMode', 'true');
    }
  }
}

export const ThemeStore = new ThemeStoreClass();
