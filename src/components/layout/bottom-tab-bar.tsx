import { NavLink } from 'react-router-dom'
import clsx from 'clsx'
import { Icon, type IconName } from '@/components/ui/icon'

const tabs: { to: string; label: string; icon: IconName }[] = [
  { to: '/', label: 'Главная', icon: 'home' },
  { to: '/create', label: 'Создать игру', icon: 'create' },
  { to: '/profile', label: 'Профиль', icon: 'profile' },
]

export function BottomTabBar() {
  return (
    <nav
      className="downbar flex items-center justify-center safe-area-insets pb-safe"
      aria-label="Bottom navigation"
    >
      <div className="tab-bar-inner flex w-full items-stretch justify-center gap-0 min-h-14 py-2.5">
        {tabs.map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              clsx(
                'flex flex-1 min-w-22.5 max-w-30 h-15.5 flex-col items-center justify-center border-0 outline-none ring-0 focus:outline-none focus:ring-0 focus:ring-offset-0 active:outline-none active:ring-0',
                'gap-tab-icon-label',
                isActive ? 'text-accent' : 'text-tg-hint'
              )
            }
            end={to === '/'}
          >
            {({ isActive }) => {
              const iconActive =
                isActive ? 'text-accent' : 'text-tg-hint'
              return (
                <>
                  <span
                    className={clsx(
                      'mb-0.5 h-0.5 w-15 shrink-0 rounded-b-3xl',
                      isActive ? 'bg-accent' : 'bg-transparent'
                    )}
                    aria-hidden
                  />
                  <span className="flex h-5.5 w-5.5 items-center justify-center shrink-0 border-0 outline-none ring-0 [&_svg]:block">
                    <Icon
                      name={icon}
                      sizeRem={1.375}
                      className={iconActive}
                    />
                  </span>
                  <span className="tab-bar-label">{label}</span>
                </>
              )
            }}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
