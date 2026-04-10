import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import Icon from '@/components/ui/icon';

type Page = 'home' | 'catalog' | 'book' | 'contacts' | 'cart' | 'checkout' | 'success';

interface HeaderProps {
  currentPage: Page;
  onNavigate: (page: Page, bookId?: number) => void;
}

export default function Header({ currentPage, onNavigate }: HeaderProps) {
  const { totalItems } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks: { label: string; page: Page }[] = [
    { label: 'Главная', page: 'home' },
    { label: 'Каталог', page: 'catalog' },
    { label: 'Контакты', page: 'contacts' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-amber-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2 font-bold text-xl text-amber-900 hover:text-amber-700 transition-colors"
        >
          <Icon name="BookOpen" size={26} />
          <span>КнижныйДом</span>
        </button>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map(link => (
            <button
              key={link.page}
              onClick={() => onNavigate(link.page)}
              className={`text-sm font-medium transition-colors ${
                currentPage === link.page
                  ? 'text-amber-700 border-b-2 border-amber-600 pb-0.5'
                  : 'text-stone-600 hover:text-amber-700'
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('cart')}
            className="relative p-2 text-stone-600 hover:text-amber-700 transition-colors"
          >
            <Icon name="ShoppingCart" size={22} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {totalItems}
              </span>
            )}
          </button>

          <button
            className="md:hidden p-2 text-stone-600"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon name={menuOpen ? 'X' : 'Menu'} size={22} />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white border-t border-amber-100 px-4 py-3 flex flex-col gap-3">
          {navLinks.map(link => (
            <button
              key={link.page}
              onClick={() => { onNavigate(link.page); setMenuOpen(false); }}
              className={`text-left text-sm font-medium py-1 ${
                currentPage === link.page ? 'text-amber-700' : 'text-stone-600'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
