# App for thermostat BiZone | Приложение для терморегулятора БиЗон
# Changelog | Список изменений

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### ToDo
* add state of fan in climate mode when fan is set to AUTO | добавление состояния вентилятора в климат-контроле, когда вент. в АВТОматическом режиме
* add force OTA update via app | добавление принудительного OTA обновления через приложение

### Known issues | Известные ограничения
* visible slider's width and value depends on other parent component | размер и значение видимой части зависимых слайдеров может изменяться в зависимости от родительского компонента
* fast repeating sliding between days in programm mode (charts) may cause some lags (tests with 300 points in one-day list menu haven't been passed) | быстрое повторное переключение между днями в программном режиме (графики) может вызывать задержки (тесты с 300 точками в списке на один день)


#### 3.2.0
* !! добавлено графическое отображение статистики потребления энергии для каждого реле
*** Статистика ***
* выполнено объединение графиков для I и II зоны на один экран
* увеличена скорость обработки запросов
* добавлено цветовое определение линий графиков для I и II зоны
* добавлено цветовое определение линий графиков для режима климата
* добавлена зависимость отображения цвета от настройки реле (охлаждение или нагрев)
* добавлена возможность выбора интервала отображения

#### 3.1.1+ ()

* !!! глобальное обновление главного экрана в многозонном режиме
* !!! глобальное обновление всего меню настроек
* !! обновление дизайна главного экрана в режиме климата

* !! старт глобального обновления внутреннего механизма отправки данных
* - ускорена отправка пакетов
* - избежание ошибок неприменения части пакетов для программного режима

* обновление диапазонов температур для многозонного режима (+5 ... +45)
 - главный экран
 - настройка кнопок
 - программный режим (конфигурирование графиков обогрева)
* перенос настроек режимов кнопок в меню конфигурирования кнопок (выбор режима кнопки тапом по верхнему бару, настройка выбранного режима - в основном окне) 
* обновлен механизм работы выбора режима
* обновлена цветовая гамма, выполнено разделение гаммы на режимы, изменен тип иконок, корректировки цвета
* обновление механизма работы селектора скорости вентилятора
* обновление расчёта потребленной энергии на главном экране климата и многозонного режима (hardware's)
* обновление встроенных компонентов
* обновлен механизм отображения текцущего состояние во всплывающих окнах
* обновлено отображение текстового представления предельных значений в настройках кнопок в многозонном режиме, обновлен механизм пересчёта
* добавлен сброс настроек программного режима при изменении глобального режима (климат > зоны)
* добавлена поддержка системных жестов для iOS
* добавлено автоматическое закрытие для каждого всплывающего меню
* добавление статистики потребления электричества для каждого реле
* добавлена поддержка устройств с малым DPI (iPhone 5 || iPhone 12 mini)
* добавлена функция безопасного переключения глобального режима (выкл питание)
* добавлены дополнительные условия отображения/удаления элементов
* добавлены зависимости отображения UI для разных режимов в меню статистики
* добавлены отличные состояния для реле в режиме климата
* добавлена обратная совместимость встроенных компонентов для корректной работы со старыми версиями RN Panel
* выполнена оптимизация расположения элементов
* выполнена корректировка переводов
* выполнено глобальное обновление встроенных компонентов
* выполнено внесение дополнительных изменений для корректной работы обновленных встроенных компонентов
* исправлена ошибка, которая могла вызывать некорректное применение АВТО-режима вентилятора
* исправлена ошибка, которая могла вызывать самопроизвольное выключение вентилятора
* исправлена ошибка отображения настроек зоны
* исправлена ошибка отображения многозонного режима на главном экране при включении доп. меню
* исправлена ошибка выбора типа внешних датчиков, исправлено динамическое изменение размера селектора
* исправлена ошибка, которая отключала анимацию окна выбора режима при нажатии на маску
* исправлена ошибка, вызывавшая незадокументированную возможность использовать таймер в режиме климата (настройка)
* исправлен недочет, который мог вызвать чрезмерное кол-во отправленных пакетов (добавлен тайм) в меню конфигурирования кнопок
* исправлены ошибки, которые позволяли нажимать неактивные элементы, ограниченные программно, отключены действия данных элементов, отключена анимация нажатия


#### 2.0.5 release 1
* added interactive connection manuals via QR-code | добавлены интерактивные инструкции по подключению через QR-код
* added PUSH-notifications (Sensor error) | добавлены PUSH-уведомления (Ошибка датчика)

* added UI adpotation for iPhone 12 mini and etc screen sizes | выполнена адаптация UI для iPhone 12 mini и экранов с аналогичным разрешением
* added ignoring adaptive system fonts | добавлено игнорирование адаптивных системных шрифтов
* added handler for programm-timer mode on home screen | добавлен обработчик для режима программного таймера на главном экране
* updated some elements | обновлены некоторые элементы
* totally upgraded fonts | глобально обновлены шрифты
* fixed problems in Android swipe gesture handler | исправлены проблемы связанные с обработкой жестов смахивания на платформе Android
* fixed channel selector speed | исправлена скорость переключателя выбора канала

#### 2.0.4
* rebuild UI components without using states (workaround render problem) | перестроены UI компоненты без использования состояний (обход проблемы постоянного рендеринга)
* upgraded UI for charts | обновлен UI для графиков
* updated internal components | обновлены внутренние компоненты
* updated some design elements | обновлены некоторые элементы дизайна
* added swipable menu | добавлены смахивающиеся меню
* added swipe-switch day, if there's //free space on screen//no data for this day | добавлена возможность переключения между вкладками, когда на экране //есть свободное место//нет данных для выбранного дня
* added new params for scrolling depends on day data length | добавлены новые параметры прокрутки, которые зависят от данных текущего дня
* added optimizations | добавлены оптимизации
* added async cache support | добавлена поддержка асинхр. кеширования
* added preview for swipe menu | добавлен предпросмотр меню свайпа
* added auto-close swipe menu | добавлено автоматическое закрытие меню свайпа
* fixed performance problems with big data | исправлены проблемы производительности с большим объемом даных
* removed unnecessary functions and code | убран ненужный код и ненужные функции
#### Cloud func. | Функции облака
* updated all elements in programm-mode (charts) | обновлены все элементы в программном режиме (графики)
* better performance and faster getting big data in chart programm menu | улучшенная производительность и более быстрое получение больших объемов данных в графиках программного режима
* fixed problem with delete the last point in charts | исправлена проблема с удалением последней точки в графике
* fixed problems with 0 temp and 0 time in cache | исправлена проблема с 0 темп. и 0 врменем в кеше
#### Test components (won't be in release) | Тестовые компоненты (не войдут в релиз)
\* added new non-rerendering test component with ideal performance (climate/tempNAVI) | добавлен новый необновляющийся компонент с идеальной производительностью
\* !all test components may have bugs and they're not ready for using in prod

#### 2.0.3
* updated main settings menu design | обновлен дизайн домашней страницы настроек
* updated buttons configuration menu | обновлено меню настройки кнопок
* updated some UI-elements | обновлены некоторые UI-элементы
* added spinner indication when force updating states | добавлен спиннер при принудительном обновлении состояний
* added normal pull-up animations in popup | добавлена анимация вытягивания во всплывающих окнах
* some performance fixes | некоторые улучшения производительности
* fixed turning off spinner when data is null | исправлено выключение спиннера при пустой дате
* fixed Samsung's edge random swipe
* fixed bottom native navigator bar in charts (cross area) | исправлен нативный бар навигации в графиках (перекрытие)
* fixed problem when state of new point (when chart is totally empty) may not be visible before force update | исправлена ошибка, когда состояние новой точки (при добавлении с нуля, когда графики полностью пустые) может быть невидимым до принудительного обновления
#### Cloud func. | Функции облака
* fixed deleting points | исправлено удаление точек
* fixed bugs with editing and erasing new points and points wihtout id | исправлены ошибки с редактированием и удалением новых точек и точек без id
* !added adoptation for new data type in charts (hardware's firmware changes) | добавлена адаптация под новый тип данных графиков (изменения в прошивке устройства)
* added func for copying chart to next and to previous day | добавлена функция копирования графика на следующий и предыдущий день
* added func for erasing chart for one selected day | добавлена функция сброса/очистки графика для одного выбранного дня

#### 2.0.2
* added new design for charts menu | добавлен новый дизайн для графиков
* added swipeable buttons for chart's points | добавлены сдвигаемые кнопки для точек графика
* added tabs for every weekday | добавлены вкладки для каждого дня недели
* added today's displaying | добавлено отображение "сегодня"
* added popup for setting points | добавлено высплывающее окно для настройки точек
* added sorting for fixed points | добавлена сортировка для фиксированных значений
* added handling for zero programm mode in report temp state | добавлена обработка программного режима без данных для состояния программной температуры
* added FC exeption for null data in programm mode | добавлено исключение FC для программного режима без данных
* added performance optimizations for contol bar in Climate | добавлена оптимизация производительности для контроллера Климата
* added performance optimizations for every contol bar in Zones | добавлена оптимизация производительности для каждого контроллера Зон
* added UI performance optimizations for every switcher, expt channel selector | добавлена оптимизация производительности UI для каждого переключателя за искл. переключателя каналов
* added points countdown | добавлен обратный отсчет для оставшихся точек
* added new UI for empty tabs in programm mode | добавлен новый интерфейс для пустых вкладок в программном режиме
* fixed difference between non-dynamic fonts in settings via TY | исправлена разница между нединамическими шрифтами в настройсках при помощи TY
* fixed set temperature states when changes are made on the device | исправлено состояние установленной температуры при изменениях на устройстве
* fixed posibility to add more than 1 points on the same time | исправена возможность установить более одной точки на одно и то же время
* fixed -INT numbers on iOS selector | исправлен выбор -10 чисел в iOS
* fixed problem with displaying changed points in programm mode | исправлена проблема отображения измененных точек в программном режиме
#### Cloud func. | Функции облака
* increased cloud performance | увеличена производительность при обмене данными с облаком 
* added Christmas-mode | добавлен Рождественский режим
* added pos. real-time data (when it was changed) get | добавлена возможность получения данных (по изменениям) в режиме реального времени
* added func creation new point from 0 | добавлено создание точек при пустом графике
* added func creation new point with data | добавлено создание точек внутри полученных данных
* added func for reset to zero all charts | добавлена функция сброса в ноль всех графиков
* added programm mode (charts) for climate | добавлен программный режим (график) для климата
* added programm mode (charts) for I zone | добавлен программный режим (график) для I зоны
* added programm timer mode (charts) for I zone | добавлен режим программного таймера (график) для I зоны
* added programm mode (charts) for II zone | добавлен программный режим (график) для II зоны
* added programm timer mode (charts) for II zone | добавлен режим программного таймера (график) для II зоны
* !added adoptation for switching power (hardware's firmware changes) | добавлена адаптация под переключение питания (изменения в прошивке устройства)
* !added adoptation for new data type in charts (hardware's firmware changes) | добавлена адаптация под новый тип данных графиков (изменения в прошивке устройства)

#### 2.0.1
* added selected temperature report in climate programm mode | добавлено отображение выбранной температуры в программном режиме климата
* added UI deps for correct displaying modes | добавлены зависимости для корректного отображения режимов
* added temp. limits by air sensor for I & II zones | добавлена функция ограничения по температуре воздуха
* added additional icons for timer ON & OFF | добавлены дополнительные иконки для ВКЛ и ВЫКл таймера
* added timer value under icon, when timer is ON and activated | добавлено текущее значение таймера, если он включен и активирован
* added NULL taps when power is OFF | добавлены нажатия без действий, если питание выключено
* added color definition for buttons mode selection | добавлено определение цветом для выбора режимов
* added information about the 2nd button, when climate is on | добавлена информация о второй кнопке, когда климат включен
* added some deps (colors, raws) in buttons configuration, when climate is on | добавлены некоторые зависимости (цвет, наполнение) для конфигуратора кнопок при вкл режиме климата
* fixed force update for some values on the home screen | исправлено принудительное обновление некоторых значений на главном экране
* ? fixed popup dialog window closing after confirmation | исправлено закрывание диалогового окна после подтверждения
* fixed sensor type selector, added some info | исправлена функция выбора типа датчика, добавлена информация
* fixed force close app when slider has no any values to set due to limitations | исправлено принудительное завершение работы если слайдер не имеет значений из-за ограничений пределов
#### Cloud func. | Функции облака
* fixed performance lag when turning ON simple timer | исправлена задержка и производительность при включении простого таймера
* added mode selection on home screen for climate mode | добавлен выбор режимов для климат-контроля на главном экране
* added mode selection on home screen for zones | добавлен выбор режимов для зон
* added open window function control for both zones | добавлено управление функцией открытого окна для обеих зон
* added simple timer and it's switcher to the 1st zone | добавлен простой таймер и его переключатель для первой зоны
* added simple timer and it's switcher to the 2nd zone | добавлен простой таймер и его переключатель для второй зоны
* added buttons mode control | добавлен выбор режима кнопок
* added temperature settings for I & II buttons | добавлены настройки температур для I и II кнопок
* added timer settings for I & II buttons | добавлены настройки таймера для I и II кнопок
* added temp. set. for climate-buttom | добавлена настройка темп. для кнопки климата
* added timer set. for climate-button | добавлена настройка таймера для кнопки климата

#### 2.0.0
* global upgrade to React 16.8.3|RN 0.59.10 | глобальное обновление до React 16.8.3|RN 0.59.10
* some optimizations & adoptations for new ver. support | нек. оптимизации и адаптирование под новую версию ---30%
* clean-up some destructuring code | небольшая очистка деструктивного кода
* !fixed selected temp. display value in startup | !исправлено отображение выбранной температуры при старте

#### 1.2.8 Cloud RC2 Beta Show-room|Выставка
* fix dimensions for normal tablet support | исправлены разрешения для нормальной поддержки планшетов
* fix sizes and positions for normal tablet support | исправлены размеры и положения для нормальной поддержки планшетов

#### 1.2.7 Cloud RC2 Beta Show-room|Выставка
* rebuilt climate grid in reports | перестроена сетка в отображении
* added display dependency on selected contolling sensors for climate average temp | добавлена зависимость отображения средней температуры климата от выбранных управляющих датчиков
* added math.round for average climate temp | добавлено округление для средней температуры климата
* added sensor error handler for climate report temp | добавлена обработка ошибок датчика для температуры климата
* added sensor error handler for zones report temp | добавлена обработка ошибок датчика для температур зон
* added t report display dependency on selected mode | добавлена зависимость отображения температуры от выбранного режима
* added render optimisation for colored icons | добавлена оптимизация для цветных иконок
* changed some translations for RU | изменены некоторые переводы для RU
* changed some sizes of elements for better dispaying on diff. devices | изменены размеры нек. элементов для лучшего отображения на различн. устройствах
* fixed states in climate mode | исправлены состояния для климат-режима
* fixed get_data func | исправлены функции получения данных
#### Cloud func. | Функции облака
* added power on/off for climate mode | добавлено вкл/выкл питания для режима климата
* added power on/off for Zone 1 | добавлено вкл/выкл питания для первой зоны
* added power on/off for Zone 2 | добавлено вкл/выкл питания для второй зоны
* added manual temp slider for climate mode | добавлена ручная регулировка температуры слайдером для климат-режима
* added manual temp stepper selector for climate mode | добавлена ручная пошаговая регулировка температуры для климат-режима
* added manual temperature selection for Zone 1 and Zone 2 | добавлен ручной выбор температуры для Зоны 1 и Зоны 2

#### 1.2.6 Cloud Beta
* clean up some useless code | подчищен неиспользуемый код
* rebuild climate power controller to footer | контроллер климата перестроен в подвал
* added two way data transfering for real-time data displaying | добавлен двусторонний обмен для отображения данных в реальном времени
* added function for confirmation in pop-up dialog withot close animation | добавлена функция "подтвердить" в диалоговые окна без анимации
* added relay state displaying in climate mode (with depending on channel selector pos.) | добавлено отображение статуса реле в климат-режиме (с зависимостью от положения переключателя канала)
* fixed max items in sensors set | исправлено макс. кол-во в настройках датчиков
* fixed slider position in climate mode | исправлено положение слайдера в режиме климата
##### Cloud func. | Функции облака
* added separate report temperature from cloud string | добавлено раздельное отображение температуры из строки с облака
* added control of sensors | добавлено управление дачтиками
* added fan speed control | добавлено управление скоростью вентилятора
* added type selection for ext. sensors | добавлен выбор типа внешн. датчиков

#### 1.2.5 Cloud Beta
* rebuild UI design for Climate mode homescreen | переписан домашний экран в режиме климата
* added scale & step params to sliders | добавлены параметры масштабирования и шага в функц. слайдеров
* updated translations | обновлены переводы
* fixed some icons positioning | исправлено расположение некоторых иконок
* fix NaN in brightness slider | исправлено неопред. знач. в слайдере яркости
##### Cloud func. | Функции облака
* added channel mode selector | добавлен переключатель каналов
* added home screen zones view deps mechanic | добавлена механика зависимости отображения зон на главном экране
* added preheat cloud dps | добавлено включение через облако режима преднагрева
* added climate cloud dps | добавлено включение через облако режима климат-контроля
* added relay state indication | добавлено отображение статуса реле
* added warning msg in Zones, when climate is on --deleted 
* added funcion for OpenWindowStatus | добавлена функция "статус - открытое окно"
* added temperature correction control for air sensor | добавлено управление корректировкой датчика температуры воздуха
* added brightness controll | добавлено управление яркостью
* added load capacity cloud setting | добавлена настройка мощности нагрузки через облачный сервер
* separating report UI for climate and zones on homescreen | выполнено разделение UI отчетов для климата и зон на домашнем экране

#### 1.2.4 RC1
* fix little problems | незначительные правки
* fixing some transaltions for better autofill | исправление некоторых переводов для лучшей адаптации расположения на экране
* fix displaying RU on iOS | исправлено отображение RU на платформе iOS
* updated air icon | обновлена иконка воздуха

## Home Screen | Главный экран
#### 1.2.3 RC1
* added navi to every chart setting | добавлена навигация к каждой настройке графиков
* added funcs that're controlling UI (depending on dp) | добавлен функционал, который контролирует отображение интерфейса в зависимости от dp
* updated RU translations | обновлены RU переводы
* updated buttons to more simple switch (actually they're depending on dps too) | обновлен механизм переключения внешнего вида кнопки (упрощен, теперь статус также зависит от dp)
* updated some add. UI mechanic (body on cloud) for taking more actual info about applied values | обновлена нек. доп. механика UI (зависимость от облака) для получения более актуальной информации об уже примененных данных
* performance tests = ok | тесты производительности = ок
* UI additional testing and adoptation | дополнительное тестирование и адаптация UI
* fixed updating default values on homescreen | исправлено обновление изначальных значений на главном экране

#### 1.2.2
* removed unnesessary consts | удалены ненужные константы
* updated translations mechanic | обновлен механизм получения переводов
* improove performance | увеличена производительность
* added homescreen | добавлен главный экран
* added maths avoiding from crossing end-values | добавление математического недопущения перекрывающих крайних пределов

#### 1.1.1
* have found a method to upgrade to React 16.8.3|RN 0.59.10 -- in process
* !added simple charts for temp set | добавлены простые графики для температуры
* !added simple charts for timer set | добавлены простые графики для таймера
* !added simple charts for climate | добавлены простые графики для климата

#### 1.1.0
* initial clean-up | первоначальная настройка
* checking for nessesary deps, fixing | проверка и исправление необходимых зависимостей
* add some basics to Tuya navigator | добавление базы в навигацию внутри приложения
* sorting funcs | сортировка функций
* added comments everywhere | документирование и внесение комметариев в код
* fix hot reloading homescreen | исправлена горячая перезагрузка домашнего экрана

## Settings | Настройки
#### 1.0.8
* tryed to upgrade to React 16.8.3|RN 0.59.10 -- failed
* added climate settings | добавлены настройки для климат-режима
* added settings by zones | добавлены настройки по зонам
* added tips for annotation | добавлены всплывающие пояснения
* added color separation for zones | добавлено цветовое разделение зон
* some changes in design for better usability | изменения в дизайне лучшего восприятия
* fixed separate containers position | исправлено определение позиции для отделенных контейнеров

#### 1.0.7
* clean unnecessary Tabs code | удален неиспользуемый код во Вкладках
* rewrited sensor type selection for better visual perception | переписан выбор типа датчика для лучшего восприятия
* !rewrited settings elements to modal windows for better cloud performance | элементы настроек переписаны в диалоговые окна для улучшения производительности при обмене с сервером
* added function for calculation border values of sliders | добавлена функция вычисления крайних пределов слайдеров
* added convertion MIN to HH MM format | добавлена функция конвертирования минут в читаемый формат ЧЧ ММ
* fix problem when some slider's interface may not depend on stepper ('power set') | исправлена проблема, когда некоторые слайдеры могут не иметь визуальной зависимости от пошаговой установки ('настройки мощности')

#### 1.0.6
* added power capacity | добавлены настройки мощности
* added support icons to UI | добавлена поддержка иконок в UI
* added stepper function | добавлена функция пошагового ввода значений
* ? set array's func | ? настроена функция работы с массивами данных
* fix native stepper in popup | исправлена функция пошагового ввода в родных компонентах
* fix force close app when using confirmation button | исправлено принудительное завершение при нажатии кнопки подтверждения
* fix RU translations dispalaying for Android OS | исправлено отображение РУС переводов для Android

#### 1.0.5
* clean unnecessary styles and func for better perfomance | удаление неиспользуемых стилей и функций для увеличения производительности
* updated UI inside parent conteiners | обновлен интерфейс (механика отображения стилей) внутри родительского контейнера
* updated global UI for buttons settins | выполнено масштабное обновление UI настроек кнопок
* fix UI for small DPI screens | исправлена проблема совместимости для маленьких экранов
* fix some performance limitations | исправлены некоторые ограничения производительности

#### 1.0.4
* added Math.round(value) to UI | добавлена математическая функция округления значений
* added MAX and MIN limites for dep. values when changing succesive param-s | добавлена функция ограничения верхних и нижних значений при установке последовательных параметров
* added tap on slider func | добавлена возможность устанавливать значения слайдера касанием
* fragmentation of code for better dev for team | фрагментирование кода внутри структуры для удобства разработки внутри команды
* updated Android OS compability | обновлена совместимость с различными устройствами на OS Android
* fix for dark theme in iOS | исправления для темной темы в iOS

#### 1.0.3
* added new dpCodes | добавлены обновленные datapoints
* added RU_ru strings | добавлено отображение на русском языке
* updated EN_en strings | обновлен перевод на английском языке
* updated version controller | обновлены параметры контроллера
* updated component's library | обновлены библиотеки

#### 1.0.2
* fix Tuya Navigator | исправлена работа навигации внутри контейнера
* fix Android layout | исправлена сетка расположения элементов
* fix for non-connected screens | исправлено подключение новых экранов
* fix deps | исправлены зависимости
* fix Tuya emulation on some devices | исправлена ошибка отображения внутри контейнера родного приложения

#### 1.0.1

#### 1.0.1

#### Bug Fixes
* fix StatusBar invisible ([b4200e1](https://github.com/TuyaInc/tuya-panel-kit-template/commit/b4200e1f6bd0947a647e4d14392d2ca07df9c7d6))
