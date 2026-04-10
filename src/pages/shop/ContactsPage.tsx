import { useState } from 'react';
import Icon from '@/components/ui/icon';

export default function ContactsPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-stone-800 mb-2">Контакты</h1>
      <p className="text-stone-500 mb-10">Свяжитесь с нами любым удобным способом</p>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Info */}
        <div className="flex flex-col gap-6">
          <div>
            <h2 className="font-bold text-stone-800 text-lg mb-4">КнижныйДом</h2>
            <p className="text-stone-500 text-sm leading-relaxed">
              Мы работаем с 2010 года и помогли тысячам читателей найти свои любимые книги.
              Наш ассортимент — более 50 000 наименований от ведущих российских и зарубежных издательств.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {[
              { icon: 'MapPin', title: 'Адрес', value: 'г. Москва, ул. Тверская, д. 12, офис 304' },
              { icon: 'Phone', title: 'Телефон', value: '+7 (800) 555-35-35' },
              { icon: 'Mail', title: 'Email', value: 'info@knizhniy-dom.ru' },
              { icon: 'Clock', title: 'Часы работы', value: 'Пн–Пт: 9:00–20:00, Сб: 10:00–18:00' },
            ].map(item => (
              <div key={item.icon} className="flex gap-3 items-start">
                <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon name={item.icon} size={18} className="text-amber-600" />
                </div>
                <div>
                  <p className="text-xs text-stone-400 font-medium">{item.title}</p>
                  <p className="text-sm text-stone-700 font-semibold">{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
            <p className="text-sm font-bold text-amber-800 mb-1">Быстрый ответ</p>
            <p className="text-xs text-stone-500">Обычно отвечаем в течение 2 часов в рабочее время. По срочным вопросам звоните по телефону.</p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl border border-stone-100 shadow-sm p-6">
          {sent ? (
            <div className="text-center py-10">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="CheckCircle" size={32} className="text-emerald-500" />
              </div>
              <h3 className="font-bold text-stone-800 text-lg mb-2">Сообщение отправлено!</h3>
              <p className="text-stone-500 text-sm">Мы ответим вам в ближайшее время</p>
              <button
                onClick={() => { setSent(false); setForm({ name: '', email: '', message: '' }); }}
                className="mt-6 text-amber-700 text-sm hover:underline"
              >
                Отправить ещё одно
              </button>
            </div>
          ) : (
            <>
              <h2 className="font-bold text-stone-800 text-lg mb-5">Напишите нам</h2>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Имя</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-stone-200 rounded-lg text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-stone-200 rounded-lg text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Сообщение</label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                    placeholder="Ваш вопрос или пожелание..."
                    className="w-full px-3 py-2.5 border border-stone-200 rounded-lg text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-amber-600 text-white font-bold py-3 rounded-xl hover:bg-amber-700 transition-colors"
                >
                  Отправить сообщение
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
