import { useState, useEffect, useRef } from 'react';
import Icon from '@/components/ui/icon';

type Screen = 'about' | 'projects' | 'contacts';

interface Project {
  id: number;
  title: string;
  tag: string;
  image: string;
  description: string;
  year: string;
  tools: string[];
}

const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'SaaS-платформа',
    tag: 'React / Node.js',
    image: 'https://cdn.poehali.dev/projects/7d17a91e-d483-43f0-9128-592c03e0bf21/files/6af57610-b1e4-4a52-823e-f04d8225fe10.jpg',
    description: 'Разработка SaaS-продукта для управления командами. Аутентификация, дашборды, real-time уведомления, REST API и деплой на облачную инфраструктуру.',
    year: '2024',
    tools: ['React', 'Node.js', 'PostgreSQL'],
  },
  {
    id: 2,
    title: 'Интернет-магазин',
    tag: 'E-commerce',
    image: 'https://cdn.poehali.dev/projects/7d17a91e-d483-43f0-9128-592c03e0bf21/files/a944d83a-3dc2-4db9-8c2f-73c8b1866bd4.jpg',
    description: 'Полный цикл разработки e-commerce площадки: каталог, корзина, оплата, личный кабинет покупателя и административная панель.',
    year: '2024',
    tools: ['Next.js', 'Stripe', 'Prisma'],
  },
  {
    id: 3,
    title: 'Корпоративный портал',
    tag: 'Fullstack',
    image: 'https://cdn.poehali.dev/projects/7d17a91e-d483-43f0-9128-592c03e0bf21/files/14f41c1b-3d6f-48e0-8ef5-85751c81a1ff.jpg',
    description: 'Внутренний портал компании с системой задач, документооборотом и SSO-авторизацией. Интеграция с 1С и корпоративными API.',
    year: '2023',
    tools: ['React', 'Python', 'Docker'],
  },
  {
    id: 4,
    title: 'Мобильное приложение',
    tag: 'React Native',
    image: 'https://cdn.poehali.dev/projects/7d17a91e-d483-43f0-9128-592c03e0bf21/files/6af57610-b1e4-4a52-823e-f04d8225fe10.jpg',
    description: 'Кроссплатформенное приложение для доставки еды. Карты, трекинг заказа, push-уведомления, онлайн-оплата.',
    year: '2023',
    tools: ['React Native', 'Firebase', 'Maps API'],
  },
  {
    id: 5,
    title: 'Лендинг с анимациями',
    tag: 'Frontend',
    image: 'https://cdn.poehali.dev/projects/7d17a91e-d483-43f0-9128-592c03e0bf21/files/a944d83a-3dc2-4db9-8c2f-73c8b1866bd4.jpg',
    description: 'Высококонверсионный лендинг с плавными анимациями, адаптивной вёрсткой и оптимизацией Core Web Vitals до 98 баллов.',
    year: '2023',
    tools: ['React', 'GSAP', 'Vite'],
  },
  {
    id: 6,
    title: 'CRM-система',
    tag: 'Backend',
    image: 'https://cdn.poehali.dev/projects/7d17a91e-d483-43f0-9128-592c03e0bf21/files/14f41c1b-3d6f-48e0-8ef5-85751c81a1ff.jpg',
    description: 'CRM для отдела продаж: воронка, аналитика, интеграция с телефонией и email-рассылками. Скорость загрузки снижена на 60%.',
    year: '2022',
    tools: ['FastAPI', 'React', 'Redis'],
  },
];

const SKILLS = [
  { icon: 'Code2', label: 'Python / C++' },
  { icon: 'Network', label: 'Сети / TCP-IP' },
  { icon: 'Monitor', label: 'Windows / Linux' },
  { icon: 'Database', label: 'SQL / MySQL' },
  { icon: 'Shield', label: 'Кибербезопасность' },
  { icon: 'HardDrive', label: 'Железо / ПК' },
];

const Index = () => {
  const [screen, setScreen] = useState<Screen>('about');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [ringPos, setRingPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formSent, setFormSent] = useState(false);
  const ringRef = useRef({ x: -100, y: -100 });
  const animFrameRef = useRef<number>();

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
      const target = e.target as HTMLElement;
      setIsHovering(
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('[data-hover]') !== null
      );
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useEffect(() => {
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const animate = () => {
      ringRef.current.x = lerp(ringRef.current.x, cursorPos.x, 0.12);
      ringRef.current.y = lerp(ringRef.current.y, cursorPos.y, 0.12);
      setRingPos({ x: ringRef.current.x, y: ringRef.current.y });
      animFrameRef.current = requestAnimationFrame(animate);
    };
    animFrameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrameRef.current!);
  }, [cursorPos]);

  const navigate = (s: Screen) => {
    setScreen(s);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
    setTimeout(() => setFormSent(false), 4000);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-[#f0f7f4] text-[#0f2820] font-heading grid-bg overflow-x-hidden">
      {/* Cursor dot */}
      <div
        className="custom-cursor"
        style={{
          left: cursorPos.x,
          top: cursorPos.y,
          width: isHovering ? '20px' : '12px',
          height: isHovering ? '20px' : '12px',
          opacity: isHovering ? 0.6 : 1,
        }}
      />
      <div
        className="custom-cursor-ring"
        style={{ left: ringPos.x, top: ringPos.y }}
      />

      {/* Scanline */}
      <div className="scanline" />
      {/* Noise */}
      <div className="noise-overlay" />

      {/* Ambient blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-emerald-300/20 blur-[130px] pulse-glow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-cyan-300/20 blur-[110px] pulse-glow" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-[40%] right-[20%] w-[300px] h-[300px] rounded-full bg-blue-300/15 blur-[90px] pulse-glow" style={{ animationDelay: '3s' }} />
      </div>

      {/* ═══════════════ ABOUT SCREEN ═══════════════ */}
      {screen === 'about' && (
        <div className="screen-enter min-h-screen">
          <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 border-b border-emerald-200/60 bg-[#f0f7f4]/85 backdrop-blur-sm">
            <div className="counter-deco">ПОРТФОЛИО / 2025</div>
            <div className="flex gap-6">
              <button onClick={() => navigate('projects')} className="counter-deco hover:text-emerald-600 transition-colors cursor-none" data-hover>
                ПРОЕКТЫ
              </button>
              <button onClick={() => navigate('contacts')} className="counter-deco hover:text-cyan-600 transition-colors cursor-none" data-hover>
                КОНТАКТЫ
              </button>
            </div>
          </div>

          <div className="pt-24 pb-20 px-8 md:px-16 lg:px-24 max-w-7xl mx-auto">
            <div className="flex flex-col items-center text-center min-h-[85vh] justify-center stagger-children">

              {/* Avatar — центр страницы */}
              <div className="relative float-anim flex items-center justify-center mb-10">
                <div className="absolute w-[220px] h-[220px] rounded-full border border-emerald-300/40 animate-ping" style={{ animationDuration: '3s' }} />
                <div className="absolute w-[260px] h-[260px] rounded-full border border-cyan-300/25" />
                <div className="absolute w-[300px] h-[300px] rounded-full border border-blue-300/15" />
                <div className="w-40 h-40 rounded-full overflow-hidden neon-glow border-4 border-white shadow-xl shadow-emerald-200/60">
                  <img
                    src="https://cdn.poehali.dev/projects/7d17a91e-d483-43f0-9128-592c03e0bf21/files/65f966af-83bc-4a3f-bce6-6db0198eea64.jpg"
                    alt="Аватар"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Text */}
              <div className="counter-deco mb-4">// 001 — О СЕБЕ</div>

              <h1
                className="font-display text-[72px] md:text-[96px] leading-none font-light mb-2 glitch-text neon-text"
                data-text="Алексей"
              >
                Алексей
              </h1>
              <h2 className="font-display text-[72px] md:text-[96px] leading-none font-light mb-8 italic text-[#0f2820]/50">
                Громов
              </h2>

              <div className="flex items-center justify-center gap-3 mb-8">
                <div className="w-8 h-px bg-emerald-500" />
                <span className="font-heading text-emerald-600 tracking-[0.25em] text-sm font-light">
                  ВЕБ-РАЗРАБОТЧИК FULLSTACK
                </span>
                <div className="w-8 h-px bg-emerald-500" />
              </div>

              <p className="text-[#0f2820]/55 leading-relaxed mb-10 font-light max-w-lg font-display text-xl italic">
                Пишу чистый код и строю продукты, которые работают.
                От идеи до деплоя — React, Python, базы данных
                и всё, что нужно для запуска в продакшн.
              </p>

              <div className="flex gap-4 flex-wrap justify-center">
                <button
                  onClick={() => navigate('projects')}
                  className="btn-primary px-8 py-3 font-heading text-sm tracking-[0.2em] cursor-none"
                  data-hover
                >
                  ПРОЕКТЫ
                </button>
                <button
                  onClick={() => navigate('contacts')}
                  className="btn-secondary px-8 py-3 font-heading text-sm tracking-[0.2em] cursor-none"
                  data-hover
                >
                  КОНТАКТЫ
                </button>
              </div>
            </div>

            {/* Skills */}
            <div className="mt-20 pt-16 border-t border-emerald-200/50">
              <div className="counter-deco mb-8">// 002 — НАВЫКИ</div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 stagger-children">
                {SKILLS.map((skill) => (
                  <div key={skill.label} className="skill-badge p-4 text-center cursor-none bg-white" data-hover>
                    <Icon name={skill.icon} fallback="Star" size={22} className="text-emerald-500 mx-auto mb-2" />
                    <div className="font-heading text-xs tracking-widest text-[#0f2820]/65">{skill.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-16 flex justify-center">
              <button onClick={() => navigate('projects')} className="flex flex-col items-center gap-2 text-[#0f2820]/25 hover:text-emerald-600 transition-colors cursor-none group" data-hover>
                <span className="counter-deco group-hover:text-emerald-600 transition-colors">СМОТРЕТЬ ПРОЕКТЫ</span>
                <Icon name="ChevronDown" size={16} className="animate-bounce" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════ PROJECTS SCREEN ═══════════════ */}
      {screen === 'projects' && (
        <div className="screen-enter min-h-screen">
          <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 border-b border-emerald-200/60 bg-[#f0f7f4]/85 backdrop-blur-sm">
            <button onClick={() => navigate('about')} className="counter-deco hover:text-emerald-600 transition-colors flex items-center gap-2 cursor-none" data-hover>
              <Icon name="ArrowLeft" size={12} />
              НАЗАД
            </button>
            <div className="counter-deco neon-text">МОИ ПРОЕКТЫ</div>
            <button onClick={() => navigate('contacts')} className="counter-deco hover:text-cyan-600 transition-colors cursor-none" data-hover>
              КОНТАКТЫ →
            </button>
          </div>

          <div className="pt-28 pb-20 px-8 md:px-16 lg:px-24 max-w-7xl mx-auto">
            <div className="mb-16 stagger-children">
              <div className="counter-deco mb-4">// 003 — РАБОТЫ</div>
              <h2 className="font-display text-6xl md:text-8xl font-light leading-none text-[#0f2820]">
                Мои <span className="italic neon-text">проекты</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
              {PROJECTS.map((project) => (
                <div
                  key={project.id}
                  className="project-card overflow-hidden cursor-none group rounded-sm"
                  data-hover
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="relative overflow-hidden h-52">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-transparent" />
                    <div className="absolute top-4 right-4 bg-emerald-500/15 border border-emerald-500/40 px-2 py-1">
                      <span className="counter-deco text-emerald-700">{project.tag}</span>
                    </div>
                    <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex items-center gap-2 text-emerald-700">
                        <Icon name="Eye" size={14} />
                        <span className="counter-deco text-emerald-700">ОТКРЫТЬ</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <div className="counter-deco text-[#0f2820]/30">{project.year}</div>
                      <Icon name="ArrowUpRight" size={16} className="text-[#0f2820]/20 group-hover:text-emerald-500 transition-colors" />
                    </div>
                    <h3 className="font-heading text-[#0f2820] text-lg tracking-wide group-hover:text-emerald-700 transition-colors">{project.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════ CONTACTS SCREEN ═══════════════ */}
      {screen === 'contacts' && (
        <div className="screen-enter min-h-screen">
          <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 border-b border-emerald-200/60 bg-[#f0f7f4]/85 backdrop-blur-sm">
            <button onClick={() => navigate('about')} className="counter-deco hover:text-emerald-600 transition-colors flex items-center gap-2 cursor-none" data-hover>
              <Icon name="ArrowLeft" size={12} />
              НА ГЛАВНУЮ
            </button>
            <div className="counter-deco neon-text-cyan">КОНТАКТЫ</div>
            <div className="counter-deco text-[#0f2820]/20">2024</div>
          </div>

          <div className="pt-28 pb-20 px-8 md:px-16 lg:px-24 max-w-7xl mx-auto">
            <div className="mb-16 stagger-children">
              <div className="counter-deco mb-4">// 004 — СВЯЗЬ</div>
              <h2 className="font-display text-6xl md:text-8xl font-light leading-none text-[#0f2820]">
                Свяжитесь<br />
                <span className="italic neon-text-cyan">со мной</span>
              </h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-16">
              {/* Left */}
              <div className="stagger-children space-y-8">
                <a href="mailto:alex@gromov.dev" className="flex items-center gap-4 group cursor-none" data-hover>
                  <div className="w-12 h-12 border border-emerald-300 bg-white flex items-center justify-center group-hover:border-emerald-500 group-hover:bg-emerald-50 transition-all shadow-sm">
                    <Icon name="Mail" size={18} className="text-emerald-500" />
                  </div>
                  <div>
                    <div className="counter-deco text-[#0f2820]/30 mb-1">EMAIL</div>
                    <div className="font-heading text-[#0f2820] group-hover:text-emerald-700 transition-colors">alex@gromov.dev</div>
                  </div>
                </a>

                <a href="tel:+79001234567" className="flex items-center gap-4 group cursor-none" data-hover>
                  <div className="w-12 h-12 border border-cyan-300 bg-white flex items-center justify-center group-hover:border-cyan-500 group-hover:bg-cyan-50 transition-all shadow-sm">
                    <Icon name="Phone" size={18} className="text-cyan-500" />
                  </div>
                  <div>
                    <div className="counter-deco text-[#0f2820]/30 mb-1">ТЕЛЕФОН</div>
                    <div className="font-heading text-[#0f2820] group-hover:text-cyan-700 transition-colors">+7 900 123-45-67</div>
                  </div>
                </a>

                <div>
                  <div className="counter-deco mb-5 text-[#0f2820]/30">// СОЦСЕТИ И ПРОФИЛИ</div>
                  <div className="flex gap-3">
                    {[
                      { icon: 'MessageCircle', label: 'TG' },
                      { icon: 'Github', label: 'GH' },
                      { icon: 'Linkedin', label: 'IN' },
                      { icon: 'Globe', label: 'WEB' },
                    ].map((s) => (
                      <button
                        key={s.label}
                        className="w-12 h-12 border border-emerald-200 bg-white flex items-center justify-center hover:border-emerald-400 hover:bg-emerald-50 transition-all group cursor-none shadow-sm"
                        data-hover
                      >
                        <Icon name={s.icon} fallback="Link" size={16} className="text-[#0f2820]/35 group-hover:text-emerald-600 transition-colors" />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-6 border border-emerald-200 bg-white relative overflow-hidden shadow-sm">
                  <div className="diagonal-line top-1/2" />
                  <div className="counter-deco text-[#0f2820]/25 mb-2">СТАТУС</div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="font-heading text-[#0f2820]/65 text-sm">Открыт к новым проектам</span>
                  </div>
                </div>
              </div>

              {/* Right — form */}
              <div>
                <div className="counter-deco mb-6">// ФОРМА СВЯЗИ</div>
                {formSent ? (
                  <div className="flex flex-col items-center justify-center h-64 border border-emerald-300 bg-emerald-50 screen-enter">
                    <Icon name="CheckCircle" size={32} className="text-emerald-500 mb-4" />
                    <div className="font-heading text-emerald-700 tracking-widest">СООБЩЕНИЕ ОТПРАВЛЕНО</div>
                    <div className="counter-deco text-[#0f2820]/30 mt-2">Отвечу в течение 24 часов</div>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-5 stagger-children">
                    <div>
                      <label className="counter-deco text-[#0f2820]/35 block mb-2">ИМЯ</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-white border border-emerald-200 px-4 py-3 font-heading text-[#0f2820] text-sm focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-[#0f2820]/25 cursor-none shadow-sm"
                        placeholder="Ваше имя"
                      />
                    </div>
                    <div>
                      <label className="counter-deco text-[#0f2820]/35 block mb-2">EMAIL</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-white border border-emerald-200 px-4 py-3 font-heading text-[#0f2820] text-sm focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-[#0f2820]/25 cursor-none shadow-sm"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label className="counter-deco text-[#0f2820]/35 block mb-2">СООБЩЕНИЕ</label>
                      <textarea
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full bg-white border border-emerald-200 px-4 py-3 font-heading text-[#0f2820] text-sm focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-[#0f2820]/25 resize-none cursor-none shadow-sm"
                        placeholder="Расскажите о вашем проекте..."
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn-primary w-full py-4 font-heading text-sm tracking-[0.3em] cursor-none"
                      data-hover
                    >
                      ОТПРАВИТЬ СООБЩЕНИЕ
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════ PROJECT MODAL ═══════════════ */}
      {selectedProject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          <div className="absolute inset-0 bg-[#0f2820]/40 backdrop-blur-md" onClick={() => setSelectedProject(null)} />

          <div className="relative modal-enter bg-white border border-emerald-200 w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl shadow-emerald-100">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center border border-emerald-200 hover:border-red-300 hover:bg-red-50 transition-all cursor-none"
              data-hover
            >
              <Icon name="X" size={16} className="text-[#0f2820]/40" />
            </button>

            <div className="relative h-64 md:h-80 overflow-hidden">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
              <div className="absolute top-4 left-4 bg-emerald-500/15 border border-emerald-500/40 px-3 py-1">
                <span className="counter-deco text-emerald-700">{selectedProject.tag}</span>
              </div>
              <div className="absolute bottom-4 right-4">
                <span className="counter-deco text-[#0f2820]/40">{selectedProject.year}</span>
              </div>
            </div>

            <div className="p-8">
              <div className="counter-deco text-emerald-600 mb-2">// ПРОЕКТ #{String(selectedProject.id).padStart(2, '0')}</div>
              <h3 className="font-display text-4xl font-light mb-6 text-[#0f2820]">{selectedProject.title}</h3>
              <p className="font-display text-[#0f2820]/60 text-lg italic leading-relaxed mb-8">{selectedProject.description}</p>

              <div>
                <div className="counter-deco text-[#0f2820]/30 mb-3">ИНСТРУМЕНТЫ</div>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tools.map((tool) => (
                    <span key={tool} className="skill-badge px-3 py-1 font-heading text-xs text-emerald-700 tracking-wider">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-emerald-100 flex gap-4">
                <button
                  className="btn-primary px-6 py-3 font-heading text-xs tracking-[0.2em] cursor-none flex-1"
                  data-hover
                  onClick={() => { setSelectedProject(null); navigate('contacts'); }}
                >
                  ОБСУДИТЬ ПРОЕКТ
                </button>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="btn-secondary px-6 py-3 font-heading text-xs tracking-[0.2em] cursor-none"
                  data-hover
                >
                  ЗАКРЫТЬ
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;