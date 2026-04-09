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
    title: 'Мобильное приложение',
    tag: 'UX/UI',
    image: 'https://cdn.poehali.dev/projects/7d17a91e-d483-43f0-9128-592c03e0bf21/files/6af57610-b1e4-4a52-823e-f04d8225fe10.jpg',
    description: 'Разработка полного пользовательского опыта для финтех-приложения. Исследование, прототипирование, дизайн системы и финальные макеты для iOS и Android.',
    year: '2024',
    tools: ['Figma', 'Principle', 'After Effects'],
  },
  {
    id: 2,
    title: 'Брендинг и айдентика',
    tag: 'Брендинг',
    image: 'https://cdn.poehali.dev/projects/7d17a91e-d483-43f0-9128-592c03e0bf21/files/a944d83a-3dc2-4db9-8c2f-73c8b1866bd4.jpg',
    description: 'Создание визуальной идентичности для технологического стартапа. Логотип, палитра, типографика и brand book с полной дизайн-системой.',
    year: '2024',
    tools: ['Illustrator', 'Figma', 'InDesign'],
  },
  {
    id: 3,
    title: 'Веб-платформа',
    tag: 'Web Design',
    image: 'https://cdn.poehali.dev/projects/7d17a91e-d483-43f0-9128-592c03e0bf21/files/14f41c1b-3d6f-48e0-8ef5-85751c81a1ff.jpg',
    description: 'Редизайн корпоративной платформы с нуля. Аудит текущего продукта, UX-исследование, создание новой архитектуры и финальный дизайн.',
    year: '2023',
    tools: ['Figma', 'Maze', 'Webflow'],
  },
  {
    id: 4,
    title: 'Дизайн-система',
    tag: 'Design Systems',
    image: 'https://cdn.poehali.dev/projects/7d17a91e-d483-43f0-9128-592c03e0bf21/files/6af57610-b1e4-4a52-823e-f04d8225fe10.jpg',
    description: 'Построение масштабируемой дизайн-системы для команды из 30+ дизайнеров. Компоненты, токены, документация и процессы.',
    year: '2023',
    tools: ['Figma', 'Storybook', 'Zeroheight'],
  },
  {
    id: 5,
    title: 'Motion-проект',
    tag: 'Motion',
    image: 'https://cdn.poehali.dev/projects/7d17a91e-d483-43f0-9128-592c03e0bf21/files/a944d83a-3dc2-4db9-8c2f-73c8b1866bd4.jpg',
    description: 'Анимированная презентация продукта с интерактивными прототипами. Motion-дизайн, микроанимации и пользовательские сценарии.',
    year: '2023',
    tools: ['After Effects', 'Figma', 'Lottie'],
  },
  {
    id: 6,
    title: 'E-commerce редизайн',
    tag: 'UX Research',
    image: 'https://cdn.poehali.dev/projects/7d17a91e-d483-43f0-9128-592c03e0bf21/files/14f41c1b-3d6f-48e0-8ef5-85751c81a1ff.jpg',
    description: 'Комплексный редизайн интернет-магазина на основе данных. Рост конверсии на 40% после внедрения новых решений.',
    year: '2022',
    tools: ['Figma', 'Hotjar', 'Google Analytics'],
  },
];

const SKILLS = [
  { icon: 'Layers', label: 'UX/UI Дизайн' },
  { icon: 'Figma', label: 'Figma / Sketch' },
  { icon: 'Sparkles', label: 'Motion Design' },
  { icon: 'BarChart2', label: 'UX Research' },
  { icon: 'Palette', label: 'Брендинг' },
  { icon: 'Code2', label: 'Прототипинг' },
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
    <div className="min-h-screen bg-[#0a0a0a] text-white font-heading grid-bg overflow-x-hidden">
      {/* Cursor dot */}
      <div
        className="custom-cursor"
        style={{
          left: cursorPos.x,
          top: cursorPos.y,
          width: isHovering ? '20px' : '12px',
          height: isHovering ? '20px' : '12px',
          opacity: isHovering ? 0.5 : 1,
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
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-purple-600/5 blur-[120px] pulse-glow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-cyan-400/5 blur-[100px] pulse-glow" style={{ animationDelay: '1.5s' }} />
      </div>

      {/* ═══════════════ ABOUT SCREEN ═══════════════ */}
      {screen === 'about' && (
        <div className="screen-enter min-h-screen">
          <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-sm">
            <div className="counter-deco">ПОРТФОЛИО / 2024</div>
            <div className="flex gap-6">
              <button onClick={() => navigate('projects')} className="counter-deco hover:text-purple-400 transition-colors cursor-none" data-hover>
                ПРОЕКТЫ
              </button>
              <button onClick={() => navigate('contacts')} className="counter-deco hover:text-cyan-400 transition-colors cursor-none" data-hover>
                КОНТАКТЫ
              </button>
            </div>
          </div>

          <div className="pt-24 pb-20 px-8 md:px-16 lg:px-24 max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[85vh]">
              {/* Left */}
              <div className="stagger-children">
                <div className="counter-deco mb-4">// 001 — О СЕБЕ</div>

                <h1
                  className="font-display text-[72px] md:text-[96px] leading-none font-light mb-2 glitch-text neon-text"
                  data-text="Анна"
                >
                  Анна
                </h1>
                <h2 className="font-display text-[72px] md:text-[96px] leading-none font-light mb-8 italic text-white/60">
                  Козлова
                </h2>

                <div className="flex items-center gap-3 mb-8">
                  <div className="w-8 h-px bg-purple-500" />
                  <span className="font-heading text-purple-400 tracking-[0.25em] text-sm font-light">
                    ДИЗАЙНЕР ИНТЕРФЕЙСОВ
                  </span>
                </div>

                <p className="text-white/55 leading-relaxed mb-10 font-light max-w-md font-display text-xl italic">
                  Создаю цифровые продукты, которые чувствуются правильно.
                  Моя работа — на пересечении эстетики и функциональности,
                  где каждый пиксель несёт смысл.
                </p>

                <div className="flex gap-4 flex-wrap">
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

              {/* Right — photo */}
              <div className="relative flex justify-center lg:justify-end">
                <div className="relative float-anim">
                  <div className="absolute -inset-4 border border-purple-500/20 photo-mask" />
                  <div className="absolute -inset-8 border border-cyan-400/10 photo-mask" />

                  <img
                    src="https://cdn.poehali.dev/projects/7d17a91e-d483-43f0-9128-592c03e0bf21/files/65f966af-83bc-4a3f-bce6-6db0198eea64.jpg"
                    alt="Портрет"
                    className="w-72 h-96 md:w-80 md:h-[440px] object-cover photo-mask neon-glow"
                  />

                  <div className="absolute -bottom-6 -left-8 bg-[#111] border border-purple-500/30 px-4 py-3 neon-glow">
                    <div className="counter-deco text-purple-400">ОПЫТ</div>
                    <div className="font-display text-3xl font-bold text-white">5+</div>
                    <div className="counter-deco">ЛЕТ</div>
                  </div>

                  <div className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-cyan-400" />
                  <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b-2 border-l-2 border-purple-500" />
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="mt-20 pt-16 border-t border-white/5">
              <div className="counter-deco mb-8">// 002 — НАВЫКИ</div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 stagger-children">
                {SKILLS.map((skill) => (
                  <div key={skill.label} className="skill-badge p-4 text-center cursor-none" data-hover>
                    <Icon name={skill.icon} fallback="Star" size={22} className="text-purple-400 mx-auto mb-2" />
                    <div className="font-heading text-xs tracking-widest text-white/70">{skill.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-16 flex justify-center">
              <button onClick={() => navigate('projects')} className="flex flex-col items-center gap-2 text-white/20 hover:text-purple-400 transition-colors cursor-none group" data-hover>
                <span className="counter-deco group-hover:text-purple-400 transition-colors">СМОТРЕТЬ ПРОЕКТЫ</span>
                <Icon name="ChevronDown" size={16} className="animate-bounce" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════ PROJECTS SCREEN ═══════════════ */}
      {screen === 'projects' && (
        <div className="screen-enter min-h-screen">
          <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-sm">
            <button onClick={() => navigate('about')} className="counter-deco hover:text-purple-400 transition-colors flex items-center gap-2 cursor-none" data-hover>
              <Icon name="ArrowLeft" size={12} />
              НАЗАД
            </button>
            <div className="counter-deco neon-text">МОИ ПРОЕКТЫ</div>
            <button onClick={() => navigate('contacts')} className="counter-deco hover:text-cyan-400 transition-colors cursor-none" data-hover>
              КОНТАКТЫ →
            </button>
          </div>

          <div className="pt-28 pb-20 px-8 md:px-16 lg:px-24 max-w-7xl mx-auto">
            <div className="mb-16 stagger-children">
              <div className="counter-deco mb-4">// 003 — РАБОТЫ</div>
              <h2 className="font-display text-6xl md:text-8xl font-light leading-none">
                Мои <span className="italic text-purple-400 neon-text">проекты</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
              {PROJECTS.map((project) => (
                <div
                  key={project.id}
                  className="project-card bg-[#111] overflow-hidden cursor-none group"
                  data-hover
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="relative overflow-hidden h-52">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent" />
                    <div className="absolute top-4 right-4 bg-purple-500/20 border border-purple-500/40 px-2 py-1">
                      <span className="counter-deco text-purple-300">{project.tag}</span>
                    </div>
                    <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex items-center gap-2 text-white/70">
                        <Icon name="Eye" size={14} />
                        <span className="counter-deco">ОТКРЫТЬ</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <div className="counter-deco text-white/30">{project.year}</div>
                      <Icon name="ArrowUpRight" size={16} className="text-white/20 group-hover:text-purple-400 transition-colors" />
                    </div>
                    <h3 className="font-heading text-white text-lg tracking-wide group-hover:text-purple-300 transition-colors">{project.title}</h3>
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
          <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-sm">
            <button onClick={() => navigate('about')} className="counter-deco hover:text-purple-400 transition-colors flex items-center gap-2 cursor-none" data-hover>
              <Icon name="ArrowLeft" size={12} />
              НА ГЛАВНУЮ
            </button>
            <div className="counter-deco neon-text-cyan">КОНТАКТЫ</div>
            <div className="counter-deco text-white/20">2024</div>
          </div>

          <div className="pt-28 pb-20 px-8 md:px-16 lg:px-24 max-w-7xl mx-auto">
            <div className="mb-16 stagger-children">
              <div className="counter-deco mb-4">// 004 — СВЯЗЬ</div>
              <h2 className="font-display text-6xl md:text-8xl font-light leading-none">
                Свяжитесь<br />
                <span className="italic text-cyan-400 neon-text-cyan">со мной</span>
              </h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-16">
              {/* Left */}
              <div className="stagger-children space-y-8">
                <a href="mailto:anna@design.ru" className="flex items-center gap-4 group cursor-none" data-hover>
                  <div className="w-12 h-12 border border-purple-500/30 flex items-center justify-center group-hover:border-purple-500 group-hover:bg-purple-500/10 transition-all">
                    <Icon name="Mail" size={18} className="text-purple-400" />
                  </div>
                  <div>
                    <div className="counter-deco text-white/30 mb-1">EMAIL</div>
                    <div className="font-heading text-white group-hover:text-purple-300 transition-colors">anna@design.ru</div>
                  </div>
                </a>

                <a href="tel:+79001234567" className="flex items-center gap-4 group cursor-none" data-hover>
                  <div className="w-12 h-12 border border-cyan-400/30 flex items-center justify-center group-hover:border-cyan-400 group-hover:bg-cyan-400/10 transition-all">
                    <Icon name="Phone" size={18} className="text-cyan-400" />
                  </div>
                  <div>
                    <div className="counter-deco text-white/30 mb-1">ТЕЛЕФОН</div>
                    <div className="font-heading text-white group-hover:text-cyan-300 transition-colors">+7 900 123-45-67</div>
                  </div>
                </a>

                <div>
                  <div className="counter-deco mb-5 text-white/30">// СОЦИАЛЬНЫЕ СЕТИ</div>
                  <div className="flex gap-3">
                    {[
                      { icon: 'MessageCircle', label: 'TG' },
                      { icon: 'Linkedin', label: 'IN' },
                      { icon: 'Instagram', label: 'IG' },
                      { icon: 'Globe', label: 'WEB' },
                    ].map((s) => (
                      <button
                        key={s.label}
                        className="w-12 h-12 border border-white/10 flex items-center justify-center hover:border-purple-500/50 hover:bg-purple-500/10 transition-all group cursor-none"
                        data-hover
                      >
                        <Icon name={s.icon} fallback="Link" size={16} className="text-white/40 group-hover:text-purple-400 transition-colors" />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-6 border border-white/5 bg-[#111] relative overflow-hidden">
                  <div className="diagonal-line top-1/2" />
                  <div className="counter-deco text-white/20 mb-2">СТАТУС</div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="font-heading text-white/70 text-sm">Открыта к новым проектам</span>
                  </div>
                </div>
              </div>

              {/* Right — form */}
              <div>
                <div className="counter-deco mb-6">// ФОРМА СВЯЗИ</div>
                {formSent ? (
                  <div className="flex flex-col items-center justify-center h-64 border border-green-500/30 bg-green-500/5 screen-enter">
                    <Icon name="CheckCircle" size={32} className="text-green-400 mb-4" />
                    <div className="font-heading text-green-400 tracking-widest">СООБЩЕНИЕ ОТПРАВЛЕНО</div>
                    <div className="counter-deco text-white/30 mt-2">Отвечу в течение 24 часов</div>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-5 stagger-children">
                    <div>
                      <label className="counter-deco text-white/30 block mb-2">ИМЯ</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-[#111] border border-white/10 px-4 py-3 font-heading text-white text-sm focus:outline-none focus:border-purple-500 transition-colors placeholder:text-white/20 cursor-none"
                        placeholder="Ваше имя"
                      />
                    </div>
                    <div>
                      <label className="counter-deco text-white/30 block mb-2">EMAIL</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-[#111] border border-white/10 px-4 py-3 font-heading text-white text-sm focus:outline-none focus:border-purple-500 transition-colors placeholder:text-white/20 cursor-none"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label className="counter-deco text-white/30 block mb-2">СООБЩЕНИЕ</label>
                      <textarea
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full bg-[#111] border border-white/10 px-4 py-3 font-heading text-white text-sm focus:outline-none focus:border-purple-500 transition-colors placeholder:text-white/20 resize-none cursor-none"
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
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
        >
          <div className="absolute inset-0 bg-black/85 backdrop-blur-md" onClick={() => setSelectedProject(null)} />

          <div className="relative modal-enter bg-[#0f0f0f] border border-white/10 w-full max-w-3xl max-h-[90vh] overflow-y-auto neon-glow">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center border border-white/10 hover:border-red-500/50 hover:bg-red-500/10 transition-all cursor-none"
              data-hover
            >
              <Icon name="X" size={16} className="text-white/50" />
            </button>

            <div className="relative h-64 md:h-80 overflow-hidden">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-transparent to-transparent" />
              <div className="absolute top-4 left-4 bg-purple-500/20 border border-purple-500/40 px-3 py-1">
                <span className="counter-deco text-purple-300">{selectedProject.tag}</span>
              </div>
              <div className="absolute bottom-4 right-4">
                <span className="counter-deco text-white/40">{selectedProject.year}</span>
              </div>
            </div>

            <div className="p-8">
              <div className="counter-deco text-purple-400 mb-2">// ПРОЕКТ #{String(selectedProject.id).padStart(2, '0')}</div>
              <h3 className="font-display text-4xl font-light mb-6">{selectedProject.title}</h3>
              <p className="font-display text-white/60 text-lg italic leading-relaxed mb-8">{selectedProject.description}</p>

              <div>
                <div className="counter-deco text-white/30 mb-3">ИНСТРУМЕНТЫ</div>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tools.map((tool) => (
                    <span key={tool} className="skill-badge px-3 py-1 font-heading text-xs text-purple-300 tracking-wider">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/5 flex gap-4">
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