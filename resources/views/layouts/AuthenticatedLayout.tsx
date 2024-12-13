import { ArrowRightStartOnRectangleIcon, ChevronUpIcon, UserCircleIcon } from '@heroicons/react/16/solid'
import { BookOpenIcon, HomeIcon, UsersIcon } from '@heroicons/react/20/solid'
import { Head, usePage } from '@inertiajs/react'
import { PropsWithChildren, useEffect, useState } from 'react'
import { User } from '~/scripts/types'
import { Avatar } from '../components/avatar'
import {
  Dropdown,
  DropdownButton,
  DropdownDivider,
  DropdownItem,
  DropdownLabel,
  DropdownMenu,
} from '../components/dropdown'
import Flash from '../components/flash'
import { Heading } from '../components/heading'
import { Navbar, NavbarItem, NavbarSection, NavbarSpacer } from '../components/navbar'
import {
  Sidebar,
  SidebarBody,
  SidebarFooter,
  SidebarHeader,
  SidebarItem,
  SidebarLabel,
  SidebarSection,
} from '../components/sidebar'
import { SidebarLayout } from '../components/sidebar-layout'

function AccountDropdownMenu({ anchor }: { anchor: 'top start' | 'bottom end' }) {
  return (
    <DropdownMenu className="min-w-64" anchor={anchor}>
      <DropdownItem href={route('profile.edit')}>
        <UserCircleIcon />
        <DropdownLabel>Profile</DropdownLabel>
      </DropdownItem>
      <DropdownDivider />
      <DropdownItem method="post" href={route('logout')}>
        <ArrowRightStartOnRectangleIcon />
        <DropdownLabel>Log Out</DropdownLabel>
      </DropdownItem>
    </DropdownMenu>
  )
}

export default function AuthenticatedLayout({
  user,
  headerTitle,
  children,
  isWithHeader = true,
}: PropsWithChildren<{ user: User; headerTitle: string; isWithHeader?: boolean }>) {
  const { flash } = usePage<{
      flash: {
        success?: string
      }
    }>().props,
    [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (flash.success) {
      setIsOpen(true)

      setTimeout(() => {
        setIsOpen(false)
      }, 3000)
    }
  }, [flash, setIsOpen])

  return (
    <SidebarLayout
      navbar={
        <Navbar>
          <NavbarSpacer />
          {flash.success && isOpen && <Flash isTiny={true} type="success" message={flash.success} state={setIsOpen} />}
          <NavbarSection>
            <Dropdown>
              <DropdownButton as={NavbarItem}>
                <Avatar src="https://catalyst-demo.tailwindui.com/users/erica.jpg" square />
              </DropdownButton>
              <AccountDropdownMenu anchor="bottom end" />
            </Dropdown>
          </NavbarSection>
        </Navbar>
      }
      sidebar={
        <Sidebar>
          <SidebarHeader>
            <SidebarItem href="/">
              <Avatar src="https://catalyst-demo.tailwindui.com/teams/catalyst.svg" />
              <SidebarLabel>Modern Monolith</SidebarLabel>
            </SidebarItem>
          </SidebarHeader>

          <SidebarBody>
            <SidebarSection>
              <SidebarItem href={route('dashboard')} current={route().current('dashboard')}>
                <HomeIcon />
                <SidebarLabel>Dashboard</SidebarLabel>
              </SidebarItem>
            </SidebarSection>
          </SidebarBody>

          <SidebarFooter className="max-lg:hidden">
            {flash.success && isOpen && <Flash type="success" message={flash.success} state={setIsOpen} />}

            <Dropdown>
              <DropdownButton as={SidebarItem}>
                <span className="flex min-w-0 items-center gap-3">
                  <Avatar
                    src="https://catalyst-demo.tailwindui.com/users/erica.jpg"
                    className="size-10"
                    square
                    alt=""
                  />
                  <span className="min-w-0">
                    <span className="block truncate text-sm/5 font-medium text-zinc-950 dark:text-white">
                      {user.name}
                    </span>
                    <span className="block truncate text-xs/5 font-normal text-zinc-500 dark:text-zinc-400">
                      {user.email}
                    </span>
                  </span>
                </span>
                <ChevronUpIcon />
              </DropdownButton>
              <AccountDropdownMenu anchor="top start" />
            </Dropdown>
          </SidebarFooter>
        </Sidebar>
      }
    >
      <Head title={headerTitle} />

      {isWithHeader && <Heading>{headerTitle}</Heading>}

      {children}
    </SidebarLayout>
  )
}
