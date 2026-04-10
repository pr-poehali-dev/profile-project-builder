export interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  oldPrice?: number;
  genre: string;
  rating: number;
  reviewCount: number;
  image: string;
  description: string;
  pages: number;
  year: number;
  publisher: string;
  inStock: boolean;
  isNew?: boolean;
  isBestseller?: boolean;
}

export const BOOKS: Book[] = [
  {
    id: 1,
    title: 'Преступление и наказание',
    author: 'Фёдор Достоевский',
    price: 490,
    genre: 'Классика',
    rating: 4.9,
    reviewCount: 1284,
    image: 'https://cdn.poehali.dev/projects/7d17a91e-d483-43f0-9128-592c03e0bf21/files/3916d9f7-b310-44c4-b09c-dce4282ae9c5.jpg',
    description: 'Роман о молодом студенте Родионе Раскольникове, который убивает ростовщицу, считая себя вправе преступить нравственный закон ради высшей цели. Один из величайших психологических романов в мировой литературе.',
    pages: 608,
    year: 2022,
    publisher: 'АСТ',
    inStock: true,
    isBestseller: true,
  },
  {
    id: 2,
    title: 'Звёздный путь',
    author: 'Артём Калинин',
    price: 620,
    oldPrice: 790,
    genre: 'Фантастика',
    rating: 4.7,
    reviewCount: 342,
    image: 'https://cdn.poehali.dev/projects/7d17a91e-d483-43f0-9128-592c03e0bf21/files/a41c53a6-e52c-4501-9a26-409cb959e532.jpg',
    description: 'Грандиозная космическая опера о последнем выжившем экипаже станции «Аврора», которому предстоит пересечь галактику и найти новый дом для человечества. Захватывающее приключение на границе возможного.',
    pages: 512,
    year: 2024,
    publisher: 'Эксмо',
    inStock: true,
    isNew: true,
  },
  {
    id: 3,
    title: 'Сила привычки',
    author: 'Чарлз Дахигг',
    price: 560,
    oldPrice: 680,
    genre: 'Психология',
    rating: 4.6,
    reviewCount: 876,
    image: 'https://cdn.poehali.dev/projects/7d17a91e-d483-43f0-9128-592c03e0bf21/files/dd6e82aa-00fa-4cae-88ca-614990b82783.jpg',
    description: 'Почему мы делаем то, что делаем, и как это изменить. Автор раскрывает нейронные механизмы привычек и показывает, как крупные компании и спортсмены используют науку о привычках для достижения успеха.',
    pages: 384,
    year: 2023,
    publisher: 'Карьера Пресс',
    inStock: true,
    isBestseller: true,
  },
  {
    id: 4,
    title: 'Хроники Эльдора',
    author: 'Марина Светлова',
    price: 710,
    genre: 'Фэнтези',
    rating: 4.8,
    reviewCount: 521,
    image: 'https://cdn.poehali.dev/projects/7d17a91e-d483-43f0-9128-592c03e0bf21/files/eaa19291-c4fe-4740-9273-3edce9babc04.jpg',
    description: 'Молодая ведьма обнаруживает древний артефакт, способный разрушить равновесие между мирами. Чтобы предотвратить катастрофу, ей придётся объединиться с заклятым врагом и раскрыть тайну своего происхождения.',
    pages: 672,
    year: 2024,
    publisher: 'Азбука',
    inStock: true,
    isNew: true,
  },
  {
    id: 5,
    title: 'Лидер без титула',
    author: 'Робин Шарма',
    price: 480,
    genre: 'Бизнес',
    rating: 4.5,
    reviewCount: 654,
    image: 'https://cdn.poehali.dev/projects/7d17a91e-d483-43f0-9128-592c03e0bf21/files/480fab2b-9289-4820-a334-fc36cfcd2633.jpg',
    description: 'Революционная модель лидерства для нового времени. Автор показывает, что настоящее лидерство не зависит от должности — каждый человек способен изменить свою компанию и жизнь, начав с себя.',
    pages: 320,
    year: 2023,
    publisher: 'Манн, Иванов и Фербер',
    inStock: true,
    isBestseller: true,
  },
  {
    id: 6,
    title: 'Тень в тумане',
    author: 'Алексей Вронский',
    price: 540,
    oldPrice: 620,
    genre: 'Детектив',
    rating: 4.7,
    reviewCount: 398,
    image: 'https://cdn.poehali.dev/projects/7d17a91e-d483-43f0-9128-592c03e0bf21/files/b7224ec5-9863-40a5-91a2-0e3fe88a3ed3.jpg',
    description: 'Петербургский следователь Павел Мещеряков расследует серию загадочных исчезновений в портовом районе. Каждая улика ведёт в прошлое, а прошлое не хочет открывать своих тайн.',
    pages: 448,
    year: 2024,
    publisher: 'Детектив-Пресс',
    inStock: true,
    isNew: true,
  },
  {
    id: 7,
    title: 'Сказки старого леса',
    author: 'Наталья Берёзова',
    price: 380,
    genre: 'Детям',
    rating: 4.9,
    reviewCount: 1102,
    image: 'https://cdn.poehali.dev/projects/7d17a91e-d483-43f0-9128-592c03e0bf21/files/6bf45070-7dd1-4ca2-a324-44dcb68dba7a.jpg',
    description: 'Сборник добрых иллюстрированных сказок о животных волшебного леса. Каждая история учит доброте, смелости и дружбе. Для детей от 4 до 10 лет.',
    pages: 192,
    year: 2023,
    publisher: 'Самокат',
    inStock: true,
    isBestseller: true,
  },
  {
    id: 8,
    title: 'Мастер и Маргарита',
    author: 'Михаил Булгаков',
    price: 520,
    genre: 'Классика',
    rating: 4.95,
    reviewCount: 2341,
    image: 'https://cdn.poehali.dev/projects/7d17a91e-d483-43f0-9128-592c03e0bf21/files/46c84683-e0bf-4185-985a-e52b98ae655a.jpg',
    description: 'Культовый роман о визите дьявола в советскую Москву, о вечной любви Мастера и Маргариты, о трусости и предательстве, о свете и тьме. Одна из самых известных книг XX века.',
    pages: 480,
    year: 2021,
    publisher: 'АСТ',
    inStock: true,
    isBestseller: true,
  },
];

export const GENRES = ['Все', 'Классика', 'Фантастика', 'Фэнтези', 'Детектив', 'Психология', 'Бизнес', 'Детям'];
