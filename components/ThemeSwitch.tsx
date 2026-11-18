'use client'

import { Fragment, useEffect, useState } from 'react'
import { track } from './track'
import { useAtmosphere } from './useAtmosphere'
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Radio,
  RadioGroup,
  Transition,
} from '@headlessui/react'

const Sun = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className="group:hover:text-gray-100 h-6 w-6"
  >
    <path
      fillRule="evenodd"
      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
      clipRule="evenodd"
    />
  </svg>
)
const Moon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className="group:hover:text-gray-100 h-6 w-6"
  >
    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
  </svg>
)
const Monitor = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="group:hover:text-gray-100 h-6 w-6"
  >
    <rect x="3" y="3" width="14" height="10" rx="2" ry="2"></rect>
    <line x1="7" y1="17" x2="13" y2="17"></line>
    <line x1="10" y1="13" x2="10" y2="17"></line>
  </svg>
)
const Cup = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-6 w-6"
  >
    <path d="M4 8h10v4a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8z" />
    <path d="M14 9h1.5a2 2 0 0 1 0 4H14" />
    <path d="M7 3v2M10.5 3v2" />
  </svg>
)
const Blank = () => <svg className="h-6 w-6" />

const options = [
  { value: 'light', label: 'Light', icon: <Sun /> },
  { value: 'dark', label: 'Dark', icon: <Moon /> },
  { value: 'system', label: 'System', icon: <Monitor /> },
  { value: 'morning', label: 'Morning café', icon: <Cup /> },
  { value: 'night', label: 'Night café', icon: <Cup /> },
]

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false)
  const { atmosphere, theme, resolvedTheme, light, pickTheme } = useAtmosphere()

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), [])

  const choose = (value: string) => {
    track('theme_set', { resource: value })
    if (value === 'morning' || value === 'night') light(value)
    else pickTheme(value)
  }

  return (
    <div className="flex items-center">
      <Menu as="div" className="relative inline-block text-left">
        <div className="hover:text-primary-500 dark:hover:text-primary-400 flex items-center justify-center">
          <MenuButton aria-label="Theme and atmosphere">
            {!mounted ? (
              <Blank />
            ) : atmosphere ? (
              <Cup />
            ) : resolvedTheme === 'dark' ? (
              <Moon />
            ) : (
              <Sun />
            )}
          </MenuButton>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <MenuItems className="ring-opacity-5 absolute right-0 z-[70] mt-2 w-44 origin-top-right divide-y divide-gray-100 rounded-md bg-white ring-1 shadow-lg ring-black focus:outline-hidden dark:bg-gray-800">
            <RadioGroup value={atmosphere ?? theme} onChange={choose}>
              <div className="p-1">
                {options.map((option) => (
                  <Radio key={option.value} value={option.value}>
                    {({ checked }) => (
                      <MenuItem>
                        {({ focus }) => (
                          <button
                            className={`${focus ? 'bg-primary-600 text-white' : ''} ${
                              checked ? 'font-semibold' : ''
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                          >
                            <div className="mr-2">{option.icon}</div>
                            {option.label}
                          </button>
                        )}
                      </MenuItem>
                    )}
                  </Radio>
                ))}
              </div>
            </RadioGroup>
          </MenuItems>
        </Transition>
      </Menu>
    </div>
  )
}

export default ThemeSwitch
