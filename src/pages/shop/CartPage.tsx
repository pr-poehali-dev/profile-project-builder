import { useCart } from '@/context/CartContext';
import Icon from '@/components/ui/icon';

type Page = 'home' | 'catalog' | 'book' | 'contacts' | 'cart' | 'checkout' | 'success';

interface CartPageProps {
  onNavigate: (page: Page, bookId?: number) => void;
}

export default function CartPage({ onNavigate }: CartPageProps) {
  const { items, removeFromCart, updateQuantity, totalPrice } = useCart();

  const delivery = totalPrice >= 2000 ? 0 : 299;

  if (items.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-20 text-center">
        <Icon name="ShoppingCart" size={64} className="mx-auto text-stone-200 mb-4" />
        <h2 className="text-2xl font-bold text-stone-700 mb-2">Корзина пуста</h2>
        <p className="text-stone-400 mb-6">Добавьте книги из каталога, чтобы оформить заказ</p>
        <button
          onClick={() => onNavigate('catalog')}
          className="bg-amber-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-amber-700 transition-colors"
        >
          Перейти в каталог
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-stone-800 mb-2">Корзина</h1>
      <p className="text-stone-400 text-sm mb-8">{items.length} {items.length === 1 ? 'товар' : 'товара'}</p>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {items.map(({ book, quantity }) => (
            <div key={book.id} className="bg-white rounded-xl border border-stone-100 shadow-sm p-4 flex gap-4">
              <button onClick={() => onNavigate('book', book.id)}>
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-16 h-20 object-cover rounded-lg flex-shrink-0 hover:opacity-80 transition-opacity"
                />
              </button>
              <div className="flex-1 min-w-0">
                <button
                  onClick={() => onNavigate('book', book.id)}
                  className="font-bold text-stone-800 hover:text-amber-700 transition-colors text-sm leading-tight line-clamp-2 text-left"
                >
                  {book.title}
                </button>
                <p className="text-xs text-stone-400 mt-0.5">{book.author}</p>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(book.id, quantity - 1)}
                      className="w-7 h-7 rounded-lg bg-stone-100 hover:bg-stone-200 flex items-center justify-center transition-colors"
                    >
                      <Icon name="Minus" size={14} />
                    </button>
                    <span className="w-6 text-center font-semibold text-stone-800 text-sm">{quantity}</span>
                    <button
                      onClick={() => updateQuantity(book.id, quantity + 1)}
                      className="w-7 h-7 rounded-lg bg-stone-100 hover:bg-stone-200 flex items-center justify-center transition-colors"
                    >
                      <Icon name="Plus" size={14} />
                    </button>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-stone-900">{book.price * quantity} ₽</span>
                    <button
                      onClick={() => removeFromCart(book.id)}
                      className="text-stone-300 hover:text-red-400 transition-colors"
                    >
                      <Icon name="Trash2" size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-stone-100 shadow-sm p-6 sticky top-20">
            <h2 className="font-bold text-stone-800 text-lg mb-4">Итого</h2>

            <div className="flex flex-col gap-2 text-sm mb-4">
              <div className="flex justify-between text-stone-600">
                <span>Товары ({items.reduce((s, i) => s + i.quantity, 0)} шт.)</span>
                <span>{totalPrice} ₽</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Доставка</span>
                <span className={delivery === 0 ? 'text-emerald-600 font-semibold' : ''}>
                  {delivery === 0 ? 'Бесплатно' : `${delivery} ₽`}
                </span>
              </div>
              {delivery > 0 && (
                <p className="text-xs text-stone-400">Бесплатная доставка от 2 000 ₽</p>
              )}
            </div>

            <div className="border-t border-stone-100 pt-4 flex justify-between items-baseline mb-6">
              <span className="font-bold text-stone-800">К оплате</span>
              <span className="text-2xl font-bold text-stone-900">{totalPrice + delivery} ₽</span>
            </div>

            <button
              onClick={() => onNavigate('checkout')}
              className="w-full bg-amber-600 text-white font-bold py-3 rounded-xl hover:bg-amber-700 transition-colors shadow-lg shadow-amber-100"
            >
              Оформить заказ
            </button>

            <button
              onClick={() => onNavigate('catalog')}
              className="w-full mt-3 text-stone-500 text-sm hover:text-amber-700 transition-colors py-2"
            >
              Продолжить покупки
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
