import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import CatalogSection from '@/components/CatalogSection';
import AboutSection from '@/components/AboutSection';
import ContactsSection from '@/components/ContactsSection';

interface Product {
  id: number;
  name: string;
  price: number;
  material: string;
  color: string;
  size: string;
  image: string;
  description: string;
}

interface CartItem extends Product {
  quantity: number;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Клеопатра',
    price: 12500,
    material: 'Кашемир',
    color: 'Чёрный',
    size: 'S',
    image: 'https://cdn.poehali.dev/projects/dfd86f21-5a4b-4afd-9e94-120370b327fd/files/2ed1c68d-22fc-4f51-b1d0-08e54f18a00e.jpg',
    description: 'Роскошный парик из натурального кашемира с изящной египетской отделкой'
  },
  {
    id: 2,
    name: 'Нефертити',
    price: 15800,
    material: 'Ангора',
    color: 'Белый',
    size: 'M',
    image: 'https://cdn.poehali.dev/projects/dfd86f21-5a4b-4afd-9e94-120370b327fd/files/a9e964dc-8eab-4bae-a1a4-da648ad517bf.jpg',
    description: 'Элегантный белоснежный парик с золотыми вставками'
  },
  {
    id: 3,
    name: 'Рамзес',
    price: 18900,
    material: 'Мериносовая шерсть',
    color: 'Золотой',
    size: 'L',
    image: 'https://cdn.poehali.dev/projects/dfd86f21-5a4b-4afd-9e94-120370b327fd/files/441d5eca-6132-419b-a192-1c894ba7d899.jpg',
    description: 'Премиальный парик с золотым отливом для королевских особ'
  },
  {
    id: 4,
    name: 'Исида',
    price: 13200,
    material: 'Кашемир',
    color: 'Серый',
    size: 'S',
    image: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=400',
    description: 'Изысканный серый парик с мягкой текстурой'
  },
  {
    id: 5,
    name: 'Тутанхамон',
    price: 22000,
    material: 'Альпака',
    color: 'Бежевый',
    size: 'M',
    image: 'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=400',
    description: 'Уникальный парик из альпаки цвета пустынного песка'
  },
  {
    id: 6,
    name: 'Хатшепсут',
    price: 16700,
    material: 'Ангора',
    color: 'Рыжий',
    size: 'L',
    image: 'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=400',
    description: 'Огненно-рыжий парик для смелых натур'
  }
];

export default function Index() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeSection, setActiveSection] = useState('home');
  const [filters, setFilters] = useState({
    materials: [] as string[],
    colors: [] as string[],
    sizes: [] as string[],
    priceRange: [0, 25000]
  });

  const materials = ['Кашемир', 'Ангора', 'Мериносовая шерсть', 'Альпака'];
  const colors = ['Чёрный', 'Белый', 'Золотой', 'Серый', 'Бежевый', 'Рыжий'];
  const sizes = ['S', 'M', 'L'];

  const filteredProducts = products.filter(product => {
    const materialMatch = filters.materials.length === 0 || filters.materials.includes(product.material);
    const colorMatch = filters.colors.length === 0 || filters.colors.includes(product.color);
    const sizeMatch = filters.sizes.length === 0 || filters.sizes.includes(product.size);
    const priceMatch = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];
    return materialMatch && colorMatch && sizeMatch && priceMatch;
  });

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.id === productId ? { ...item, quantity } : item))
    );
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const toggleFilter = (type: 'materials' | 'colors' | 'sizes', value: string) => {
    setFilters(prev => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter((v: string) => v !== value)
        : [...prev[type], value]
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        cart={cart}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        cartTotal={cartTotal}
      />

      {activeSection === 'home' && (
        <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-muted to-background" />
          <div className="relative z-10 text-center space-y-6 px-4 animate-fade-in">
            <h2 className="text-6xl md:text-7xl font-serif font-bold leading-tight">
              Роскошь для<br />
              <span className="text-gold">вашей кошки</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Парики премиум-класса из натуральных материалов.<br />
              Элегантность, вдохновлённая древним Египтом.
            </p>
            <Button
              size="lg"
              className="bg-gold hover:bg-gold-dark text-primary mt-8"
              onClick={() => setActiveSection('catalog')}
            >
              Смотреть коллекцию
            </Button>
          </div>
        </section>
      )}

      {activeSection === 'catalog' && (
        <CatalogSection
          filteredProducts={filteredProducts}
          filters={filters}
          toggleFilter={toggleFilter}
          setFilters={setFilters}
          addToCart={addToCart}
          materials={materials}
          colors={colors}
          sizes={sizes}
        />
      )}

      {activeSection === 'about' && <AboutSection />}

      {activeSection === 'contacts' && <ContactsSection />}

      <footer className="border-t mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-sm text-muted-foreground">
            <p className="font-serif">© 2024 Египетский Мех. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
