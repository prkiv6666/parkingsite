import { useState } from 'react'

import mapPreview from './assets/map.jpeg'
import homePreview from './assets/maindash.jpeg'
import rewardsPreview from './assets/rewards.jpeg'
import activityPreview from './assets/activity.jpeg'
import profilePreview from './assets/profile.jpeg'

const featureShots = [
  {
    title: 'Карта на живо',
    description: 'Виж свободните места, нивото на увереност и близките препоръки на картата в реално време.',
    image: mapPreview,
  },
  {
    title: 'Система с награди',
    description: 'Шофьорите печелят точки, значки и доверие за точни сигнали и полезни потвърждения.',
    image: rewardsPreview,
  },
  {
    title: 'Хронология на активността',
    description: 'Следи сигналите, потвържденията и историята на статуса на местата от един ясен екран.',
    image: activityPreview,
  },
]

const showcaseShots = [
  {
    title: 'Начален екран',
    description: 'Началният екран събира бързо търсене, категории, статус на наградите и основното действие за паркиране в един чист интерфейс.',
    image: homePreview,
  },
  featureShots[0],
  featureShots[1],
  featureShots[2],
  {
    title: 'Преки пътища в профила',
    description: 'Профилът позволява да запазиш номера на колата си и да ускориш действията за синя и зелена зона при ежедневна употреба.',
    image: profilePreview,
  },
]

function ParkRadarLogo({ compact = false }) {
  return (
    <div className={`flex items-center gap-3 ${compact ? '' : 'justify-center'}`}>
      <div className="relative flex h-12 w-12 items-center justify-center">
        <div className="absolute bottom-[2px] h-4 w-4 rotate-45 bg-[#0f172a] opacity-95" />
        <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border-2 border-white/60 bg-[#0f172a] shadow-[0_0_30px_rgba(34,211,238,0.12)]">
          <div className="absolute inset-y-0 left-0 w-[54%] bg-[#22c1ff] opacity-90" />
          <div className="absolute inset-y-0 right-0 w-[54%] bg-[#8de93b] opacity-90" />
          <div className="absolute h-8 w-8 rounded-full border-[3px] border-white bg-[rgba(15,23,42,0.82)]" />
          <div className="absolute h-4.5 w-4.5 rounded-full border-[3px] border-white bg-[rgba(15,23,42,0.9)]" />
          <div className="absolute z-10 h-2 w-2 rounded-full border border-[#0f172a] bg-[#d9ff57]" />
          <div className="absolute left-[52%] top-[32%] z-10 h-[3px] w-5 -rotate-[35deg] rounded-full bg-white" />
        </div>
      </div>

      <div className="flex items-baseline text-[1.05rem] font-black tracking-[-0.04em] sm:text-[1.15rem]">
        <span className="text-sky-400">Park</span>
        <span className="text-lime-300">Radar</span>
      </div>
    </div>
  )
}

function formatSlideNumber(value) {
  return String(value).padStart(2, '0')
}

function getWrappedOffset(index, activeIndex, total) {
  let offset = index - activeIndex

  if (offset > total / 2) {
    offset -= total
  }

  if (offset < -total / 2) {
    offset += total
  }

  return offset
}

function getCarouselCardStyle(offset) {
  const distance = Math.abs(offset)

  if (distance > 1) {
    return {
      opacity: 0,
      transform: 'translate3d(0, 3rem, -140px) scale(0.82)',
      zIndex: 0,
      pointerEvents: 'none',
    }
  }

  if (offset === 0) {
    return {
      opacity: 1,
      transform: 'translate3d(0, 0, 0) scale(1)',
      zIndex: 30,
      pointerEvents: 'auto',
    }
  }

  const direction = offset > 0 ? 1 : -1

  return {
    opacity: 0.42,
    transform: `translate3d(${direction * 56}%, 2.5rem, -110px) scale(0.84)`,
    zIndex: 10,
    pointerEvents: 'none',
  }
}

function HeroMetricIcon({ kind }) {
  if (kind === 'map') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
        <path d="M3.75 6.75 9 4.5l6 2.25 5.25-2.25v12.75L15 19.5 9 17.25l-5.25 2.25V6.75Z" />
        <path d="M9 4.5v12.75" />
        <path d="M15 6.75V19.5" />
      </svg>
    )
  }

  if (kind === 'rewards') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
        <path d="M12 3.75 14.625 9h5.625l-4.5 3.75 1.5 6-4.5-2.625-4.5 2.625 1.5-6L3.75 9h5.625L12 3.75Z" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
      <path d="M12 20.25s6-5.193 6-10.125a6 6 0 1 0-12 0c0 4.932 6 10.125 6 10.125Z" />
      <circle cx="12" cy="10.125" r="2.25" />
    </svg>
  )
}

export default function App() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#050816] text-white selection:bg-cyan-300 selection:text-[#04111f]">
      <BackgroundDecor />
      <Navbar />
      <Hero />
      <TrustBar />
      <Features />
      <HowItWorks />
      <Showcase />
      <SocialProof />
      <FinalCTA />
      <Footer />
    </div>
  )
}

function BackgroundDecor() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute left-[-10%] top-[-8%] h-80 w-80 rounded-full bg-cyan-400/18 blur-3xl" />
      <div className="absolute right-[-6%] top-[10%] h-96 w-96 rounded-full bg-blue-500/16 blur-3xl" />
      <div className="absolute bottom-[-10%] left-[18%] h-[24rem] w-[24rem] rounded-full bg-indigo-500/14 blur-3xl" />
      <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.7)_1px,transparent_1px)] [background-size:72px_72px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.16),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.14),transparent_26%),linear-gradient(to_bottom,#050816,#07101f_35%,#050816)]" />
    </div>
  )
}

function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#050816]/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4 lg:px-8 xl:max-w-[88rem]">
        <a href="#top" className="flex items-center gap-2.5 sm:gap-3">
          <ParkRadarLogo compact />
          <div className="hidden sm:block">
            <p className="text-xs text-white/45">Намирай паркиране по-бързо</p>
          </div>
        </a>

        <nav className="hidden items-center gap-8 text-sm text-white/65 md:flex xl:gap-10 xl:text-[0.95rem]">
          <a href="#features" className="transition hover:text-white">Функции</a>
          <a href="#how" className="transition hover:text-white">Как работи</a>
          <a href="#showcase" className="transition hover:text-white">Преглед</a>
          <a href="#waitlist" className="transition hover:text-white">Списък за ранен достъп</a>
        </nav>

        <a
          href="#waitlist"
          className="rounded-full border border-cyan-300/30 bg-white/5 px-4 py-2 text-xs font-semibold text-cyan-300 transition hover:border-cyan-300/50 hover:bg-cyan-300/10 sm:px-5 sm:py-2.5 sm:text-sm"
        >
          Запиши се
        </a>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 pb-14 pt-12 sm:px-6 sm:pb-16 sm:pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-8 lg:pb-24 lg:pt-24 xl:max-w-[88rem] xl:grid-cols-[1fr_0.92fr] xl:gap-24 xl:pb-28 xl:pt-28">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-white/5 px-3 py-1.5 text-xs text-cyan-200 shadow-[0_0_25px_rgba(34,211,238,0.08)] sm:px-4 sm:py-2 sm:text-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Реален продуктов преглед
          </div>

          <h1 className="mt-5 max-w-3xl text-[2.7rem] font-black leading-[1.02] tracking-tight text-white sm:mt-6 sm:text-5xl lg:text-7xl">
            Спри да обикаляш в кръг.
            <span className="mt-2 block bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-500 bg-clip-text text-transparent">
              Намери място за под 1 минута.
            </span>
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-white/74 sm:mt-6 sm:text-lg sm:leading-8 lg:text-xl">
            ParkRadar помага на шофьорите да откриват свободни места по-бързо с карта на живо, актуализации от общността, награди и моментални насоки за паркиране.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a
              href="#waitlist"
              className="rounded-2xl bg-gradient-to-r from-cyan-300 to-blue-500 px-7 py-4 text-center font-bold text-white shadow-[0_18px_60px_rgba(56,189,248,0.32)] transition hover:-translate-y-0.5 xl:px-8"
            >
              Вземи ранен достъп
            </a>
            <a
              href="#showcase"
              className="rounded-2xl border border-white/12 bg-white/5 px-7 py-4 text-center font-semibold text-white transition hover:bg-white/10"
            >
              Виж приложението
            </a>
          </div>

          <div className="mt-10 grid max-w-[46rem] gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:max-w-[50rem] xl:gap-5">
            <MetricCard icon="map" value="Карта" label="Свободни места" />
            <MetricCard icon="rewards" value="Награди" label="Точки и доверие" />
            <MetricCard icon="activity" value="Активност" label="История на сигнали" />
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[320px] sm:max-w-[360px] xl:max-w-[440px]">
          <div className="absolute -inset-8 rounded-full bg-cyan-400/12 blur-3xl sm:-inset-12" />
          <div className="relative z-10">
            <PhoneFrame image={mapPreview} alt="Преглед на картата на живо в ParkRadar" />
          </div>
        </div>
      </div>
    </section>
  )
}

function MetricCard({ icon, value, label }) {
  return (
    <div className="relative overflow-hidden rounded-[1.85rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))] p-5 text-left shadow-[0_16px_50px_rgba(0,0,0,0.18)] backdrop-blur-xl sm:min-h-[11.5rem] sm:p-6">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent" />
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10 text-cyan-200 shadow-[0_0_24px_rgba(34,211,238,0.12)]">
        <HeroMetricIcon kind={icon} />
      </div>
      <div className="mt-5 text-[1.25rem] font-black leading-[1.08] text-white sm:text-[1.35rem] xl:text-[1.45rem]">
        {value}
      </div>
      <div className="mt-2 text-[0.95rem] leading-6 text-white/72 sm:text-[0.98rem]">
        {label}
      </div>
    </div>
  )
}

function PhoneFrame({ image, alt }) {
  return (
    <div className="mx-auto w-full max-w-[320px] rounded-[2.4rem] border border-white/10 bg-[#0a1020] p-2.5 shadow-[0_24px_80px_rgba(0,0,0,0.42)] sm:max-w-[360px] sm:rounded-[2.8rem] sm:p-3 sm:shadow-[0_30px_100px_rgba(0,0,0,0.45)]">
      <div className="relative overflow-hidden rounded-[2.3rem] border border-white/10 bg-black">
        <div className="absolute left-1/2 top-0 z-20 h-6 w-28 -translate-x-1/2 rounded-b-[1rem] bg-black sm:h-7 sm:w-36 sm:rounded-b-[1.2rem]" />
        <img src={image} alt={alt} className="block h-auto w-full object-cover" loading="lazy" />
      </div>
    </div>
  )
}

function TrustBar() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 xl:max-w-[88rem]">
      <div className="rounded-3xl border border-white/10 bg-white/[0.04] px-5 py-5 backdrop-blur-xl sm:px-6">
        <div className="flex flex-col gap-4 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p className="text-sm text-white/68">Създадено за шофьори, които искат по-бързи решения за паркиране, реална обратна връзка и по-чист начин за ориентиране в града.</p>
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-white/35 sm:justify-end">
            <span>Карта на живо</span>
            <span>Награди</span>
            <span>История</span>
            <span>От общността</span>
          </div>
        </div>
      </div>
    </section>
  )
}

function Features() {
  const items = [
    {
      title: 'Откриване на места на живо',
      text: 'Отвори картата и веднага виж свободни места, активни сигнали и ниво на увереност около теб.',
      icon: '🗺️',
    },
    {
      title: 'Система за награди',
      text: 'Потребителите печелят точки, значки и доверие, когато подават полезни сигнали и потвърждения.',
      icon: '🏆',
    },
    {
      title: 'Бързи действия за зони',
      text: 'Получаваш бърз достъп до действията за синя и зелена зона с профил, създаден за ежедневно ползване.',
      icon: '⚡',
    },
  ]

  return (
    <section id="features" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 xl:max-w-[88rem]">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">Основни функции</p>
        <h2 className="mt-3 text-3xl font-black text-white sm:text-5xl">Истински продукт, не просто идея</h2>
        <p className="mt-4 text-lg leading-8 text-white/70">
          Приложението вече показва ясна посока: откриване чрез карта, преки пътища в профила, награди и проследяване на активността.
        </p>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-3 xl:gap-8">
        {items.map((item) => (
          <div
            key={item.title}
            className="group flex min-h-[20rem] flex-col rounded-[1.85rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))] p-6 text-left shadow-[0_16px_50px_rgba(0,0,0,0.18)] backdrop-blur-xl transition duration-300 hover:-translate-y-1.5 hover:border-cyan-300/30 hover:bg-white/[0.065] sm:min-h-[22rem] sm:p-7"
          >
            <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10 text-2xl shadow-[0_0_30px_rgba(34,211,238,0.12)]">
              {item.icon}
            </div>
            <h3 className="text-2xl font-bold text-white">{item.title}</h3>
            <p className="mt-4 leading-8 text-white/70">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Отвори ParkRadar',
      text: 'Стартирай приложението и виж картата на живо или препоръчаното място директно от началния екран.',
    },
    {
      number: '02',
      title: 'Намери или подай сигнал',
      text: 'Използвай картата, подай сигнал за свободно място или потвърди дали отбелязаното място още е свободно.',
    },
    {
      number: '03',
      title: 'Трупай доверие и награди',
      text: 'Печели точки, подобрявай доверието си и отключвай значки, докато помагаш мрежата да става по-умна.',
    },
  ]

  return (
    <section id="how" className="relative border-y border-white/10 bg-white/[0.03]">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 xl:max-w-[88rem]">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">Как работи</p>
          <h2 className="mt-3 text-3xl font-black text-white sm:text-5xl">Бързо, полезно и лесно за разбиране</h2>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {steps.map((step) => (
            <div key={step.number} className="flex min-h-[18rem] flex-col rounded-[1.85rem] border border-white/10 bg-[linear-gradient(180deg,rgba(11,18,34,0.96),rgba(11,18,34,0.88))] p-6 shadow-[0_15px_50px_rgba(0,0,0,0.18)] sm:min-h-[20rem] sm:p-7">
              <div className="flex items-center justify-between">
                <span className="text-sm font-black tracking-[0.28em] text-cyan-300">{step.number}</span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/50">Лесно</span>
              </div>
              <h3 className="mt-6 text-2xl font-bold text-white">{step.title}</h3>
              <p className="mt-4 leading-8 text-white/70">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Showcase() {
  const [activeIndex, setActiveIndex] = useState(0)
  const currentShot = showcaseShots[activeIndex]

  function showPrevious() {
    setActiveIndex((currentIndex) => (currentIndex - 1 + showcaseShots.length) % showcaseShots.length)
  }

  function showNext() {
    setActiveIndex((currentIndex) => (currentIndex + 1) % showcaseShots.length)
  }

  return (
    <section id="showcase" className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 xl:max-w-[88rem] xl:py-28">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">Преглед на приложението</p>
        <h2 className="mt-3 text-3xl font-black text-white sm:text-5xl">Реални снимки от приложението</h2>
        <p className="mt-8 text-lg leading-8 text-white/70">
          Разгледай основните екрани в по-чист преглед, който държи фокуса върху активния екран.
        </p>
      </div>

      <div className="mt-14 grid items-center gap-8 lg:grid-cols-[0.95fr_1.05fr] xl:grid-cols-[0.84fr_1.16fr] xl:gap-16">
        <div className="rounded-[1.85rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))] p-5 shadow-[0_16px_50px_rgba(0,0,0,0.18)] backdrop-blur-xl sm:p-7 xl:p-9">
          <div className="flex items-start justify-between gap-6">
            <div>
              <h3 className="text-3xl font-black text-white">{currentShot.title}</h3>
              <p className="mt-4 max-w-xl leading-8 text-white/72">{currentShot.description}</p>
            </div>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:gap-4" role="tablist" aria-label="Слайдове за преглед на приложението">
            {showcaseShots.map((shot, index) => (
              <button
                key={shot.title}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-pressed={index === activeIndex}
                aria-label={`Покажи слайд ${formatSlideNumber(index + 1)}: ${shot.title}`}
                className={`rounded-[1.35rem] border px-4 py-4 text-left transition ${
                  index === activeIndex
                    ? 'border-cyan-300/40 bg-cyan-300/10 text-white'
                    : 'border-white/10 bg-white/[0.03] text-white/72 hover:bg-white/[0.06]'
                }`}
              >
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300/80">{formatSlideNumber(index + 1)}</div>
                <div className="mt-2 text-base font-bold">{shot.title}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="relative isolate mx-auto w-full max-w-[22rem] overflow-hidden rounded-[2.2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(9,15,28,0.96),rgba(5,8,22,0.98))] p-4 shadow-[0_28px_90px_rgba(0,0,0,0.32)] [perspective:1400px] sm:max-w-[30rem] sm:rounded-[2.5rem] sm:p-6 xl:max-w-[34rem] xl:p-7">
          <div className="absolute inset-0 rounded-[2.5rem] bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.12),transparent_38%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent)]" />

          <button
            type="button"
            onClick={showPrevious}
            aria-label="Покажи предишния екран"
            className="absolute left-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-[#08111f]/84 text-white backdrop-blur-xl transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-300/60 sm:left-3 sm:h-12 sm:w-12"
          >
            <span className="text-2xl leading-none">‹</span>
          </button>

          <button
            type="button"
            onClick={showNext}
            aria-label="Покажи следващия екран"
            className="absolute right-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-[#08111f]/84 text-white backdrop-blur-xl transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-300/60 sm:right-3 sm:h-12 sm:w-12"
          >
            <span className="text-2xl leading-none">›</span>
          </button>

          <div className="relative z-10 min-h-[24rem] [transform-style:preserve-3d] sm:min-h-[38rem] lg:min-h-[42rem] xl:min-h-[46rem]">
            {showcaseShots.map((shot, index) => {
              const offset = getWrappedOffset(index, activeIndex, showcaseShots.length)

              return (
                <div
                  key={shot.title}
                  className={`absolute inset-x-2 top-1/2 -translate-y-1/2 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] sm:inset-x-6 ${Math.abs(offset) <= 1 ? 'block' : 'hidden'}`}
                  style={getCarouselCardStyle(offset)}
                  aria-hidden={offset !== 0}
                >
                    <div className="mx-auto w-full max-w-[16rem] sm:max-w-[24rem] xl:max-w-[26rem]">
                    <PhoneFrame image={shot.image} alt={shot.title} />
                  </div>
                </div>
              )
            })}
          </div>

          <div className="relative z-10 mt-2 flex items-center justify-center gap-2 rounded-full border border-white/10 bg-[#08111f]/72 px-4 py-2.5 backdrop-blur-xl sm:mt-3 sm:py-3">
            {showcaseShots.map((shot, index) => (
              <button
                key={shot.title}
                type="button"
                aria-label={`Покажи ${shot.title}`}
                aria-pressed={index === activeIndex}
                onClick={() => setActiveIndex(index)}
                className={`h-2.5 rounded-full transition focus:outline-none focus:ring-2 focus:ring-cyan-300/60 ${index === activeIndex ? 'w-8 bg-cyan-300' : 'w-2.5 bg-white/25 hover:bg-white/45'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function SocialProof() {
  const testimonials = [
    '„Това веднага кара идеята да изглежда реална, а не само концептуална.“',
    '„Картата плюс системата с награди му дават усещане за истински продукт.“',
    '„Още сега си представям колко полезно би било във Варна и София.“',
  ]

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 xl:max-w-[88rem]">
      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-[1.85rem] border border-cyan-300/20 bg-gradient-to-br from-cyan-300/12 via-sky-400/8 to-blue-500/12 p-6 shadow-[0_25px_80px_rgba(56,189,248,0.12)] sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-200">Защо се отличава</p>
          <h2 className="mt-3 text-3xl font-black text-white sm:text-5xl">Силна концепция с видима продуктова дълбочина</h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/74">
            Приложението не е само за намиране на място. То добавя доверие между потребителите, награди, история и преки пътища, които правят изживяването по-полезно с времето.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
            <Stat value="На живо" label="видимост на местата" />
            <Stat value="Награди" label="точки и значки" />
            <Stat value="Доверие" label="качествени сигнали" />
          </div>
        </div>

        <div className="grid gap-4 content-start">
          {testimonials.map((quote, index) => (
            <div key={index} className="rounded-[1.85rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))] p-5 text-base leading-7 text-white/78 shadow-[0_10px_35px_rgba(0,0,0,0.12)] backdrop-blur-xl sm:p-6 sm:text-lg sm:leading-8">
              {quote}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Stat({ value, label }) {
  return (
    <div className="relative overflow-hidden rounded-[1.85rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))] p-5 text-left shadow-[0_16px_50px_rgba(0,0,0,0.18)] backdrop-blur-xl sm:p-6">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent" />
      <div className="text-[1.25rem] font-black leading-[1.08] text-white sm:text-[1.35rem] xl:text-[1.45rem]">
        {value}
      </div>
      <div className="mt-3 max-w-[16ch] text-[0.95rem] leading-6 text-white/72 sm:max-w-[14ch] sm:text-[0.98rem]">
        {label}
      </div>
    </div>
  )
}

function FinalCTA() {
  return (
    <section id="waitlist" className="pb-20 sm:pb-24 xl:pb-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.03] p-6 text-center shadow-[0_30px_100px_rgba(0,0,0,0.2)] backdrop-blur-xl sm:rounded-[2.25rem] sm:p-12 lg:p-14">
          <div className="absolute left-0 top-0 h-40 w-40 rounded-full bg-cyan-300/12 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl" />

          <div className="relative">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">Ранен достъп</p>
            <h2 className="mt-3 text-[2.2rem] font-black leading-[1.02] text-white sm:text-5xl">
              Бъди сред първите при старта на ParkRadar
            </h2>
            <p className="mx-auto mt-5 max-w-[40rem] text-center text-base leading-7 text-white/72 sm:text-lg sm:leading-8">
              Събери интерес още сега, валидирай идеята и превърни реалното търсене в първата версия на продукта.
            </p>

            <form onSubmit={(e) => e.preventDefault()} className="mx-auto mt-8 grid w-full max-w-[28rem] grid-cols-1 justify-items-center gap-4 sm:max-w-[46rem] sm:grid-cols-[minmax(0,34rem)_11rem] sm:justify-center sm:gap-5">
              <input
                type="email"
                placeholder="Въведи своя имейл"
                className="h-14 w-full rounded-2xl border border-white/10 bg-[#050b16] px-5 text-white outline-none placeholder:text-white/30 focus:border-cyan-300/50"
              />
              <button
                type="submit"
                className="h-14 w-full rounded-2xl bg-gradient-to-r from-cyan-300 to-blue-500 px-8 font-bold text-white shadow-[0_12px_40px_rgba(56,189,248,0.28)] transition hover:-translate-y-0.5 sm:w-[11rem]"
              >
                Извести ме
              </button>
            </form>

            <p className="mt-4 text-sm text-white/58">Без спам. Само новини за старта и ранния достъп.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-white/10 py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 text-center text-sm text-white/42 sm:px-6 lg:flex-row lg:px-8 lg:text-left">
        <p>© 2026 ParkRadar. Всички права запазени.</p>
        <div className="flex gap-6">
          <a href="#" className="transition hover:text-white">Поверителност</a>
          <a href="#" className="transition hover:text-white">Условия</a>
          <a href="#waitlist" className="transition hover:text-white">Ранен достъп</a>
        </div>
      </div>
    </footer>
  )
}
