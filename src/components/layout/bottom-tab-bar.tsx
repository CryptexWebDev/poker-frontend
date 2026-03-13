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
      <div className="tab-bar-inner flex w-full items-stretch justify-center gap-0 min-h-[3.875rem] py-3">
        {tabs.map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              clsx(
                'flex flex-1 min-w-[90px] max-w-[120px] h-[62px] flex-col items-center justify-center border-0 outline-none ring-0 focus:outline-none focus:ring-0 focus:ring-offset-0 active:outline-none active:ring-0',
                'gap-[var(--spacing-tab-icon-label)]',
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
                      'mb-0.5 h-[0.2rem] w-[6.2rem] shrink-0 rounded-b-[2.4rem]',
                      isActive ? 'bg-accent' : 'bg-transparent'
                    )}
                    aria-hidden
                  />
                  <span className="flex h-[22px] w-[22px] items-center justify-center flex-shrink-0 border-0 outline-none ring-0 [&_svg]:block">
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
