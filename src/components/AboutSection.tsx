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

          <Separator className="my-12" />

          <h3 className="text-3xl font-serif font-bold text-center mb-8">Наша команда</h3>

          <div className="grid md:grid-cols-3 gap-8 my-8">
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-gold-light to-gold flex items-center justify-center">
                <Icon name="Crown" size={40} className="text-primary" />
              </div>
              <h4 className="font-serif text-xl font-semibold mb-2">Амира Хатеп</h4>
              <p className="text-sm text-gold mb-3">Основатель и дизайнер</p>
              <p className="text-sm text-muted-foreground">
                15 лет опыта в fashion-индустрии. Создала концепцию бренда, вдохновившись любовью к кошкам и египетской культуре.
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-gold-light to-gold flex items-center justify-center">
                <Icon name="Scissors" size={40} className="text-primary" />
              </div>
              <h4 className="font-serif text-xl font-semibold mb-2">Дмитрий Волков</h4>
              <p className="text-sm text-gold mb-3">Мастер-портной</p>
              <p className="text-sm text-muted-foreground">
                Потомственный портной с 20-летним стажем. Вручную создаёт каждый парик, учитывая анатомию и комфорт питомца.
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-gold-light to-gold flex items-center justify-center">
                <Icon name="Palette" size={40} className="text-primary" />
              </div>
              <h4 className="font-serif text-xl font-semibold mb-2">Елена Соколова</h4>
              <p className="text-sm text-gold mb-3">Стилист-колорист</p>
              <p className="text-sm text-muted-foreground">
                Специалист по подбору цветов и текстур. Помогает каждому клиенту найти идеальный образ для их любимца.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}