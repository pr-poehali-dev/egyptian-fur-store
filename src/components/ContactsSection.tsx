import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

export default function ContactsSection() {
  return (
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
  );
}
