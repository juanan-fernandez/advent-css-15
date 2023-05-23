import { ReactNode, MouseEvent } from 'react';
import styles from './Button.module.css';

type ButtonProps = {
	children: ReactNode;
	onClick: (e?: MouseEvent) => void;
};

function Button({ children, onClick }: ButtonProps) {
	const handleButtonClick = () => {
		onClick();
	};

	return (
		<button className={styles.btn} onClick={handleButtonClick}>
			{children}
		</button>
	);
}

export default Button;
