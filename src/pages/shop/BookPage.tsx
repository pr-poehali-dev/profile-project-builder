import { BOOKS } from '@/data/books';
import { useCart } from '@/context/CartContext';
import BookCard from '@/components/shop/BookCard';
import Icon from '@/components/ui/icon';

type Page = 'home' | 'catalog' | 'book' | 'contacts' | 'cart' | 'checkout' | 'success';

interface BookPageProps {
  bookId: number;
  onNavigate: (page: Page, bookId?: number) => void;
}

export default function BookPage({ bookId, onNavigate }: BookPageProps) {
  const { addToCart, items } = useCart();
  const book = BOOKS.find(b => b.id === bookId);
  const related = BOOKS.filter(b => b.id !== bookId && b.genre === book?.genre).slice(0, 4);
  const inCart = items.some(i => i.book.id === bookId);

  if (!book) return (
    <div className="text-center py-20 text-stone-500">
      <p>Книга не найдена</p>
      <button onClick={() => onNavigate('catalog')} className="mt-4 text-amber-700 underline">В каталог</button>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-stone-400 mb-6">
        <button onClick={() => onNavigate('home')} className="hover:text-amber-700">Главная</button>
        <Icon name="ChevronRight" size={14} />
        <button onClick={() => onNavigate('catalog')} className="hover:text-amber-700">Каталог</button>
        <Icon name="ChevronRight" size={14} />
        <span className="text-stone-600 truncate max-w-xs">{book.title}</span>
      </div>

      {/* Main block */}
      <div className="grid md:grid-cols-2 gap-10 mb-14">
        <div className="relative">
          <div className="rounded-2xl overflow-hidden shadow-xl aspect-[3/4] max-w-sm mx-auto">
            <img src={book.image} alt={book.title} className="w-full h-full object-cover" />
          </div>
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {book.isNew && (
              <span className="bg-emerald-500 text-white text-xs px-2.5 py-1 rounded-full font-semibold">Новинка</span>
            )}
            {book.isBestseller && (
              <span className="bg-amber-500 text-white text-xs px-2.5 py-1 rounded-full font-semibold">Бестселлер</span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <span className="text-sm text-amber-700 font-semibold">{book.genre}</span>
          <h1 className="text-3xl font-bold text-stone-900 leading-tight">{book.title}</h1>
          <p className="text-stone-500 text-lg">{book.author}</p>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              {[1,2,3,4,5].map(star => (
                <Icon
                  key={star}
                  name="Star"
                  size={16}
                  className={star <= Math.round(book.rating) ? 'text-amber-400 fill-amber-400' : 'text-stone-200 fill-stone-200'}
                />
              ))}
            </div>
            <span className="font-bold text-stone-800">{book.rating}</span>
            <span className="text-stone-400 text-sm">({book.reviewCount} отзывов)</span>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-4xl font-bold text-stone-900">{book.price} ₽</span>
            {book.oldPrice && (
              <span className="text-xl text-stone-400 line-through">{book.oldPrice} ₽</span>
            )}
            {book.oldPrice && (
              <span className="bg-red-100 text-red-600 text-sm font-bold px-2 py-0.5 rounded-full">
                -{Math.round((1 - book.price / book.oldPrice) * 100)}%
              </span>
            )}
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={() => addToCart(book)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-base transition-all ${
                inCart
                  ? 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                  : 'bg-amber-600 text-white hover:bg-amber-700 shadow-lg shadow-amber-200'
              }`}
            >
              <Icon name={inCart ? 'Check' : 'ShoppingCart'} size={20} />
              {inCart ? 'В корзине' : 'В корзину'}
            </button>
            {inCart && (
              <button
                onClick={() => onNavigate('cart')}
                className="px-5 py-3 border-2 border-amber-600 text-amber-700 rounded-xl font-bold hover:bg-amber-50 transition-colors"
              >
                Оформить
              </button>
            )}
          </div>

          {/* Details */}
          <div className="bg-stone-50 rounded-xl p-4 grid grid-cols-2 gap-3 mt-2">
            {[
              { label: 'Издательство', value: book.publisher },
              { label: 'Год', value: book.year },
              { label: 'Страниц', value: book.pages },
              { label: 'Наличие', value: book.inStock ? 'В наличии' : 'Нет в наличии' },
            ].map(item => (
              <div key={item.label}>
                <p className="text-xs text-stone-400">{item.label}</p>
                <p className="text-sm font-semibold text-stone-800">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mb-14">
        <h2 className="text-xl font-bold text-stone-800 mb-3">Описание</h2>
        <p className="text-stone-600 leading-relaxed text-base">{book.description}</p>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-stone-800 mb-4">Похожие книги</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {related.map(b => (
              <BookCard key={b.id} book={b} onOpen={(id) => onNavigate('book', id)} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
