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
      className="flex items-end justify-center gap-0 bg-tg-bg border-t border-tg-secondary safe-area-insets pb-safe"
      aria-label="Bottom navigation"
    >
      <div className="flex items-center justify-center w-full max-w-[270px] h-12 gap-8 px-[60px]">
        {tabs.map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              clsx(
                'flex flex-col items-center justify-center gap-0.5 min-w-0 flex-1',
                isActive ? 'text-accent' : 'text-tg-hint'
              )
            }
            end={to === '/'}
          >
            {({ isActive }) => {
              const isCreate = icon === 'create'
              const iconActive = isActive && !isCreate ? 'text-accent' : isActive && isCreate ? 'text-white' : 'text-tg-hint'
              return (
                <>
                  <span
                    className={clsx(
                      'flex items-center justify-center',
                      isActive && isCreate && 'rounded-full bg-accent p-1.5'
                    )}
                  >
                    <Icon
                      name={icon}
                      size={isCreate ? 22 : 24}
                      className={iconActive}
                    />
                  </span>
                  {isActive && isCreate && (
                    <span className="border-b-2 border-dotted border-accent w-full max-w-[60px]" />
                  )}
                  <span className="text-[0.65rem] font-medium leading-tight">{label}</span>
                </>
              )
            }}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
