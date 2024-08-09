import { useState } from "react";
import "./App.css";
import styles from "./app.module.css";

export const App = () => {
	const [value, setValue] = useState("");
	const [list, setList] = useState([]);
	const [error, setError] = useState("");
	const [isValueVaild, setIsValueValid] = useState(false);

	const onInputButtonClick = () => {
		const promptValue = prompt();
		if (promptValue.length < 3) {
			setError("Сообщение не может содержать менее 3 символов");
			setIsValueValid(false);
		} else {
			setValue(promptValue);
			setError("");
			setIsValueValid(true);
		}
	};

	const onAddButtonClick = () => {
		if (isValueVaild) {
			const updatedList = [...list, { id: Date.now(), value }];
			setList(updatedList);
			setValue("");
			setError("");
		}
	};

	return (
		<div className="app">
			<h1 className={styles["page-heading"]}>Ввод значения</h1>
			<p className={styles["no-margin-text"]}>
				Текущее значение <code>{value}</code>: "
				<output className="current-value"></output>"
			</p>

			{error !== "" ? <div className={styles.error}>{error}</div> : ""}
			<div className={styles["buttons-container"]}>
				<button className={styles.button} onClick={onInputButtonClick}>
					Ввести новое
				</button>
				<button
					className={styles.button}
					onClick={onAddButtonClick}
					disabled={!isValueVaild}
				>
					Добавить в список
				</button>
			</div>
			<div className={styles["list-container"]}>
				{list.length >= 1 && <h2 className={styles["list-heading"]}>Список:</h2>}
				{list.length <= 0 && (
					<p className={styles["no-margin-text"]}>Нет добавленных элементов</p>
				)}
				<ul className={styles.list}>
					{list.map((item) => {
						return (
							<li className={styles["list-item"]} key={item.id}>
								{item.value}
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
};
