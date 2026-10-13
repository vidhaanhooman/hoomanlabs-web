"use client"

import Link from "next/link"
import { useState } from "react"
import { ListIcon } from "@phosphor-icons/react"

import { Button, buttonVariants } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ctas, nav } from "@/content/draft"
import { menuHref, platformFeatured, platformMenu } from "@/content/platform"

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
          <Link href="/platform" onClick={close} className="flex h-8 items-center text-small text-ink-muted">
            Platform
          </Link>
          <div className="flex flex-col gap-3 border-b border-line pb-4">
            {[...platformMenu, { group: "Featured", pages: [platformFeatured] }].map(({ group, pages }) => (
              <div key={group} className="flex flex-col">
                <p className="pt-2 text-label text-ink-muted">{group}</p>
                <ul className="flex flex-col">
                  {pages.map((p) => (
                    <li key={p.id}>
                      <Link href={menuHref(p)} onClick={close} className="flex h-10 items-center text-body-lg">
                        {p.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
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
          <Link data-demo href={ctas.demo.href} onClick={close} className={buttonVariants()}>
            {ctas.demo.label}
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  )
}
