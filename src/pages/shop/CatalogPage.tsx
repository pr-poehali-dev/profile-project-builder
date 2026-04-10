import { useState } from 'react';
import { BOOKS, GENRES } from '@/data/books';
import BookCard from '@/components/shop/BookCard';
import Icon from '@/components/ui/icon';

type Page = 'home' | 'catalog' | 'book' | 'contacts' | 'cart' | 'checkout' | 'success';

interface CatalogPageProps {
  onNavigate: (page: Page, bookId?: number) => void;
}

type SortOption = 'popular' | 'price_asc' | 'price_desc' | 'new';

export default function CatalogPage({ onNavigate }: CatalogPageProps) {
  const [selectedGenre, setSelectedGenre] = useState('Все');
  const [sort, setSort] = useState<SortOption>('popular');
  const [search, setSearch] = useState('');

  const filtered = BOOKS
    .filter(b => selectedGenre === 'Все' || b.genre === selectedGenre)
    .filter(b =>
      search === '' ||
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.author.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sort === 'price_asc') return a.price - b.price;
      if (sort === 'price_desc') return b.price - a.price;
      if (sort === 'new') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      return b.reviewCount - a.reviewCount;
    });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-stone-800 mb-2">Каталог книг</h1>
      <p className="text-stone-500 mb-6">{filtered.length} книг найдено</p>

      {/* Search + Sort */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            placeholder="Поиск по названию или автору..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border border-stone-200 rounded-lg text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
          />
        </div>
        <select
          value={sort}
          onChange={e => setSort(e.target.value as SortOption)}
          className="border border-stone-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-amber-400 text-stone-700"
        >
          <option value="popular">По популярности</option>
          <option value="new">Сначала новинки</option>
          <option value="price_asc">Сначала дешевле</option>
          <option value="price_desc">Сначала дороже</option>
        </select>
      </div>

      {/* Genres */}
      <div className="flex gap-2 flex-wrap mb-8">
        {GENRES.map(genre => (
          <button
            key={genre}
            onClick={() => setSelectedGenre(genre)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              selectedGenre === genre
                ? 'bg-amber-600 text-white'
                : 'bg-stone-100 text-stone-600 hover:bg-amber-50 hover:text-amber-700'
            }`}
          >
            {genre}
          </button>
        ))}
      </div>

      {/* Books grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-stone-400">
          <Icon name="BookX" size={48} className="mx-auto mb-3 opacity-40" />
          <p className="text-lg font-medium">Книги не найдены</p>
          <p className="text-sm mt-1">Попробуйте изменить фильтры или поисковый запрос</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {filtered.map(book => (
            <BookCard key={book.id} book={book} onOpen={(id) => onNavigate('book', id)} />
          ))}
        </div>
      )}
    </div>
  );
}
