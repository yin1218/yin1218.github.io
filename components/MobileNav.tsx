'use client'

import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState } from 'react'
import SidebarNavigation from './SidebarNavigation'
import { useLocale } from './useLocale'
import { dictionary } from '@/data/dictionary'

export default function MobileNav() {
  const [open, setOpen] = useState(false)
  const t = dictionary[useLocale()]
  const close = () => setOpen(false)

  return (
    <>
      <button
        type="button"
        aria-label={t.openNavigation}
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className="sidebar-menu-button"
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <path d="M4 6h16M4 12h16M4 18h10" />
        </svg>
      </button>
      <Dialog open={open} onClose={close} className="mobile-navigation-dialog">
        <div className="sidebar-backdrop" aria-hidden="true" />
        <DialogPanel className="mobile-sidebar-panel">
          <div className="mobile-sidebar-heading">
            <DialogTitle className="academic-wordmark">{t.navigation}</DialogTitle>
            <button
              type="button"
              onClick={close}
              aria-label={t.closeNavigation}
              className="sidebar-menu-button"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <path d="m6 6 12 12M18 6 6 18" />
              </svg>
            </button>
          </div>
          <SidebarNavigation onNavigate={close} />
        </DialogPanel>
      </Dialog>
    </>
  )
}
