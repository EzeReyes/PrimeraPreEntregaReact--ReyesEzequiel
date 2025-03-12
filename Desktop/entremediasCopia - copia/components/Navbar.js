import React, { useState, useEffect } from 'react';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useLazyQuery, gql } from '@apollo/client';
import { initializeApollo } from '@/lib/apolloClient';
import { useCarrito } from '../context/cartContext';


function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Navbar = () => {
  const { cantidadEnCarrito } = useCarrito();
  const router = useRouter();
  
  const navigation = [
    { name: 'Sobre Nosotros', href: '/sobre-nosotros' },
    { name: 'Shop', href: '/shop' },
    { name: 'Carrito', href: '/carrito' },
  ];

  const updatedNavigation = navigation.map((item) => ({
    ...item,
    current: router.pathname === item.href,
  }));

  return (
    <Disclosure as="nav" className="bg-slate-900">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
            </DisclosureButton>
          </div>

          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <Link href='/'>
                <Image src="/logo-entremedias.jpeg" alt="entremedias" width={50} height={50} />
              </Link>
              <h2 className="ml-4 text-2xl font-lobster text-white">entremedias</h2>
            </div>

            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4 h-full items-center js">
                {updatedNavigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    aria-current={item.current ? 'page' : undefined}
                    className={classNames(
                      item.current ? 'bg-gray-500 text-white' : 'text-gray-300 hover:bg-rose-400 hover:text-white',
                      'rounded-md px-3 py-2 text-sm font-medium'
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <Link href='/carrito'>
                  <Image src="/carrito.png" alt="Carrito" width={40} height={40} />
                </Link>
                <span className="text-stone-50">{cantidadEnCarrito()}</span>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {updatedNavigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={item.current ? 'page' : undefined}
              className={classNames(
                item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                'block rounded-md px-3 py-2 text-base font-medium'
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
};

export default Navbar;
