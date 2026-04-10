import Icon from '@/components/ui/icon';

type Page = 'home' | 'catalog' | 'book' | 'contacts' | 'cart' | 'checkout' | 'success';

interface SuccessPageProps {
  onNavigate: (page: Page, bookId?: number) => void;
}

export default function SuccessPage({ onNavigate }: SuccessPageProps) {
  const orderNumber = Math.floor(Math.random() * 90000) + 10000;

  return (
    <div className="max-w-lg mx-auto px-4 py-20 text-center">
      <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <Icon name="CheckCircle" size={44} className="text-emerald-500" />
      </div>
      <h1 className="text-3xl font-bold text-stone-800 mb-3">Заказ оформлен!</h1>
      <p className="text-stone-500 mb-2">Номер заказа: <span className="font-bold text-stone-800">#{orderNumber}</span></p>
      <p className="text-stone-500 mb-8">
        Мы отправили подтверждение на вашу почту. Свяжемся с вами в течение часа для уточнения деталей доставки.
      </p>

      <div className="bg-amber-50 border border-amber-100 rounded-xl p-5 mb-8 text-left flex flex-col gap-3">
        {[
          { icon: 'Clock', text: 'Обработка заказа — до 1 часа' },
          { icon: 'Package', text: 'Упаковка и отправка — 1 рабочий день' },
          { icon: 'Truck', text: 'Доставка курьером — 1-2 дня' },
        ].map(item => (
          <div key={item.icon} className="flex items-center gap-3 text-sm text-stone-600">
            <Icon name={item.icon} size={18} className="text-amber-600 flex-shrink-0" />
            <span>{item.text}</span>
          </div>
        ))}
      </div>

      <div className="flex gap-3 justify-center flex-wrap">
        <button
          onClick={() => onNavigate('home')}
          className="bg-amber-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-amber-700 transition-colors"
        >
          На главную
        </button>
        <button
          onClick={() => onNavigate('catalog')}
          className="border border-stone-200 text-stone-600 font-semibold px-6 py-3 rounded-xl hover:border-amber-400 hover:text-amber-700 transition-colors"
        >
          Продолжить покупки
        </button>
      </div>
    </div>
  );
}
