import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';

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
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-3xl font-serif font-bold">
            <span className="text-gold">Египетский</span> Мех
          </h1>
          
          <nav className="hidden md:flex items-center gap-8">
            {['home', 'catalog', 'about', 'contacts'].map(section => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`text-sm uppercase tracking-wider transition-colors hover:text-gold ${
                  activeSection === section ? 'text-gold' : 'text-muted-foreground'
                }`}
              >
                {section === 'home' && 'Главная'}
                {section === 'catalog' && 'Каталог'}
                {section === 'about' && 'О бренде'}
                {section === 'contacts' && 'Контакты'}
              </button>
            ))}
          </nav>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="relative">
                <Icon name="ShoppingBag" size={20} />
                {cart.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center bg-gold text-primary">
                    {cart.reduce((sum, item) => sum + item.quantity, 0)}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-lg">
              <SheetHeader>
                <SheetTitle className="font-serif text-2xl">Корзина</SheetTitle>
              </SheetHeader>
              <div className="mt-8 space-y-4">
                {cart.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">Корзина пуста</p>
                ) : (
                  <>
                    {cart.map(item => (
                      <Card key={item.id} className="p-4">
                        <div className="flex gap-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded"
                          />
                          <div className="flex-1">
                            <h3 className="font-serif font-semibold">{item.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {item.price.toLocaleString('ru-RU')} ₽
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <Button
                                size="icon"
                                variant="outline"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              >
                                <Icon name="Minus" size={14} />
                              </Button>
                              <span className="text-sm font-medium w-8 text-center">
                                {item.quantity}
                              </span>
                              <Button
                                size="icon"
                                variant="outline"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Icon name="Plus" size={14} />
                              </Button>
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-8 w-8 ml-auto"
                                onClick={() => removeFromCart(item.id)}
                              >
                                <Icon name="Trash2" size={14} />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                    <Separator />
                    <div className="flex justify-between items-center text-lg font-semibold">
                      <span>Итого:</span>
                      <span className="text-gold">{cartTotal.toLocaleString('ru-RU')} ₽</span>
                    </div>
                    <Button className="w-full bg-gold hover:bg-gold-dark text-primary">
                      Оформить заказ
                    </Button>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

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
        <section className="container mx-auto px-4 py-12">
          <h2 className="text-4xl font-serif font-bold mb-8">Каталог</h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            <aside className="space-y-6">
              <div>
                <h3 className="font-serif text-lg font-semibold mb-4">Материал</h3>
                <div className="space-y-2">
                  {materials.map(material => (
                    <label key={material} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.materials.includes(material)}
                        onChange={() => toggleFilter('materials', material)}
                        className="accent-gold"
                      />
                      <span className="text-sm">{material}</span>
                    </label>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-serif text-lg font-semibold mb-4">Цвет</h3>
                <div className="space-y-2">
                  {colors.map(color => (
                    <label key={color} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.colors.includes(color)}
                        onChange={() => toggleFilter('colors', color)}
                        className="accent-gold"
                      />
                      <span className="text-sm">{color}</span>
                    </label>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-serif text-lg font-semibold mb-4">Размер</h3>
                <div className="space-y-2">
                  {sizes.map(size => (
                    <label key={size} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.sizes.includes(size)}
                        onChange={() => toggleFilter('sizes', size)}
                        className="accent-gold"
                      />
                      <span className="text-sm">{size}</span>
                    </label>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-serif text-lg font-semibold mb-4">Цена</h3>
                <Slider
                  min={0}
                  max={25000}
                  step={500}
                  value={filters.priceRange}
                  onValueChange={(value) => setFilters(prev => ({ ...prev, priceRange: value }))}
                  className="my-4"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{filters.priceRange[0].toLocaleString('ru-RU')} ₽</span>
                  <span>{filters.priceRange[1].toLocaleString('ru-RU')} ₽</span>
                </div>
              </div>
            </aside>

            <div className="md:col-span-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product, index) => (
                <Card
                  key={product.id}
                  className="overflow-hidden group hover:shadow-lg transition-all duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative overflow-hidden aspect-square">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 space-y-3">
                    <h3 className="text-xl font-serif font-semibold">{product.name}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      <Badge variant="outline">{product.material}</Badge>
                      <Badge variant="outline">{product.color}</Badge>
                      <Badge variant="outline">{product.size}</Badge>
                    </div>
                    <div className="flex items-center justify-between pt-4">
                      <span className="text-2xl font-serif font-bold text-gold">
                        {product.price.toLocaleString('ru-RU')} ₽
                      </span>
                      <Button
                        onClick={() => addToCart(product)}
                        className="bg-gold hover:bg-gold-dark text-primary"
                      >
                        <Icon name="ShoppingBag" size={18} />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {activeSection === 'about' && (
        <section className="container mx-auto px-4 py-16 max-w-4xl">
          <div className="space-y-8 animate-fade-in">
            <h2 className="text-5xl font-serif font-bold text-center mb-12">О бренде</h2>
            
            <div className="prose prose-lg mx-auto">
              <p className="text-xl leading-relaxed text-muted-foreground">
                <span className="text-gold font-serif text-2xl">Египетский Мех</span> — это бренд роскошных париков для сфинксов и других лысых пород кошек, созданный с любовью к древнеегипетской эстетике и современному дизайну.
              </p>
              
              <Separator className="my-8" />
              
              <div className="grid md:grid-cols-2 gap-8 my-12">
                <Card className="p-6 text-center">
                  <Icon name="Sparkles" size={40} className="mx-auto mb-4 text-gold" />
                  <h3 className="font-serif text-xl font-semibold mb-2">Премиум материалы</h3>
                  <p className="text-sm text-muted-foreground">
                    Только натуральные волокна: кашемир, ангора, альпака
                  </p>
                </Card>
                
                <Card className="p-6 text-center">
                  <Icon name="Heart" size={40} className="mx-auto mb-4 text-gold" />
                  <h3 className="font-serif text-xl font-semibold mb-2">Ручная работа</h3>
                  <p className="text-sm text-muted-foreground">
                    Каждый парик создаётся мастерами вручную
                  </p>
                </Card>
              </div>
              
              <p className="text-lg leading-relaxed">
                Мы верим, что каждая кошка заслуживает королевской заботы. Наши парики не только защищают чувствительную кожу сфинксов от холода, но и подчёркивают их уникальную красоту и грацию.
              </p>
              
              <p className="text-lg leading-relaxed">
                Вдохновение для коллекций мы черпаем из искусства Древнего Египта, где кошки почитались как священные животные. Каждая модель носит имя египетских божеств и правителей.
              </p>
            </div>
          </div>
        </section>
      )}

      {activeSection === 'contacts' && (
        <section className="container mx-auto px-4 py-16 max-w-2xl">
          <div className="space-y-8 animate-fade-in">
            <h2 className="text-5xl font-serif font-bold text-center mb-12">Контакты</h2>
            
            <Card className="p-8 space-y-6">
              <div className="flex items-start gap-4">
                <Icon name="MapPin" size={24} className="text-gold mt-1" />
                <div>
                  <h3 className="font-serif text-lg font-semibold mb-1">Адрес</h3>
                  <p className="text-muted-foreground">
                    г. Москва, ул. Пирамидная, д. 7<br />
                    ТЦ "Сфинкс", 3 этаж
                  </p>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex items-start gap-4">
                <Icon name="Phone" size={24} className="text-gold mt-1" />
                <div>
                  <h3 className="font-serif text-lg font-semibold mb-1">Телефон</h3>
                  <p className="text-muted-foreground">+7 (495) 123-45-67</p>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex items-start gap-4">
                <Icon name="Mail" size={24} className="text-gold mt-1" />
                <div>
                  <h3 className="font-serif text-lg font-semibold mb-1">Email</h3>
                  <p className="text-muted-foreground">info@egyptian-fur.ru</p>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex items-start gap-4">
                <Icon name="Clock" size={24} className="text-gold mt-1" />
                <div>
                  <h3 className="font-serif text-lg font-semibold mb-1">Режим работы</h3>
                  <p className="text-muted-foreground">
                    Пн-Пт: 10:00 — 20:00<br />
                    Сб-Вс: 11:00 — 19:00
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </section>
      )}

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