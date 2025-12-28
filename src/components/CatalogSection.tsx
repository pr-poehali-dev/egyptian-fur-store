import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
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

interface Filters {
  materials: string[];
  colors: string[];
  sizes: string[];
  priceRange: number[];
}

interface CatalogSectionProps {
  filteredProducts: Product[];
  filters: Filters;
  toggleFilter: (type: 'materials' | 'colors' | 'sizes', value: string) => void;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  addToCart: (product: Product) => void;
  materials: string[];
  colors: string[];
  sizes: string[];
}

export default function CatalogSection({
  filteredProducts,
  filters,
  toggleFilter,
  setFilters,
  addToCart,
  materials,
  colors,
  sizes
}: CatalogSectionProps) {
  return (
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
  );
}
