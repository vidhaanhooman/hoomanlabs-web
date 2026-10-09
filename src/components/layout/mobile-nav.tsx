"use client"

import Link from "next/link"
import { useState } from "react"
import { ListIcon } from "@phosphor-icons/react"

import { Button, buttonVariants } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ctas, nav } from "@/content/draft"
import { productList } from "@/content/products"

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={<Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu" />}
      >
        <ListIcon className="size-5" />
      </SheetTrigger>
      <SheetContent side="right" className="w-full max-w-sm gap-0 p-0">
        <div className="flex h-16 items-center px-(--gutter)">
          <SheetTitle className="text-small font-medium">Menu</SheetTitle>
        </div>
        <nav aria-label="Mobile" className="px-(--gutter)">
          <p className="pb-1 text-small text-ink-muted">Product</p>
          <ul className="flex flex-col border-b border-line pb-3">
            {productList.map((product) => (
              <li key={product.slug}>
                <Link href={`/${product.slug}`} onClick={close} className="flex h-11 items-center text-body-lg">
                  {product.name}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="flex flex-col pt-3">
            {nav.links.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  onClick={close}
                  className="flex h-12 items-center text-body-lg"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-auto flex flex-col gap-2 p-(--gutter)">
          <Link href={nav.signIn.href} onClick={close} className={buttonVariants({ variant: "outline" })}>
            {nav.signIn.label}
          </Link>
          <Link href={ctas.demo.href} onClick={close} className={buttonVariants()}>
            {ctas.demo.label}
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  )
}
