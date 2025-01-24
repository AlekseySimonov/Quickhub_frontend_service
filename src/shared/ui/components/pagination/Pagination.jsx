import styles from './styles.module.css';

export const Pagination = ({ totalItems, totalPages, currentPage, onPageChange, labels = { items: 'Items', pages: 'Pages' } }) => {
	return (
		<div className={styles.pagination}>
			<div className={styles.pagination__container}>
				{currentPage > 1 && (
					<div
						onClick={() => onPageChange(currentPage - 1)}
						className={`${styles.pagination__arrow} ${styles.pagination__arrow_prev}`}
					/>
				)}

				<div className={styles.pagination__list}>
					{[...Array(totalPages)].map((_, index) => (
						<button
							key={index + 1}
							onClick={() => onPageChange(index + 1)}
							className={`${styles.pagination__item} ${currentPage === index + 1 ? styles['pagination__item--current'] : ''
								}`}
						>
							{index + 1}
						</button>
					))}
				</div>

				{currentPage < totalPages && (
					<div
						onClick={() => onPageChange(currentPage + 1)}
						className={`${styles.pagination__arrow} ${styles.pagination__arrow_next}`}
					/>
				)}
			</div>

			<div className={styles.countEmployee}>
				{labels.items}: <span className={styles.pagination__value}>{totalItems}</span>
			</div>
			<div className={styles.countPages}>
				{labels.pages}: <span className={styles.pagination__value}>{totalPages}</span>
			</div>
		</div>
	);
};