
# Мотивация

Bem React Core — это библиотека для разработки пользовательских интерфейсов по БЭМ-методологии на React. 

Библиотека невелика по размеру и была создана в [Яндексе](https://yandex.ru/company/) с целью решить ряд проблем, связанных с разработкой крупномасштабных сайтов на React.

* [Почему Bem React Core](#Почему-bem-react-core)
* [Bem React Core в действии](#bem-react-core-в-действии)

## Почему Bem React Core

Bem React Core не замена React. Библиотека позволяет расширить возможности React еще сильнее, а именно: 

* Ограничить использование JSX в проекте.
* Не использовать лишние проверки в виде условных выражений при подписке на свойства React-компонента.
* Разрабатываться по [БЭМ](https://ru.bem.info).

Вся низкоуровневая логика спрятана за высокоуровневыми абстракциями, что позвоялет писать более декларативный и модульный код.

Как результат, вы получаете:

* методы классов для описания JSX-элементов;
* лаконичный синтаксис для модификации компонентов;
* единообразный способ описания компонентов, сохраняя при этом всю мощь React по управлению DOM.

## Bem React Core в действии

* [Методы классов vs JSX](#Функции-vs-jsx)
* [Модификация компонентов](#Модификация-компонентов)

### Методы классов vs JSX

JSX — это мощный синтаксис React, который позволяет смешивать JSX-элементы и JavaScript. В JSX тип элемента указывается с помощью тега, его атрибуты представляют свойства. 

Проблемы с JSX начинаются тогда, когда нужна более тонкая настройка. Например, может понадобиться динамически изменить тег JSX-элемента или добавить новое свойство. 

Решить эти задачи можно, например, следующим образом: 

* Возвращать в `render()` разные JSX-элементы с помощью условных выражений, что плохо при создании сложных деревьев DOM с атрибутами.
* Разбить метод `render()` на небольшие функции.

**Пример изменения кнопки с помощью JSX:**

```js
import * as React from 'react';
import * as ReactDOM from 'react-dom';

class Button extends React.Component {

    render() {
        const props = this.props;
        switch (props.type) {
            case 'link':
                return <a href='www.yandex.ru' className='Link'>Click me</a>;
            default:
                return <button className='Button'>Click me</button>;
        }
    }
}

ReactDOM.render(
    <React.Fragment>
        <Button type='button'/>
        <Button type='link'/>
    </React.Fragment>,
    document.getElementById('root')
);
```

**Результат:**

```html
<button class="Button">Click me</button>
<a href="www.yandex.ru" class="Link">Click me</a>
```

[Методы классов](https://github.com/bem/bem-react-core/blob/master/docs/ru/REFERENCE.md#Методы-классов) библиотеки Bem React Core позволяют изменять отдельную часть JSX-элемента: тег, атрибуты или содержимое. Свойствами и методами классов можно манипулировать, но по умолчанию все они будут унаследованы.

**Пример изменения кнопки с помощью Bem React Core:**

```tsx
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Block, withMods } from 'bem-react-core';

interface IButtonProps {
    type: 'link' | 'button';
}

class Button<T extends IButtonProps> extends Block<T> {
    block = 'Button';

    tag() {
        return 'button';
    }

    content() {
        return 'Click me';
    }
    
}

class ButtonLink extends Button<IButtonProps> {
    static mod = ({ type }: IButtonProps) => type === 'link';

    block = 'Link';

    tag() {
        return 'a';
    }

    attrs() {
        return {
            href: 'www.yandex.ru'
        };
    }
}

const ButtonView = withMods(Button, ButtonLink);

ReactDOM.render(
    <React.Fragment>
        <ButtonView type="button" />
        <ButtonView type="link" />
    </React.Fragment>,
    document.getElementById('root')
);
```

**Результат:**

```html
<button class="Button">Click me</button>
<a href="www.yandex.ru" class="Link">Click me</a>
```

### Модификация компонентов

Компонент React может иметь множесто различных состояний. Когда состояние компонента меняется, меняется его видимое содержимое, показывающее эти изменения.

Типичным примером модификации может быть кнопка имеющая различные темы оформления и размеры.

**Пример модификации кнопки с помощью JSX:**

```js
import * as React from 'react';
import * as ReactDOM from 'react-dom';

class Button extends React.Component {

    render() {
        const props = this.props;
        const classNames = ['Button'];
        if (props.theme === 'normal' && props.size === 's') {
            classNames.push("Button_theme_normal");
            classNames.push("Button_size_s");
            return <button className={classNames.join(' ')}>Click me</button>;
        } else if (props.theme === 'default' && props.size === 'm') {
            classNames.push("Button_theme_default");
            classNames.push("Button_size_m");
            return <button className={classNames.join(' ')}>Click me</button>;
        }  else {
            return <button className={classNames.join(' ')}>Click me</button>;
        }
    
    }
}

ReactDOM.render(
    <React.Fragment>
        <Button />
        <Button theme='normal' size='s'/>
        <Button theme='default' size='m'/>
    </React.Fragment>,
    document.getElementById('root')
);
```

**Результат:**

```html
<button class="Button">Click me</button>
<button class="Button Button_theme_normal Button_size_s">Click me</button>
<button class="Button Button_theme_default Button_size_m">Click me</button>
```

**Пример модификации кнопки с помощью Bem React Core:**

```tsx
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Block, withMods } from 'bem-react-core';

interface IButtonProps {
    children: string;
}
interface IModsProps extends IButtonProps {
    size: 'm' | 's';
    theme: 'normal' | 'default';
}

class Button extends Block<IModsProps> {
    block = 'Button';
    tag() {
        return 'button';
    }
    mods() {
        return {
            theme: this.props.theme
        };
    }
    content() {
        return this.props.children;
    }
}

class ButtonSize extends Button {
    static mod = ({theme}: any) => theme === 'default';

    mods() {
        return {
            ...super.mods(),
            size: this.props.size
        };
    }
}

const ButtonView = withMods(Button, ButtonSize);

ReactDOM.render(
    <React.Fragment>
        <ButtonView >Click me</ButtonView>
        <ButtonView theme='normal' size='s'>Click me</ButtonView>
        <ButtonView theme='default' size='m'>Click me</ButtonView>
    </React.Fragment>,
    document.getElementById('root')
);
```

**Результат:**

```html
<div id="root"><button class="Button">Click me</button>
<button class="Button Button_theme_normal">Click me</button>
<button class="Button Button_theme_default Button_size_m">Click me</button>
```
