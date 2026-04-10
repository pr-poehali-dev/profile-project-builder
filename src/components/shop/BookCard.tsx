import { Book } from '@/data/books';
import { useCart } from '@/context/CartContext';
import Icon from '@/components/ui/icon';

interface BookCardProps {
  book: Book;
  onOpen: (id: number) => void;
}

export default function BookCard({ book, onOpen }: BookCardProps) {
  const { addToCart, items } = useCart();
  const inCart = items.some(i => i.book.id === book.id);

  return (
    <div className="bg-white rounded-xl border border-stone-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col overflow-hidden">
      <button onClick={() => onOpen(book.id)} className="relative overflow-hidden aspect-[3/4]">
        <img
          src={book.image}
          alt={book.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {book.isNew && (
            <span className="bg-emerald-500 text-white text-xs px-2 py-0.5 rounded-full font-semibold">Новинка</span>
          )}
          {book.isBestseller && (
            <span className="bg-amber-500 text-white text-xs px-2 py-0.5 rounded-full font-semibold">Бестселлер</span>
          )}
        </div>
        {book.oldPrice && (
          <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">
            -{Math.round((1 - book.price / book.oldPrice) * 100)}%
          </span>
        )}
      </button>

      <div className="p-4 flex flex-col flex-1 gap-2">
        <span className="text-xs text-amber-700 font-medium">{book.genre}</span>
        <button onClick={() => onOpen(book.id)} className="text-left">
          <h3 className="font-bold text-stone-800 text-sm leading-tight hover:text-amber-700 transition-colors line-clamp-2">
            {book.title}
          </h3>
          <p className="text-xs text-stone-500 mt-1">{book.author}</p>
        </button>

        <div className="flex items-center gap-1 mt-auto">
          <Icon name="Star" size={13} className="text-amber-400 fill-amber-400" />
          <span className="text-xs font-semibold text-stone-700">{book.rating}</span>
          <span className="text-xs text-stone-400">({book.reviewCount})</span>
        </div>

        <div className="flex items-center justify-between mt-1">
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-bold text-stone-900">{book.price} ₽</span>
            {book.oldPrice && (
              <span className="text-sm text-stone-400 line-through">{book.oldPrice} ₽</span>
            )}
          </div>
          <button
            onClick={() => addToCart(book)}
            className={`p-2 rounded-lg transition-all ${
              inCart
                ? 'bg-amber-100 text-amber-700'
                : 'bg-amber-600 text-white hover:bg-amber-700'
            }`}
          >
            <Icon name={inCart ? 'Check' : 'ShoppingCart'} size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
