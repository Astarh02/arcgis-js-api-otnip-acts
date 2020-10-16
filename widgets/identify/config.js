define(function(){
    var identifyfieldSet = {
        projectsClouds : [
            "OBJECTID",
            "MGGT_NUM",
            "Номер ОТНиП"
        ],
        Gorlovina : [
            "Тип",
            "Наличие перепада",
            "Статус объекта",
            "Номер ССП",
            "Номер ГК",
            "Номер водовыпуска",
            "Номер ОС",
            "Номер ГТС",
            "Номер пруда",
            "Номер НС",
            "Номер СПП",
            "Отметка дн",
            "Глубин",
            "ЭГТР",
            "Состояние",
            "Расположение",
            "Оператор сети",
            "Сторонняя эксплуатирующая организация",
            "Стороняя эксплуатирующая организация",
            "Дата постройки",
            "Комментарий",
            "Коментарий",
            "Восстановительные работы",
            "REPAIR",
            "Деление потоков",
            "Особенности конструкции",
            "Распределительные устройств",
            "Номер камеры коллектор",
            "Номер документа",
            "Кадастровый номер",
            "Кдастровый номер",
            "Номер приказа во временную эксплуатацию",
            "Номер приказа вов временную эксплуатацию",
            "Номер документа во временную эсплуатацию",
            "Дата приказа во временную эксплуатацию",
            "Дата приказа во временнную эксплуатацию",
            "Дата документа во временную эксплуатацию",
            "Дата приказа во временную",
            "Номер приказа в хозведение",
            "Дата приказа в хозведение",
            "Номер документа в хозведение",
            "Дата документа в хозведение",
            "Техническое заключение №",
            "Техническое задание №",
            "Заказ №",
            "№ ОТНиП",
            "№ МГГТ",
            "№ ДиАР",
            "БХ №",
            "СЗ №",
            "СЗ Дата",
            "Ликвидированно по:",
            "№ УКРиС",
            ],
            GTS : [
            "Уникальный идентификатор",
            "Идентификатор",
            "Тип",
            "Наличие перепада",
            "Статус объекта",
            "Номер ССП",
            "Номер ГК",
            "Номер водовыпуска",
            "Номер ОС",
            "Номер ГТС",
            "Номер пруда",
            "Номер НС",
            "Номер СПП",
            "Отметка дн",
            "Глубин",
            "ЭГТР",
            "Состояние",
            "Расположение",
            "Оператор сети",
            "Сторонняя эксплуатирующая организация",
            "Стороняя эксплуатирующая организация",
            "Дата постройки",
            "Комментарий",
            "Коментарий",
            "Восстановительные работы",
            "REPAIR",
            "Деление потоков",
            "Особенности конструкции",
            "Распределительные устройств",
            "Номер камеры коллектор",
            "Номер документа",
            "Кадастровый номер",
            "Кдастровый номер",
            "Номер приказа во временную эксплуатацию",
            "Номер приказа вов временную эксплуатацию",
            "Номер документа во временную эсплуатацию",
            "Дата приказа во временную эксплуатацию",
            "Дата приказа во временнную эксплуатацию",
            "Дата документа во временную эксплуатацию",
            "Дата приказа во временную",
            "Номер приказа в хозведение",
            "Дата приказа в хозведение",
            "Номер документа в хозведение",
            "Дата документа в хозведение",
            "Техническое заключение №",
            "Техническое задание №",
            "Заказ №",
            "№ ОТНиП",
            "№ МГГТ",
            "№ ДиАР",
            "БХ №",
            "СЗ №",
            "СЗ Дата",
            "Ликвидированно по:",
            "№ УКРиС",
            ],
            GTSPoly : [
            "Тип",
            "Наличие перепада",
            "Статус объекта",
            "Номер ССП",
            "Номер ГК",
            "Номер водовыпуска",
            "Номер ОС",
            "Номер ГТС",
            "Номер пруда",
            "Номер НС",
            "Номер СПП",
            "Отметка дн",
            "Глубин",
            "ЭГТР",
            "Состояние",
            "Расположение",
            "Оператор сети",
            "Сторонняя эксплуатирующая организация",
            "Стороняя эксплуатирующая организация",
            "Дата постройки",
            "Комментарий",
            "Коментарий",
            "Восстановительные работы",
            "REPAIR",
            "Деление потоков",
            "Особенности конструкции",
            "Распределительные устройств",
            "Номер камеры коллектор",
            "Номер документа",
            "Кадастровый номер",
            "Кдастровый номер",
            "Номер приказа во временную эксплуатацию",
            "Номер приказа вов временную эксплуатацию",
            "Номер документа во временную эсплуатацию",
            "Дата приказа во временную эксплуатацию",
            "Дата приказа во временнную эксплуатацию",
            "Дата документа во временную эксплуатацию",
            "Дата приказа во временную",
            "Номер приказа в хозведение",
            "Дата приказа в хозведение",
            "Номер документа в хозведение",
            "Дата документа в хозведение",
            "Техническое заключение №",
            "Техническое задание №",
            "Заказ №",
            "№ ОТНиП",
            "№ МГГТ",
            "№ ДиАР",
            "БХ №",
            "СЗ №",
            "СЗ Дата",
            "Ликвидированно по:",
            "№ УКРиС",
            ],
            NS : [
            "Тип",
            "Статус объекта",
            "Номер ССП",
            "Номер ГК",
            "Номер водовыпуска",
            "Номер ОС",
            "Номер ГТС",
            "Номер пруда",
            "Номер НС",
            "Номер СПП",
            "ЭГТР",
            "Состояние",
            "Оператор сети",
            "Сторонняя эксплуатирующая организация",
            "Стороняя эксплуатирующая организация",
            "Дата постройки",
            "Комментарий",
            "Коментарий",
            "Восстановительные работы",
            "REPAIR",
            "Номер документа",
            "Кадастровый номер",
            "Кдастровый номер",
            "Номер приказа во временную эксплуатацию",
            "Номер приказа вов временную эксплуатацию",
            "Номер документа во временную эсплуатацию",
            "Дата приказа во временную эксплуатацию",
            "Дата приказа во временнную эксплуатацию",
            "Дата документа во временную эксплуатацию",
            "Дата приказа во временную",
            "Номер приказа в хозведение",
            "Дата приказа в хозведение",
            "Номер документа в хозведение",
            "Дата документа в хозведение",
            "Техническое заключение №",
            "Техническое задание №",
            "Заказ №",
            "№ ОТНиП",
            "№ МГГТ",
            "№ ДиАР",
            "БХ №",
            "СЗ №",
            "СЗ Дата",
            "Ликвидированно по:",
            "№ УКРиС",
            ],
            NSPoly : [
            "Тип",
            "Статус объекта",
            "Номер ССП",
            "Номер ГК",
            "Номер водовыпуска",
            "Номер ОС",
            "Номер ГТС",
            "Номер пруда",
            "Номер НС",
            "Номер СПП",
            "ЭГТР",
            "Состояние",
            "Оператор сети",
            "Сторонняя эксплуатирующая организация",
            "Стороняя эксплуатирующая организация",
            "Дата постройки",
            "Комментарий",
            "Коментарий",
            "Восстановительные работы",
            "REPAIR",
            "Номер документа",
            "Кадастровый номер",
            "Кдастровый номер",
            "Номер приказа во временную эксплуатацию",
            "Номер приказа вов временную эксплуатацию",
            "Номер документа во временную эсплуатацию",
            "Дата приказа во временную эксплуатацию",
            "Дата приказа во временнную эксплуатацию",
            "Дата документа во временную эксплуатацию",
            "Дата приказа во временную",
            "Номер приказа в хозведение",
            "Дата приказа в хозведение",
            "Номер документа в хозведение",
            "Дата документа в хозведение",
            "Техническое заключение №",
            "Техническое задание №",
            "Заказ №",
            "№ ОТНиП",
            "№ МГГТ",
            "№ ДиАР",
            "БХ №",
            "СЗ №",
            "СЗ Дата",
            "Ликвидированно по:",
            "№ УКРиС",
            ],
            OS : [
            "Тип",
            "Статус объекта",
            "Номер ССП",
            "Номер ГК",
            "Номер водовыпуска",
            "Номер ОС",
            "Номер ГТС",
            "Номер пруда",
            "Номер НС",
            "Номер СПП",
            "Площадь зеркал",
            "Площадь зерка",
            "Расчетный расхо",
            "ЭГТР",
            "Состояние",
            "Оператор сети",
            "Сторонняя эксплуатирующая организация",
            "Стороняя эксплуатирующая организация",
            "Дата постройки",
            "Комментарий",
            "Коментарий",
            "Восстановительные работы",
            "REPAIR",
            "Отметка дн",
            "Периметр ча",
            "Объем зерка",
            "Объем зеркал",
            "Площадь водосборного бассейн",
            "Площадь землеотвод",
            "Площадь иловых площадо",
            "Номер документа",
            "Кадастровый номер",
            "Кдастровый номер",
            "Номер приказа во временную эксплуатацию",
            "Номер приказа вов временную эксплуатацию",
            "Номер документа во временную эсплуатацию",
            "Дата приказа во временную эксплуатацию",
            "Дата приказа во временнную эксплуатацию",
            "Дата документа во временную эксплуатацию",
            "Дата приказа во временную",
            "Номер приказа в хозведение",
            "Дата приказа в хозведение",
            "Номер документа в хозведение",
            "Дата документа в хозведение",
            "Техническое заключение №",
            "Техническое задание №",
            "Заказ №",
            "№ ОТНиП",
            "№ МГГТ",
            "№ ДиАР",
            "БХ №",
            "СЗ №",
            "СЗ Дата",
            "Ликвидированно по:",
            "№ УКРиС",
            ],
            OSPoly : [
            "Тип",
            "Статус объекта",
            "Номер ССП",
            "Номер ГК",
            "Номер водовыпуска",
            "Номер ОС",
            "Номер ГТС",
            "Номер пруда",
            "Номер НС",
            "Номер СПП",
            "Площадь зеркал",
            "Площадь зерка",
            "Расчетный расхо",
            "ЭГТР",
            "Состояние",
            "Оператор сети",
            "Сторонняя эксплуатирующая организация",
            "Стороняя эксплуатирующая организация",
            "Дата постройки",
            "Комментарий",
            "Коментарий",
            "Восстановительные работы",
            "REPAIR",
            "Отметка дн",
            "Периметр ча",
            "Объем зерка",
            "Объем зеркал",
            "Площадь водосборного бассейн",
            "Площадь землеотвод",
            "Площадь иловых площадо",
            "Номер документа",
            "Кадастровый номер",
            "Кдастровый номер",
            "Номер приказа во временную эксплуатацию",
            "Номер приказа вов временную эксплуатацию",
            "Номер документа во временную эсплуатацию",
            "Дата приказа во временную эксплуатацию",
            "Дата приказа во временнную эксплуатацию",
            "Дата документа во временную эксплуатацию",
            "Дата приказа во временную",
            "Номер приказа в хозведение",
            "Дата приказа в хозведение",
            "Номер документа в хозведение",
            "Дата документа в хозведение",
            "Техническое заключение №",
            "Техническое задание №",
            "Заказ №",
            "№ ОТНиП",
            "№ МГГТ",
            "№ ДиАР",
            "БХ №",
            "СЗ №",
            "СЗ Дата",
            "Ликвидированно по:",
            "№ УКРиС",
            ],
            Prudi : [
            "Назначение",
            "Статус объекта",
            "Номер ССП",
            "Номер ГК",
            "Номер водовыпуска",
            "Номер ОС",
            "Номер ГТС",
            "Номер пруда",
            "Номер НС",
            "Номер СПП",
            "Площадь зеркал",
            "Площадь зерка",
            "Фактическая площадь зеркал",
            "Наличие подпитки",
            "Наличие водосборов",
            "ЭГТР",
            "Состояние",
            "Оператор сети",
            "Сторонняя эксплуатирующая организация",
            "Стороняя эксплуатирующая организация",
            "Комментарий",
            "Коментарий",
            "Восстановительные работы",
            "REPAIR",
            "Разрешение на купание",
            "Периметр",
            "Перимет",
            "Площадь откосо",
            "Объем вод",
            "Объем потер",
            "Кратность водообмена, раз/год",
            "Кратность водообмен",
            "Фактический объем обводнени",
            "Обваловка берегов",
            "Источник обводнения",
            "Номер документа",
            "Кадастровый номер",
            "Кдастровый номер",
            "Номер приказа во временную эксплуатацию",
            "Номер приказа вов временную эксплуатацию",
            "Номер документа во временную эсплуатацию",
            "Дата приказа во временную эксплуатацию",
            "Дата приказа во временнную эксплуатацию",
            "Дата документа во временную эксплуатацию",
            "Дата приказа во временную",
            "Номер приказа в хозведение",
            "Дата приказа в хозведение",
            "Номер документа в хозведение",
            "Дата документа в хозведение",
            "Техническое заключение №",
            "Техническое задание №",
            "Заказ №",
            "№ ОТНиП",
            "№ МГГТ",
            "№ ДиАР",
            "СЗ №",
            "СЗ Дата",
            "Ликвидированно по:",
            "№ УКРиС",
            ],
            PrudiPoly : [
            "Назначение",
            "Статус объекта",
            "Номер ССП",
            "Номер ГК",
            "Номер водовыпуска",
            "Номер ОС",
            "Номер ГТС",
            "Номер пруда",
            "Номер НС",
            "Номер СПП",
            "Площадь зеркал",
            "Площадь зерка",
            "Фактическая площадь зеркал",
            "Наличие подпитки",
            "Наличие водосборов",
            "ЭГТР",
            "Состояние",
            "Оператор сети",
            "Сторонняя эксплуатирующая организация",
            "Стороняя эксплуатирующая организация",
            "Дата постройки",
            "Комментарий",
            "Коментарий",
            "Восстановительные работы",
            "REPAIR",
            "Разрешение на купание",
            "Периметр",
            "Перимет",
            "Площадь откосо",
            "Объем вод",
            "Объем потер",
            "Кратность водообмена, раз/год",
            "Кратность водообмен",
            "Фактический объем обводнени",
            "Обваловка берегов",
            "Источник обводнения",
            "Гидравлическая связь",
            "Номер документа",
            "Кадастровый номер",
            "Кдастровый номер",
            "Номер приказа во временную эксплуатацию",
            "Номер приказа вов временную эксплуатацию",
            "Номер документа во временную эсплуатацию",
            "Дата приказа во временную эксплуатацию",
            "Дата приказа во временнную эксплуатацию",
            "Дата документа во временную эксплуатацию",
            "Дата приказа во временную",
            "Номер приказа в хозведение",
            "Дата приказа в хозведение",
            "Номер документа в хозведение",
            "Дата документа в хозведение",
            "Техническое заключение №",
            "Техническое задание №",
            "Заказ №",
            "№ ОТНиП",
            "№ МГГТ",
            "№ ДиАР",
            "СЗ №",
            "СЗ Дата",
            "Ликвидированно по:",
            "№ УКРиС",
            ],
            SSP : [
            "Тип",
            "Статус объекта",
            "Номер ССП",
            "Номер ГК",
            "Номер водовыпуска",
            "Номер ОС",
            "Номер ГТС",
            "Номер пруда",
            "Номер НС",
            "Номер СПП",
            "Объем суточного приема снега, м²",
            "Объем суточного приема снег",
            "ЭГТР",
            "Состояние",
            "Оператор сети",
            "Сторонняя эксплуатирующая организация",
            "Стороняя эксплуатирующая организация",
            "Дата постройки",
            "Комментарий",
            "Коментарий",
            "Восстановительные работы",
            "REPAIR",
            "Номер документа",
            "Кадастровый номер",
            "Кдастровый номер",
            "Номер приказа во временную эксплуатацию",
            "Номер приказа вов временную эксплуатацию",
            "Номер документа во временную эсплуатацию",
            "Дата приказа во временную эксплуатацию",
            "Дата приказа во временнную эксплуатацию",
            "Дата документа во временную эксплуатацию",
            "Дата приказа во временную",
            "Номер приказа в хозведение",
            "Дата приказа в хозведение",
            "Номер документа в хозведение",
            "Дата документа в хозведение",
            "Техническое заключение №",
            "Техническое задание №",
            "Заказ №",
            "№ ОТНиП",
            "№ МГГТ",
            "№ ДиАР",
            "СЗ №",
            "СЗ Дата",
            "Ликвидированно по:",
            "№ УКРиС",
            ],
            SSPPoly : [
            "Тип",
            "Статус объекта",
            "Номер ССП",
            "Номер ГК",
            "Номер водовыпуска",
            "Номер ОС",
            "Номер ГТС",
            "Номер пруда",
            "Номер НС",
            "Номер СПП",
            "Объем суточного приема снега, м²",
            "Объем суточного приема снег",
            "ЭГТР",
            "Состояние",
            "Оператор сети",
            "Сторонняя эксплуатирующая организация",
            "Стороняя эксплуатирующая организация",
            "Дата постройки",
            "Комментарий",
            "Коментарий",
            "Восстановительные работы",
            "REPAIR",
            "Номер документа",
            "Кадастровый номер",
            "Кдастровый номер",
            "Номер приказа во временную эксплуатацию",
            "Номер приказа вов временную эксплуатацию",
            "Номер документа во временную эсплуатацию",
            "Дата приказа во временную эксплуатацию",
            "Дата приказа во временнную эксплуатацию",
            "Дата документа во временную эксплуатацию",
            "Дата приказа во временную",
            "Номер приказа в хозведение",
            "Дата приказа в хозведение",
            "Номер документа в хозведение",
            "Дата документа в хозведение",
            "Техническое заключение №",
            "Техническое задание №",
            "Заказ №",
            "№ ОТНиП",
            "№ МГГТ",
            "№ ДиАР",
            "СЗ №",
            "СЗ Дата",
            "Ликвидированно по:",
            "№ УКРиС",
            ],
            SYS : [
            "Уникальный идентификатор",
            "Идентификатор",
            "Тип",
            "Материал трубы",
            "Материал трубы, по СЗ",
            "Учетная длин",
            "Форма сечения",
            "Размер сечени",
            "Обойма",
            "ЭГТР",
            "Состояние",
            "Оператор сети",
            "Сторонняя эксплуатирующая организация",
            "Стороняя эксплуатирующая организация",
            "Дата постройки",
            "Комментарий",
            "Коментарий",
            "Восстановительные работы",
            "REPAIR",
            "Тип трубы",
            "Глубина заложения верхней точки труб",
            "Отметка лотка нижней точки труб",
            "Отметка лотка нижней точки земл",
            "Отметка лотка нижней точки трубы, м",
            "Глубина заложения нижней точки труб",
            "Номер документа",
            "Кадастровый номер",
            "Кдастровый номер",
            "Номер приказа во временную эксплуатацию",
            "Номер приказа вов временную эксплуатацию",
            "Номер документа во временную эсплуатацию",
            "Дата приказа во временную эксплуатацию",
            "Дата приказа во временнную эксплуатацию",
            "Дата документа во временную эксплуатацию",
            "Дата приказа во временную",
            "Номер приказа в хозведение",
            "Дата приказа в хозведение",
            "Номер документа в хозведение",
            "Дата документа в хозведение",
            "Техническое заключение №",
            "Техническое задание №",
            "Заказ №",
            "№ ОТНиП",
            "№ МГГТ",
            "№ ДиАР",
            "БХ №",
            "СЗ №",
            "СЗ Дата",
            "Ликвидированно по:",
            "№ УКРиС",
            ],
            SysOthers : [
            "Ти",
            "Тип сети",
            "Материал трубы",
            "Учетная длин",
            "Форма сечения",
            "Размер сечени",
            "Состояние",
            "Оператор сети",
            "Комментарий",
            "Коментарий",
            "Тип трубы",
            "Глубина заложения верхней точки труб",
            "Отметка лотка нижней точки труб",
            "Отметка лотка нижней точки земл",
            "Отметка лотка нижней точки трубы, м",
            "Глубина заложения нижней точки труб",
            "Номер документа",
            "Кадастровый номер",
            "Кдастровый номер",
            "Техническое заключение №",
            "Техническое задание №",
            "Заказ №",
            "№ ОТНиП",
            "№ МГГТ",
            "№ ДиАР",
            "СЗ №",
            "СЗ Дата",
            "Ликвидированно по:",
            "№ УКРиС",
            ],
            Usly : [
            "Тип",
            "Наличие перепада",
            "Номер ССП",
            "Номер ГК",
            "Номер водовыпуска",
            "Номер ОС",
            "Номер ГТС",
            "Номер пруда",
            "Номер НС",
            "Номер СПП",
            "Отметка дн",
            "Глубин",
            "ЭГТР",
            "Состояние",
            "Статус объекта",
            "Оператор сети",
            "Сторонняя эксплуатирующая организация",
            "Стороняя эксплуатирующая организация",
            "Дата постройки",
            "Комментарий",
            "Коментарий",
            "Восстановительные работы",
            "REPAIR",
            "Номер документа",
            "Кадастровый номер",
            "Кдастровый номер",
            "Номер приказа во временную эксплуатацию",
            "Номер приказа вов временную эксплуатацию",
            "Номер документа во временную эсплуатацию",
            "Дата приказа во временную эксплуатацию",
            "Дата приказа во временнную эксплуатацию",
            "Дата документа во временную эксплуатацию",
            "Дата приказа во временную",
            "Номер приказа в хозведение",
            "Дата приказа в хозведение",
            "Номер документа в хозведение",
            "Дата документа в хозведение",
            "Техническое заключение №",
            "Техническое задание №",
            "Заказ №",
            "№ ОТНиП",
            "№ МГГТ",
            "№ ДиАР",
            "БХ №",
            "СЗ №",
            "СЗ Дата",
            "Ликвидированно по:",
            "№ УКРиС",
            ],
            UslyOthers : [
            "Ти",
            "Тип сети",
            "Тип",
            "Номер ССП",
            "Номер ГК",
            "Номер водовыпуска",
            "Номер ОС",
            "Номер ГТС",
            "Номер пруда",
            "Номер НС",
            "Номер СПП",
            "ЭГТР",
            "Состояние",
            "Статус объекта",
            "Оператор сети",
            "Комментарий",
            "Коментарий",
            "Восстановительные работы",
            "REPAIR",
            "Отметка дн",
            "Глубин",
            "Номер документа",
            "Кадастровый номер",
            "Кдастровый номер",
            "Техническое заключение №",
            "Техническое задание №",
            "Заказ №",
            "№ ОТНиП",
            "№ МГГТ",
            "№ ДиАР",
            "СЗ №",
            "СЗ Дата",
            "Ликвидированно по:",
            "№ УКРиС",
            ],
            Vod : [
            "Уникальный идентификатор",
            "Идентификатор",
            "Тип",
            "Наличие перепада",
            "Номер ССП",
            "Номер ГК",
            "Номер водовыпуска",
            "Номер ОС",
            "Номер ГТС",
            "Номер пруда",
            "Номер НС",
            "Номер СПП",
            "Отметка дн",
            "Глубин",
            "ЭГТР",
            "Состояние",
            "Расположение",
            "Оператор сети",
            "Сторонняя эксплуатирующая организация",
            "Стороняя эксплуатирующая организация",
            "Дата постройки",
            "Комментарий",
            "Коментарий",
            "Восстановительные работы",
            "REPAIR",
            "Наличие решетки",
            "Решение",
            "Наличие решения",
            "Дата выдачи решения",
            "Номер решения",
            "Водовыпуск в",
            "Водовыпуск из",
            "НП",
            "Площадь водосбора",
            "Номер камеры коллектор",
            "Номер документа",
            "Кадастровый номер",
            "Кдастровый номер",
            "Номер приказа во временную эксплуатацию",
            "Номер приказа вов временную эксплуатацию",
            "Номер документа во временную эсплуатацию",
            "Дата приказа во временную эксплуатацию",
            "Дата приказа во временнную эксплуатацию",
            "Дата документа во временную эксплуатацию",
            "Дата приказа во временную",
            "Номер приказа в хозведение",
            "Дата приказа в хозведение",
            "Номер документа в хозведение",
            "Дата документа в хозведение",
            "Техническое заключение №",
            "Техническое задание №",
            "Заказ №",
            "№ ОТНиП",
            "№ МГГТ",
            "№ ДиАР",
            "БХ №",
            "СЗ №",
            "СЗ Дата",
            "Ликвидированно по:",
            "№ УКРиС",
            ],
            VodPoly : [
            "Тип",
            "Наличие перепада",
            "Номер ССП",
            "Номер ГК",
            "Номер водовыпуска",
            "Номер ОС",
            "Номер ГТС",
            "Номер пруда",
            "Номер НС",
            "Номер СПП",
            "Отметка дн",
            "Глубин",
            "ЭГТР",
            "Состояние",
            "Расположение",
            "Оператор сети",
            "Сторонняя эксплуатирующая организация",
            "Стороняя эксплуатирующая организация",
            "Дата постройки",
            "Комментарий",
            "Коментарий",
            "Восстановительные работы",
            "REPAIR",
            "Наличие решетки",
            "Решение",
            "Наличие решения",
            "Дата выдачи решения",
            "Номер решения",
            "Водовыпуск в",
            "Водовыпуск из",
            "НП",
            "Площадь водосбора",
            "Номер камеры коллектор",
            "Номер документа",
            "Кадастровый номер",
            "Кдастровый номер",
            "Номер приказа во временную эксплуатацию",
            "Номер приказа вов временную эксплуатацию",
            "Номер документа во временную эсплуатацию",
            "Дата приказа во временную эксплуатацию",
            "Дата приказа во временнную эксплуатацию",
            "Дата документа во временную эксплуатацию",
            "Дата приказа во временную",
            "Номер приказа в хозведение",
            "Дата приказа в хозведение",
            "Номер документа в хозведение",
            "Дата документа в хозведение",
            "Техническое заключение №",
            "Техническое задание №",
            "Заказ №",
            "№ ОТНиП",
            "№ МГГТ",
            "№ ДиАР",
            "БХ №",
            "СЗ №",
            "СЗ Дата",
            "Ликвидированно по:",
            "№ УКРиС",
            ]
    };
	return {
		identifyServices : {
            projectsClouds: {
                7 : identifyfieldSet.projectsClouds,
                actions : ["statistics", "filter"]
			},
			setibuild: {
				2 : identifyfieldSet.Gorlovina,
				3 : identifyfieldSet.GTSPoly,
				4 : identifyfieldSet.GTS,
				5 : identifyfieldSet.Usly,
				6 : identifyfieldSet.VodPoly,
				7 : identifyfieldSet.Vod,
				8 : identifyfieldSet.NSPoly,
				9 : identifyfieldSet.NS,
				10 : identifyfieldSet.SSPPoly,
				11 : identifyfieldSet.SSP,
				12 : identifyfieldSet.OSPoly,
				13 : identifyfieldSet.OS,
				14 : identifyfieldSet.OS,
				15 : identifyfieldSet.SYS,
				16 : identifyfieldSet.SYS,
				19 : identifyfieldSet.PrudiPoly,
				20 : identifyfieldSet.Prudi,
			},
			setimvs: {
				0 : identifyfieldSet.Gorlovina,
				1 : identifyfieldSet.GTSPoly,
				2 : identifyfieldSet.GTS,
				3 : identifyfieldSet.GTS,
				4 : identifyfieldSet.Usly,
				5 : identifyfieldSet.VodPoly,
				6 : identifyfieldSet.Vod,
				7 : identifyfieldSet.NSPoly,
				8 : identifyfieldSet.NS,
				9 : identifyfieldSet.SSPPoly,
				10 : identifyfieldSet.SSP,
				11 : identifyfieldSet.OSPoly,
				12 : identifyfieldSet.OS,
				13 : identifyfieldSet.SYS,
				14 : identifyfieldSet.SYS,
				22 : identifyfieldSet.PrudiPoly,
                23 : identifyfieldSet.Prudi,
                actions : ["statistics", "filter"]
			},
			setinodata: {
				0 : identifyfieldSet.Gorlovina,
				1 : identifyfieldSet.GTSPoly,
				2 : identifyfieldSet.GTS,
				3 : identifyfieldSet.GTS,
				4 : identifyfieldSet.Usly,
				5 : identifyfieldSet.VodPoly,
				6 : identifyfieldSet.Vod,
				7 : identifyfieldSet.NSPoly,
				8 : identifyfieldSet.NS,
				9 : identifyfieldSet.SSPPoly,
				10 : identifyfieldSet.SSP,
				11 : identifyfieldSet.OSPoly,
				12 : identifyfieldSet.OS,
				13 : identifyfieldSet.SYS,
				17 : identifyfieldSet.PrudiPoly,
				18 : identifyfieldSet.Prudi,
			},
			setiold: {
				1 : identifyfieldSet.Gorlovina,
				2 : identifyfieldSet.GTSPoly,
				3 : identifyfieldSet.GTS,
				4 : identifyfieldSet.Usly,
				5 : identifyfieldSet.VodPoly,
				6 : identifyfieldSet.Vod,
				7 : identifyfieldSet.NSPoly,
				8 : identifyfieldSet.NS,
				9 : identifyfieldSet.SSPPoly,
				10 : identifyfieldSet.SSP,
				11 : identifyfieldSet.OSPoly,
				12 : identifyfieldSet.OS,
				13 : identifyfieldSet.SYS,
				16 : identifyfieldSet.PrudiPoly,
				17 : identifyfieldSet.Prudi,
			},
			setiothers: {
				0 : identifyfieldSet.UslyOthers,
				1 : identifyfieldSet.SysOthers,
				2 : identifyfieldSet.Gorlovina,
				3 : identifyfieldSet.GTSPoly,
				4 : identifyfieldSet.GTS,
				5 : identifyfieldSet.Usly,
				6 : identifyfieldSet.VodPoly,
				7 : identifyfieldSet.Vod,
				8 : identifyfieldSet.NSPoly,
				9 : identifyfieldSet.NS,
				10 : identifyfieldSet.SSPPoly,
				11 : identifyfieldSet.SSP,
				12 : identifyfieldSet.OSPoly,
				13 : identifyfieldSet.OS,
				15 : identifyfieldSet.SYS,
				18 : identifyfieldSet.PrudiPoly,
				19 : identifyfieldSet.Prudi,
			},
			setiproject: {
				0 : identifyfieldSet.Gorlovina,
				1 : identifyfieldSet.GTSPoly,
				3 : identifyfieldSet.GTS,
				4 : identifyfieldSet.GTS,
				5 : identifyfieldSet.Usly,
				6 : identifyfieldSet.VodPoly,
				7 : identifyfieldSet.Vod,
				8 : identifyfieldSet.NSPoly,
				9 : identifyfieldSet.NS,
				10 : identifyfieldSet.SSPPoly,
				11 : identifyfieldSet.SSP,
				12 : identifyfieldSet.OSPoly,
				13 : identifyfieldSet.OS,
				14 : identifyfieldSet.SYS,
				16 : identifyfieldSet.SYS,
				17 : identifyfieldSet.SYS,
				18 : identifyfieldSet.SYS,
				19 : identifyfieldSet.PrudiPoly,
				20 : identifyfieldSet.Prudi,
				26 : identifyfieldSet.GTSPoly,
				28 : identifyfieldSet.GTS,
				29 : identifyfieldSet.GTS,
				30 : identifyfieldSet.Usly,
				31 : identifyfieldSet.VodPoly,
				32 : identifyfieldSet.Vod,
				33 : identifyfieldSet.NSPoly,
				34 : identifyfieldSet.NS,
				35 : identifyfieldSet.SSPPoly,
				36 : identifyfieldSet.SSP,
				37 : identifyfieldSet.OSPoly,
				38 : identifyfieldSet.OS,
				40 : identifyfieldSet.SYS,
				41 : identifyfieldSet.SYS,
				42 : identifyfieldSet.SYS,
				43 : identifyfieldSet.PrudiPoly,
				44 : identifyfieldSet.Prudi,
			},
			setiunfinished: {
				0 : identifyfieldSet.Gorlovina,
				1 : identifyfieldSet.GTSPoly,
				2 : identifyfieldSet.GTS,
				3 : identifyfieldSet.GTS,
				4 : identifyfieldSet.Usly,
				5 : identifyfieldSet.VodPoly,
				6 : identifyfieldSet.Vod,
				7 : identifyfieldSet.NSPoly,
				8 : identifyfieldSet.NS,
				9 : identifyfieldSet.SSPPoly,
				10 : identifyfieldSet.SSP,
				11 : identifyfieldSet.OSPoly,
				12 : identifyfieldSet.OS,
				13 : identifyfieldSet.SYS,
				16 : identifyfieldSet.PrudiPoly,
				17 : identifyfieldSet.Prudi,
			}
		},
		identifyParameters : {
			tolerance : 12,
			returnGeometry : true,
			layerOption : "visible"
		},
		highlightSymbols : {
			polygon : {type: "simple-fill", color: [255, 255, 255, 0.5], outline: {color: [0, 255, 255], width: 2}},
			polyline : {type: "simple-line", color: [0, 255, 255],  width: 2},
			point : {type: "simple-marker", color: [255, 255, 255, 0.5], outline: {color: [0, 255, 255], width: 2}}
        },
        actions : [
            {title: "Статистика", id: "statistics", className: "esri-icon-chart", customProperty: "Arina helps!"},
            {title: "Фильтр", id: "filter", className: "esri-icon-filter"}
        ]
	}
})