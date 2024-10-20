import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import { useState, useRef } from 'react';
import {
	OptionType,
	fontColors,
	fontSizeOptions,
	fontFamilyOptions,
	defaultArticleState,
	backgroundColors,
	contentWidthArr,
	ArticleStateType,
} from 'src/constants/articleProps';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

type formProp = {
	send: (formData: ArticleStateType) => void;
};

export const ArticleParamsForm = (props: formProp) => {
	///Состояния
	const [selectedFont, setFontFamily] = useState<OptionType>(
		fontFamilyOptions[0]
	);
	const [selectedSize, setFontSize] = useState<OptionType>(fontSizeOptions[0]);
	const [selectedColor, setFontColor] = useState<OptionType>(fontColors[0]);
	const [selectedBckg, setBckgColor] = useState<OptionType>(
		backgroundColors[0]
	);
	const [selectedWidth, setContentWidth] = useState<OptionType>(
		contentWidthArr[0]
	);
	const [isMenuOpen, setMenuIsOpen] = useState(false);

	///Обработка сабмита формы
	const handleFormSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		onSubmit();
	};

	///Реф для хука useOutsideClickClose
	const asideRef = useRef<HTMLDivElement>(null);

	///Обработка сабмита, передача данных в приложение
	const onSubmit = () => {
		const formData = {
			fontFamilyOption: selectedFont,
			fontSizeOption: selectedSize,
			fontColor: selectedColor,
			backgroundColor: selectedBckg,
			contentWidth: selectedWidth,
		};
		props.send(formData);
	};

	///Обработчик изменения шрифта
	const handleFontChange = (font: OptionType) => {
		setFontFamily(font);
	};

	///Обработчик изменения размера шрифта
	const handleSizeChange = (size: OptionType) => {
		setFontSize(size);
	};

	///Обработчик изменения цвета фона
	const handleBckgColorChange = (background: OptionType) => {
		setBckgColor(background);
	};

	///Обработчик изменения цвета текста
	const handleTextColorChange = (color: OptionType) => {
		setFontColor(color);
	};

	///Обработчик изменения ширины контента
	const handleContentWidthChange = (width: OptionType) => {
		setContentWidth(width);
	};

	///Обработчик клика по кнопке открывающей/закрывающей асайд
	const handleArrowClick = () => {
		if (!isMenuOpen) {
			setMenuIsOpen(true);
		} else {
			setMenuIsOpen(false);
		}
	};

	///Хук для обработки клика вне элемента(асайда)
	useOutsideClickClose({
		isOpen: isMenuOpen,
		rootRef: asideRef,
		onChange: setMenuIsOpen,
	});

	///Сброс формы + передача дефолтного значения
	const handleClear = () => {
		setFontFamily(fontFamilyOptions[0]);
		setFontSize(fontSizeOptions[0]);
		setFontColor(fontColors[0]);
		setBckgColor(backgroundColors[0]);
		setContentWidth(contentWidthArr[0]);
		props.send(defaultArticleState);
	};

	return (
		<>
			<ArrowButton isOpen={isMenuOpen} onClick={handleArrowClick} />
			<aside
				ref={asideRef}
				className={clsx(styles.container, {
					[styles['container_open']]: isMenuOpen,
				})}>
				<form className={styles.form} onSubmit={handleFormSubmit}>
					<Select
						selected={selectedFont}
						options={fontFamilyOptions}
						placeholder={defaultArticleState.fontFamilyOption.value}
						onChange={handleFontChange}
						title='Шрифт'
					/>
					<RadioGroup
						selected={selectedSize}
						name='radio'
						onChange={handleSizeChange}
						options={fontSizeOptions}
						title='Размер шрифта'
					/>
					<Select
						selected={selectedColor}
						options={fontColors}
						placeholder={defaultArticleState.fontColor.value}
						onChange={handleTextColorChange}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						selected={selectedBckg}
						options={backgroundColors}
						placeholder={defaultArticleState.backgroundColor.value}
						onChange={handleBckgColorChange}
						title='Цвет фона'
					/>
					<Select
						selected={selectedWidth}
						options={contentWidthArr}
						placeholder={defaultArticleState.contentWidth.value}
						onChange={handleContentWidthChange}
						title='Ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleClear}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
