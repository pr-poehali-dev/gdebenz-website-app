import { useState } from 'react';
import Icon from '@/components/ui/icon';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';

const revenueData = [
  { m: 'Янв', v: 42 }, { m: 'Фев', v: 58 }, { m: 'Мар', v: 51 },
  { m: 'Апр', v: 73 }, { m: 'Май', v: 68 }, { m: 'Июн', v: 89 },
  { m: 'Июл', v: 104 },
];

const channelData = [
  { name: 'Пн', a: 24, b: 18 }, { name: 'Вт', a: 31, b: 22 },
  { name: 'Ср', a: 28, b: 26 }, { name: 'Чт', a: 40, b: 30 },
  { name: 'Пт', a: 47, b: 34 }, { name: 'Сб', a: 35, b: 28 },
  { name: 'Вс', a: 29, b: 20 },
];

const sourceData = [
  { name: 'Органика', value: 44 },
  { name: 'Реклама', value: 28 },
  { name: 'Соцсети', value: 18 },
  { name: 'Прямые', value: 10 },
];

const PIE_COLORS = ['hsl(158 64% 30%)', 'hsl(158 45% 48%)', 'hsl(40 80% 60%)', 'hsl(220 12% 70%)'];

const metrics = [
  { label: 'Выручка', value: '4.28M ₽', delta: '+12.4%', up: true, icon: 'TrendingUp' },
  { label: 'Активные пользователи', value: '18 942', delta: '+5.1%', up: true, icon: 'Users' },
  { label: 'Конверсия', value: '3.87%', delta: '-0.3%', up: false, icon: 'Target' },
  { label: 'Средний чек', value: '2 140 ₽', delta: '+8.9%', up: true, icon: 'CreditCard' },
];

const nav = [
  { id: 'dashboard', label: 'Главная', icon: 'LayoutDashboard' },
  { id: 'settings', label: 'Настройки', icon: 'Settings' },
];

function Card({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <div
      className={`rounded-3xl bg-card border border-border/60 shadow-[0_1px_2px_rgba(0,0,0,0.02),0_8px_24px_-12px_rgba(0,0,0,0.06)] opacity-0 animate-fade-in ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {metrics.map((m, i) => (
          <Card key={m.label} delay={i * 60} className="p-6">
            <div className="flex items-start justify-between">
              <div className="w-11 h-11 rounded-2xl bg-accent flex items-center justify-center">
                <Icon name={m.icon} size={20} className="text-primary" />
              </div>
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${m.up ? 'bg-accent text-accent-foreground' : 'bg-destructive/10 text-destructive'}`}>
                {m.delta}
              </span>
            </div>
            <div className="mt-5">
              <div className="text-2xl font-display font-bold tracking-tight">{m.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{m.label}</div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card delay={240} className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-display font-semibold text-lg">Динамика выручки</h3>
              <p className="text-sm text-muted-foreground">За последние 7 месяцев</p>
            </div>
            <span className="text-sm font-medium text-primary">+148%</span>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={revenueData} margin={{ left: -20, right: 8 }}>
              <defs>
                <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(158 64% 30%)" stopOpacity={0.28} />
                  <stop offset="100%" stopColor="hsl(158 64% 30%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(40 12% 90%)" vertical={false} />
              <XAxis dataKey="m" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(220 8% 46%)' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(220 8% 46%)' }} />
              <Tooltip contentStyle={{ borderRadius: 16, border: '1px solid hsl(40 12% 90%)', fontSize: 13 }} />
              <Area type="monotone" dataKey="v" stroke="hsl(158 64% 30%)" strokeWidth={2.5} fill="url(#rev)" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card delay={300} className="p-6">
          <h3 className="font-display font-semibold text-lg mb-1">Источники</h3>
          <p className="text-sm text-muted-foreground mb-4">Распределение трафика</p>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={sourceData} dataKey="value" innerRadius={52} outerRadius={80} paddingAngle={3} stroke="none">
                {sourceData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 16, border: '1px solid hsl(40 12% 90%)', fontSize: 13 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-4">
            {sourceData.map((s, i) => (
              <div key={s.name} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: PIE_COLORS[i] }} />
                  {s.name}
                </span>
                <span className="font-medium">{s.value}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card delay={360} className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-display font-semibold text-lg">Активность по каналам</h3>
            <p className="text-sm text-muted-foreground">Веб против мобильных</p>
          </div>
          <div className="flex gap-4 text-sm">
            <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-primary" />Веб</span>
            <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full" style={{ background: 'hsl(40 80% 60%)' }} />Моб.</span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={channelData} margin={{ left: -20, right: 8 }} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(40 12% 90%)" vertical={false} />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(220 8% 46%)' }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(220 8% 46%)' }} />
            <Tooltip cursor={{ fill: 'hsl(40 15% 94%)' }} contentStyle={{ borderRadius: 16, border: '1px solid hsl(40 12% 90%)', fontSize: 13 }} />
            <Bar dataKey="a" fill="hsl(158 64% 30%)" radius={[6, 6, 0, 0]} />
            <Bar dataKey="b" fill="hsl(40 80% 60%)" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}

function Toggle({ on, onClick }: { on: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-11 h-6 rounded-full transition-colors relative ${on ? 'bg-primary' : 'bg-border'}`}
    >
      <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all ${on ? 'left-[22px]' : 'left-0.5'}`} />
    </button>
  );
}

function Settings() {
  const [prefs, setPrefs] = useState({ email: true, push: false, weekly: true });
  const toggle = (k: keyof typeof prefs) => setPrefs(p => ({ ...p, [k]: !p[k] }));

  return (
    <div className="max-w-2xl space-y-6">
      <Card className="p-6" delay={0}>
        <h3 className="font-display font-semibold text-lg mb-6">Профиль</h3>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center text-xl font-display font-bold">АИ</div>
          <div>
            <div className="font-medium">Алексей Иванов</div>
            <div className="text-sm text-muted-foreground">alexey@analytica.ru</div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { l: 'Имя', v: 'Алексей Иванов' },
            { l: 'Email', v: 'alexey@analytica.ru' },
            { l: 'Компания', v: 'Analytica Inc.' },
            { l: 'Должность', v: 'Аналитик данных' },
          ].map(f => (
            <label key={f.l} className="block">
              <span className="text-xs text-muted-foreground">{f.l}</span>
              <input defaultValue={f.v} className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring/30" />
            </label>
          ))}
        </div>
      </Card>

      <Card className="p-6" delay={80}>
        <h3 className="font-display font-semibold text-lg mb-2">Уведомления</h3>
        <p className="text-sm text-muted-foreground mb-4">Как вы хотите получать обновления</p>
        <div className="divide-y divide-border">
          {[
            { k: 'email' as const, l: 'Email-уведомления', d: 'Отчёты и алерты на почту' },
            { k: 'push' as const, l: 'Push-уведомления', d: 'Мгновенные сигналы в браузере' },
            { k: 'weekly' as const, l: 'Недельный дайджест', d: 'Сводка каждый понедельник' },
          ].map(row => (
            <div key={row.k} className="flex items-center justify-between py-4">
              <div>
                <div className="font-medium text-sm">{row.l}</div>
                <div className="text-sm text-muted-foreground">{row.d}</div>
              </div>
              <Toggle on={prefs[row.k]} onClick={() => toggle(row.k)} />
            </div>
          ))}
        </div>
      </Card>

      <div className="flex justify-end">
        <button className="rounded-xl bg-primary text-primary-foreground px-6 py-2.5 text-sm font-medium hover:opacity-90 transition-opacity">
          Сохранить изменения
        </button>
      </div>
    </div>
  );
}

export default function Index() {
  const [active, setActive] = useState('dashboard');

  return (
    <div className="min-h-screen grain flex">
      <aside className="hidden md:flex flex-col w-60 border-r border-border/60 bg-card/40 backdrop-blur-sm px-4 py-6 fixed h-full">
        <div className="flex items-center gap-2.5 px-2 mb-8">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
            <Icon name="Activity" size={18} className="text-primary-foreground" />
          </div>
          <span className="font-display font-bold text-lg">Analytica</span>
        </div>
        <nav className="space-y-1">
          {nav.map(n => (
            <button
              key={n.id}
              onClick={() => setActive(n.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${active === n.id ? 'bg-accent text-accent-foreground font-medium' : 'text-muted-foreground hover:bg-secondary'}`}
            >
              <Icon name={n.icon} size={18} />
              {n.label}
            </button>
          ))}
        </nav>
        <div className="mt-auto rounded-2xl bg-accent/60 p-4">
          <div className="text-sm font-medium">Тариф Pro</div>
          <div className="text-xs text-muted-foreground mt-1">Активен до 15 авг 2026</div>
        </div>
      </aside>

      <div className="flex-1 md:ml-60">
        <header className="sticky top-0 z-10 bg-background/70 backdrop-blur-md border-b border-border/60 px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-display font-bold text-xl md:text-2xl">
              {active === 'dashboard' ? 'Панель аналитики' : 'Личные настройки'}
            </h1>
            <p className="text-sm text-muted-foreground hidden sm:block">
              {active === 'dashboard' ? 'Обзор ключевых показателей в реальном времени' : 'Управление аккаунтом и предпочтениями'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button className="md:hidden w-10 h-10 rounded-xl bg-secondary flex items-center justify-center" onClick={() => setActive(active === 'dashboard' ? 'settings' : 'dashboard')}>
              <Icon name={active === 'dashboard' ? 'Settings' : 'LayoutDashboard'} size={18} />
            </button>
            <button className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center hover:bg-accent transition-colors">
              <Icon name="Bell" size={18} />
            </button>
            <div className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center text-sm font-display font-bold">АИ</div>
          </div>
        </header>

        <main className="p-6">
          {active === 'dashboard' ? <Dashboard /> : <Settings />}
        </main>
      </div>
    </div>
  );
}
