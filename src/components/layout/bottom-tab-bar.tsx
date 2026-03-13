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
      className="downbar flex items-center justify-center safe-area-insets"
      aria-label="Bottom navigation"
    >
      <div className="tab-bar-inner flex w-full items-stretch justify-center gap-0 min-h-11 py-1.5">
        {tabs.map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              clsx(
                'flex flex-1 min-w-22.5 max-w-30 h-12 flex-col items-center justify-center border-0 outline-none ring-0 focus:outline-none focus:ring-0 focus:ring-offset-0 active:outline-none active:ring-0',
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
                      'tab-bar-indicator',
                      isActive ? 'tab-bar-indicator-active' : 'tab-bar-indicator-inactive'
                    )}
                    aria-hidden
                  />
                  <span className="tab-bar-icon flex h-5.5 w-5.5 shrink-0 items-center justify-center border-0 outline-none ring-0 [&_svg]:block">
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
