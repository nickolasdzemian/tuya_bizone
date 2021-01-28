# App for thermostat BiZone | Приложение для терморегулятора БиЗон
# Changelog | Список изменений

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### Known issues | Известные ограничения
* !charts need to be tested with real device and data | графики необходимо тестировать с реальным устройством и данными

#### 1.2.7 Cloud Beta
* added display dependency on selected contolling sensors for climate average temp | добавлена зависимость отображения средней температуры климата от выбранных управляющих датчиков
* added math.round for average climate temp | добавлено округление для средней температуры климата
* added error handler for climate report temp | добавлена обработка ошибок для температуры климата
* fixed states in climate mode | исправлены состояния для климат-режима
#### Cloud func. | Функции облака
* added power on/off for climate mode | добавлено вкл/выкл питания для режима климата
* added power on/off for Zone 1 | добавлено вкл/выкл питания для первой зоны
* added manual temp slider for climate mode | добавлена ручная регулировка температуры слайдером для климат-режима
* added manual temp stepper selector for climate mode | добавлена ручная пошаговая регулировка температуры для климат-режима

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

# ==UPD== #
* for more logs see another version of package
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
### Known issues | Известные ограничения
* !visible slider's width and value depends on other parent component | размер и значение видимой части зависимых слайдеров может изменяться в зависимости от родительского компонента
* !force close app when slider has no any values to set due to limitations | принудительное завершение работы если слайдер не имеет значений из-за ограничений пределов

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
