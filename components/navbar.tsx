// components/navbar.tsx
"use client";

import { useState, useEffect } from "react";
import { MainNav } from "./main-nav";
import StoreSwitcher from "./store-switcher";
import { UserButton } from "@clerk/nextjs";

// !!! ÖNEMLİ: Store modelini import etmeniz gerekiyor.
// Eğer Prisma kullanıyorsanız, genellikle @prisma/client kütüphanesinden gelir.
// Eğer model tanımınız başka bir yerde ise (örn. types.ts), yolu ona göre ayarlayın.
import { Store } from "@prisma/client"; // Bu satırı ekleyin!

// Navbar'ın alacağı prop'ları tanımlıyoruz.
interface NavbarProps {
  userId: string | null;
  // `stores` prop'unun tipini `Store[]` olarak güncelliyoruz
  // Bu, StoreSwitcher'ın beklediği tüm alanları (id, name, userId, createdAt, updatedAt) içerir.
  stores: Store[]; // Tipi '{ id: string; name: string; }[]' yerine 'Store[]' yaptık
}

const Navbar: React.FC<NavbarProps> = ({ userId, stores }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        {/* StoreSwitcher'a doğru tipte `stores` dizisini iletiyoruz */}
        <StoreSwitcher items={stores} />
        <MainNav />
        <div className="ml-auto flex items-center space-x-4">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;