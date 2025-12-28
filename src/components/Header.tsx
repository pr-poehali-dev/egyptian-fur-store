import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
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

interface HeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  cart: CartItem[];
  updateQuantity: (productId: number, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  cartTotal: number;
}

export default function Header({
  activeSection,
  setActiveSection,
  cart,
  updateQuantity,
  removeFromCart,
  cartTotal
}: HeaderProps) {
  return (
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
  );
}
