import { CSSProperties, useState } from 'react';

import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	defaultArticleState,
} from '../../constants/articleProps';

import '../../styles/index.scss';
import styles from '../../styles/index.module.scss';

export const App = () => {
	///Состояние
	const [articleState, setArticleState] = useState(defaultArticleState);

	///Функция обновления ArticleState
	const appStateUpdate = (formData: ArticleStateType) => {
		setArticleState((prevState) => ({
			...prevState,
			...formData,
		}));
	};

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': articleState.fontFamilyOption.value,
					'--font-size': articleState.fontSizeOption.value,
					'--font-color': articleState.fontColor.value,
					'--container-width': articleState.contentWidth.value,
					'--bg-color': articleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm send={appStateUpdate} />
			<Article />
		</main>
	);
};
