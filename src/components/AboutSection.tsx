import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

export default function AboutSection() {
  return (
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
  );
}
