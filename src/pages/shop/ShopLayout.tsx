import { useState } from 'react';
import { CartProvider } from '@/context/CartContext';
import Header from '@/components/shop/Header';
import HomePage from '@/pages/shop/HomePage';
import CatalogPage from '@/pages/shop/CatalogPage';
import BookPage from '@/pages/shop/BookPage';
import CartPage from '@/pages/shop/CartPage';
import CheckoutPage from '@/pages/shop/CheckoutPage';
import SuccessPage from '@/pages/shop/SuccessPage';
import ContactsPage from '@/pages/shop/ContactsPage';
import Icon from '@/components/ui/icon';

type Page = 'home' | 'catalog' | 'book' | 'contacts' | 'cart' | 'checkout' | 'success';

export default function ShopLayout() {
  const [page, setPage] = useState<Page>('home');
  const [bookId, setBookId] = useState<number>(0);

  const navigate = (p: Page, id?: number) => {
    if (id) setBookId(id);
    setPage(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (page) {
      case 'home': return <HomePage onNavigate={navigate} />;
      case 'catalog': return <CatalogPage onNavigate={navigate} />;
      case 'book': return <BookPage bookId={bookId} onNavigate={navigate} />;
      case 'cart': return <CartPage onNavigate={navigate} />;
      case 'checkout': return <CheckoutPage onNavigate={navigate} />;
      case 'success': return <SuccessPage onNavigate={navigate} />;
      case 'contacts': return <ContactsPage />;
    }
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-stone-50">
        <Header currentPage={page} onNavigate={navigate} />
        <main className="animate-fade-in">{renderPage()}</main>

        {/* Footer */}
        <footer className="bg-stone-900 text-stone-400 mt-16 py-10 px-4">
          <div className="max-w-6xl mx-auto grid sm:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 text-white font-bold text-lg mb-3">
                <Icon name="BookOpen" size={22} />
                КнижныйДом
              </div>
              <p className="text-sm leading-relaxed">Ваш надёжный магазин книг с доставкой по всей России с 2010 года.</p>
            </div>
            <div>
              <p className="text-white font-semibold mb-3">Покупателям</p>
              <div className="flex flex-col gap-2 text-sm">
                {['Каталог', 'Доставка и оплата', 'Возврат', 'Контакты'].map(link => (
                  <button
                    key={link}
                    onClick={() => link === 'Каталог' ? navigate('catalog') : link === 'Контакты' ? navigate('contacts') : undefined}
                    className="text-left hover:text-amber-400 transition-colors"
                  >
                    {link}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-white font-semibold mb-3">Контакты</p>
              <div className="flex flex-col gap-2 text-sm">
                <p>+7 (800) 555-35-35</p>
                <p>info@knizhniy-dom.ru</p>
                <p>Пн–Пт: 9:00–20:00</p>
              </div>
            </div>
          </div>
          <div className="max-w-6xl mx-auto border-t border-stone-800 mt-8 pt-6 text-xs text-center">
            © 2024 КнижныйДом. Все права защищены.
          </div>
        </footer>
      </div>
    </CartProvider>
  );
}
