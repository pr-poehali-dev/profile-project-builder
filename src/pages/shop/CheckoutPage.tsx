import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import Icon from '@/components/ui/icon';

type Page = 'home' | 'catalog' | 'book' | 'contacts' | 'cart' | 'checkout' | 'success';

interface CheckoutPageProps {
  onNavigate: (page: Page, bookId?: number) => void;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  city: string;
  address: string;
  delivery: 'courier' | 'pickup' | 'post';
  payment: 'card' | 'cash';
  comment: string;
}

export default function CheckoutPage({ onNavigate }: CheckoutPageProps) {
  const { items, totalPrice, clearCart } = useCart();
  const [form, setForm] = useState<FormData>({
    name: '', email: '', phone: '', city: '', address: '',
    delivery: 'courier', payment: 'card', comment: '',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [loading, setLoading] = useState(false);

  const delivery = totalPrice >= 2000 ? 0 : 299;

  const set = (field: keyof FormData, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const validate = () => {
    const e: Partial<FormData> = {};
    if (!form.name.trim()) e.name = 'Введите имя';
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Неверный email';
    if (!form.phone.match(/^\+?[\d\s\-()]{10,}$/)) e.phone = 'Неверный телефон';
    if (!form.city.trim()) e.city = 'Введите город';
    if (form.delivery !== 'pickup' && !form.address.trim()) e.address = 'Введите адрес';
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length > 0) { setErrors(e2); return; }
    setLoading(true);
    setTimeout(() => {
      clearCart();
      onNavigate('success');
    }, 1500);
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-stone-500 mb-4">Нет товаров для оформления</p>
        <button onClick={() => onNavigate('catalog')} className="text-amber-700 underline">В каталог</button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex items-center gap-2 text-sm text-stone-400 mb-6">
        <button onClick={() => onNavigate('cart')} className="hover:text-amber-700 flex items-center gap-1">
          <Icon name="ChevronLeft" size={16} /> Корзина
        </button>
      </div>

      <h1 className="text-3xl font-bold text-stone-800 mb-8">Оформление заказа</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 flex flex-col gap-6">

            {/* Contacts */}
            <div className="bg-white rounded-xl border border-stone-100 shadow-sm p-6">
              <h2 className="font-bold text-stone-800 text-lg mb-4 flex items-center gap-2">
                <Icon name="User" size={18} className="text-amber-600" />
                Контактные данные
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {(['name', 'email', 'phone'] as const).map(field => (
                  <div key={field} className={field === 'name' ? 'sm:col-span-2' : ''}>
                    <label className="block text-sm font-medium text-stone-700 mb-1">
                      {field === 'name' ? 'Имя и фамилия' : field === 'email' ? 'Email' : 'Телефон'}
                      <span className="text-red-400"> *</span>
                    </label>
                    <input
                      type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
                      value={form[field]}
                      onChange={e => set(field, e.target.value)}
                      placeholder={field === 'phone' ? '+7 (999) 000-00-00' : ''}
                      className={`w-full px-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-200 ${
                        errors[field] ? 'border-red-300 bg-red-50' : 'border-stone-200 focus:border-amber-400'
                      }`}
                    />
                    {errors[field] && <p className="text-red-400 text-xs mt-1">{errors[field]}</p>}
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery */}
            <div className="bg-white rounded-xl border border-stone-100 shadow-sm p-6">
              <h2 className="font-bold text-stone-800 text-lg mb-4 flex items-center gap-2">
                <Icon name="Truck" size={18} className="text-amber-600" />
                Способ доставки
              </h2>
              <div className="flex flex-col gap-3 mb-4">
                {([
                  { value: 'courier', label: 'Курьером', sub: 'Доставка за 1-2 дня', icon: 'Bike' },
                  { value: 'pickup', label: 'Самовывоз', sub: 'Из нашего магазина', icon: 'Store' },
                  { value: 'post', label: 'Почта России', sub: 'Доставка за 5-14 дней', icon: 'Mail' },
                ] as const).map(opt => (
                  <label
                    key={opt.value}
                    className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                      form.delivery === opt.value
                        ? 'border-amber-400 bg-amber-50'
                        : 'border-stone-100 hover:border-stone-200'
                    }`}
                  >
                    <input
                      type="radio"
                      name="delivery"
                      value={opt.value}
                      checked={form.delivery === opt.value}
                      onChange={() => set('delivery', opt.value)}
                      className="accent-amber-600"
                    />
                    <Icon name={opt.icon} size={18} className="text-amber-600" />
                    <div>
                      <p className="font-semibold text-stone-800 text-sm">{opt.label}</p>
                      <p className="text-xs text-stone-400">{opt.sub}</p>
                    </div>
                  </label>
                ))}
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">
                    Город <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.city}
                    onChange={e => set('city', e.target.value)}
                    className={`w-full px-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-200 ${
                      errors.city ? 'border-red-300 bg-red-50' : 'border-stone-200 focus:border-amber-400'
                    }`}
                  />
                  {errors.city && <p className="text-red-400 text-xs mt-1">{errors.city}</p>}
                </div>
                {form.delivery !== 'pickup' && (
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">
                      Адрес <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={form.address}
                      onChange={e => set('address', e.target.value)}
                      placeholder="Улица, дом, квартира"
                      className={`w-full px-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-200 ${
                        errors.address ? 'border-red-300 bg-red-50' : 'border-stone-200 focus:border-amber-400'
                      }`}
                    />
                    {errors.address && <p className="text-red-400 text-xs mt-1">{errors.address}</p>}
                  </div>
                )}
              </div>
            </div>

            {/* Payment */}
            <div className="bg-white rounded-xl border border-stone-100 shadow-sm p-6">
              <h2 className="font-bold text-stone-800 text-lg mb-4 flex items-center gap-2">
                <Icon name="CreditCard" size={18} className="text-amber-600" />
                Способ оплаты
              </h2>
              <div className="flex flex-col gap-3">
                {([
                  { value: 'card', label: 'Банковская карта', sub: 'Visa, MasterCard, МИР', icon: 'CreditCard' },
                  { value: 'cash', label: 'Наличными', sub: 'При получении', icon: 'Banknote' },
                ] as const).map(opt => (
                  <label
                    key={opt.value}
                    className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                      form.payment === opt.value
                        ? 'border-amber-400 bg-amber-50'
                        : 'border-stone-100 hover:border-stone-200'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={opt.value}
                      checked={form.payment === opt.value}
                      onChange={() => set('payment', opt.value)}
                      className="accent-amber-600"
                    />
                    <Icon name={opt.icon} size={18} className="text-amber-600" />
                    <div>
                      <p className="font-semibold text-stone-800 text-sm">{opt.label}</p>
                      <p className="text-xs text-stone-400">{opt.sub}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Comment */}
            <div className="bg-white rounded-xl border border-stone-100 shadow-sm p-6">
              <h2 className="font-bold text-stone-800 text-lg mb-4">Комментарий к заказу</h2>
              <textarea
                value={form.comment}
                onChange={e => set('comment', e.target.value)}
                placeholder="Пожелания по доставке, подарочная упаковка..."
                rows={3}
                className="w-full px-3 py-2.5 border border-stone-200 rounded-lg text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 resize-none"
              />
            </div>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-stone-100 shadow-sm p-6 sticky top-20">
              <h2 className="font-bold text-stone-800 text-lg mb-4">Ваш заказ</h2>

              <div className="flex flex-col gap-3 mb-4">
                {items.map(({ book, quantity }) => (
                  <div key={book.id} className="flex gap-3 items-center">
                    <img src={book.image} alt={book.title} className="w-10 h-14 object-cover rounded" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-stone-700 leading-tight line-clamp-2">{book.title}</p>
                      <p className="text-xs text-stone-400 mt-0.5">{quantity} шт.</p>
                    </div>
                    <p className="text-sm font-bold text-stone-900 whitespace-nowrap">{book.price * quantity} ₽</p>
                  </div>
                ))}
              </div>

              <div className="border-t border-stone-100 pt-3 flex flex-col gap-1.5 text-sm mb-4">
                <div className="flex justify-between text-stone-600">
                  <span>Товары</span>
                  <span>{totalPrice} ₽</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Доставка</span>
                  <span className={delivery === 0 ? 'text-emerald-600 font-semibold' : ''}>
                    {delivery === 0 ? 'Бесплатно' : `${delivery} ₽`}
                  </span>
                </div>
                <div className="flex justify-between font-bold text-stone-900 text-base pt-1 border-t border-stone-100 mt-1">
                  <span>Итого</span>
                  <span>{totalPrice + delivery} ₽</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-amber-600 text-white font-bold py-3 rounded-xl hover:bg-amber-700 transition-colors shadow-lg shadow-amber-100 flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <Icon name="Loader2" size={18} className="animate-spin" />
                    Оформляем...
                  </>
                ) : (
                  <>
                    <Icon name="Check" size={18} />
                    Подтвердить заказ
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
