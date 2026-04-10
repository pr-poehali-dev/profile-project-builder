import { BOOKS } from '@/data/books';
import BookCard from '@/components/shop/BookCard';
import Icon from '@/components/ui/icon';

type Page = 'home' | 'catalog' | 'book' | 'contacts' | 'cart' | 'checkout' | 'success';

interface HomePageProps {
  onNavigate: (page: Page, bookId?: number) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const bestsellers = BOOKS.filter(b => b.isBestseller).slice(0, 4);
  const newBooks = BOOKS.filter(b => b.isNew).slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-amber-900 via-amber-800 to-stone-800 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 text-center md:text-left">
            <p className="text-amber-300 text-sm font-semibold uppercase tracking-widest mb-3">Книжный интернет-магазин</p>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-5">
              Тысячи книг<br />
              <span className="text-amber-300">с доставкой</span> по России
            </h1>
            <p className="text-stone-300 text-lg mb-8 max-w-md">
              Художественная литература, нон-фикшн, детские книги — найдите свою следующую любимую книгу.
            </p>
            <div className="flex gap-3 justify-center md:justify-start flex-wrap">
              <button
                onClick={() => onNavigate('catalog')}
                className="bg-amber-500 hover:bg-amber-400 text-white font-bold px-6 py-3 rounded-lg transition-colors flex items-center gap-2"
              >
                <Icon name="BookOpen" size={18} />
                Перейти в каталог
              </button>
              <button
                onClick={() => onNavigate('catalog')}
                className="border border-amber-400 text-amber-300 hover:bg-amber-800 font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                Все новинки
              </button>
            </div>
          </div>
          <div className="hidden md:flex gap-4 items-end">
            {BOOKS.slice(0, 3).map((book, i) => (
              <div
                key={book.id}
                className="rounded-lg overflow-hidden shadow-2xl cursor-pointer hover:scale-105 transition-transform"
                style={{ width: 110, marginBottom: i === 1 ? 32 : 0 }}
                onClick={() => onNavigate('book', book.id)}
              >
                <img src={book.image} alt={book.title} className="w-full h-40 object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-amber-50 py-8 border-b border-amber-100">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: 'Truck', title: 'Доставка от 1 дня', sub: 'по всей России' },
            { icon: 'RotateCcw', title: 'Возврат 30 дней', sub: 'без объяснений' },
            { icon: 'ShieldCheck', title: 'Оригинальные книги', sub: 'от издателей' },
            { icon: 'Headphones', title: 'Поддержка 24/7', sub: 'готовы помочь' },
          ].map(item => (
            <div key={item.icon} className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name={item.icon} size={20} className="text-amber-700" />
              </div>
              <div>
                <p className="text-sm font-bold text-stone-800">{item.title}</p>
                <p className="text-xs text-stone-500">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bestsellers */}
      <section className="py-12 px-4 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-stone-800 flex items-center gap-2">
            <Icon name="TrendingUp" size={22} className="text-amber-600" />
            Бестселлеры
          </h2>
          <button
            onClick={() => onNavigate('catalog')}
            className="text-sm text-amber-700 hover:text-amber-900 font-medium flex items-center gap-1"
          >
            Все книги <Icon name="ChevronRight" size={16} />
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {bestsellers.map(book => (
            <BookCard key={book.id} book={book} onOpen={(id) => onNavigate('book', id)} />
          ))}
        </div>
      </section>

      {/* Banner */}
      <section className="px-4 max-w-6xl mx-auto mb-12">
        <div className="bg-gradient-to-r from-stone-800 to-amber-900 rounded-2xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-amber-300 text-sm font-semibold mb-1">Специальное предложение</p>
            <h3 className="text-2xl font-bold mb-2">Скидка 20% на новинки</h3>
            <p className="text-stone-300 text-sm">Только до конца месяца — успейте обновить библиотеку</p>
          </div>
          <button
            onClick={() => onNavigate('catalog')}
            className="bg-amber-500 hover:bg-amber-400 text-white font-bold px-6 py-3 rounded-lg transition-colors whitespace-nowrap"
          >
            Смотреть новинки
          </button>
        </div>
      </section>

      {/* New books */}
      <section className="py-12 px-4 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-stone-800 flex items-center gap-2">
            <Icon name="Sparkles" size={22} className="text-emerald-600" />
            Новинки
          </h2>
          <button
            onClick={() => onNavigate('catalog')}
            className="text-sm text-amber-700 hover:text-amber-900 font-medium flex items-center gap-1"
          >
            Все новинки <Icon name="ChevronRight" size={16} />
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {newBooks.map(book => (
            <BookCard key={book.id} book={book} onOpen={(id) => onNavigate('book', id)} />
          ))}
        </div>
      </section>
    </div>
  );
}