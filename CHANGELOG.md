# App for thermostat BiZone | Приложение для терморегулятора БиЗон
# Changelog | Список изменений

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.
#### Datapoints!
* Cloud mechanics didnt add into this UI | Механика работы с облаком еще не добавлена
* Some actions could be tranform threw 'get_data' method | Возможно, некоторые действия должны передаваться через метод 'get_data'
* International definition must be threw get_dp_lang method, now it's only simple strings | Международные переводы datapoint должны приводиться в интерфейсе через метод get_dp_lang, сейчас это только простые @i18Strings

## Home Screen | Главный экран
### Known issues | Известные ограничения
* !charts need been tested whis real device and data | графики необходимо тестировать с реальным устройством и данными

#### 1.2.5
* added channel mode selector
* added home screen zones view deps mechanic
* added preheat cloud dps
* added climate cloud dps
* added warning msg in Zones, when climate is on

#### 1.2.4 RC1
* fix little problems | незначительные правки
* fixing some transaltions for better autofill | исправление некоторых переводов для лучшей адаптации расположения на экране
* fix displaying RU on iOS | исправлено отображение RU на платформе iOS
* updated air icon | обновлена иконка воздуха

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
* !!!updated translations mechanic | обновлен механизм получения переводов
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
* function for confirmation in pop-up dialog hasn't been added yet (close animation) | функция "подтвердить" еще не добавлена в диалоговые окна (анимация при закрывании)

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
