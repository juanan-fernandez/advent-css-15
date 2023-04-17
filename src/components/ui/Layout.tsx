import { ReactNode } from 'react';
import styles from './Layout.module.css';

type Props = {
	children: ReactNode;
};

function LayOut({ children }: Props) {
	return <div className={styles.layout}>{children}</div>;
}

export default LayOut;
