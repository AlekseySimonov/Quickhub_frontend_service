import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Pagination } from "../../shared/ui/components";
import styles from './styles.module.css'
import { icons } from '../../shared/ui/icons/companies';
import { CompanyFeatures } from '../../features/company';
import { useGetProjectsQuery } from '../../app/store/slices/projectsSlice';
import { Link } from 'react-router-dom';

export const ProjectsList = () => {

    const companyID = useSelector(state => state.company.companyID)

    const { data: projects = [] } = useGetProjectsQuery(companyID, {
        skip: !companyID,
    });

    const projectsPerPage = 8;
    const totalPages = Math.ceil(projects.length / projectsPerPage);

    const [currentPage, setCurrentPage] = useState(1);

    const defaultSettings = {
        title: true,
        progress: true,
        date_of_update: true,
        priority: true,
        creation_date: true,
        departments: true,
        owner: true,
        users: true,
    };

    const loadSettings = () => {
        const savedSettings = localStorage.getItem('projectsListSettings');
        return savedSettings ? JSON.parse(savedSettings) : defaultSettings;
    };

    const [showColumns, setShowColumns] = useState(loadSettings());
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    const currentProjects = projects.slice((currentPage - 1) * projectsPerPage, currentPage * projectsPerPage);

    const handleSaveSettings = (settings) => {
        setShowColumns(settings);
        localStorage.setItem('companyListSettings', JSON.stringify(settings));
        setIsSettingsOpen(false);
    };
    return (
        <div className={styles.main}>
            <div className={styles.employees}>
                <div className={styles.employees__inner}>
                    <div className={styles.employees__header}>
                        <div className={styles.employees__settings} onClick={() => setIsSettingsOpen(true)}>
                            <img src={icons.settingsGrey} alt="Настройки" />
                        </div>
                        <div className={`${styles.employees__labels} ${styles.container}`}>
                            {[
                                { key: 'title', label: 'Название' },
                                { key: 'progress', label: 'Прогресс' },
                                { key: 'date_of_update', label: 'Активность' },
                                { key: 'priority', label: 'Приоритет' },
                                { key: 'creation_date', label: 'Дата создания' },
                                { key: 'departments', label: 'Отделы' },
                                { key: 'owner', label: 'Руководитель' },
                                { key: 'users', label: 'Участники' },
                            ]
                                .filter(column => showColumns[column.key])
                                .map(column => (
                                    <div key={column.key} className={`${styles.employees__label} ${styles['label']}`}>
                                        {column.label}
                                    </div>
                                ))}
                        </div>
                    </div>
                    <div className={styles.employees__list}>
                        <div className={styles['employees__list-inner']}>
                            {projects.length === 0 && (
                                <div className={styles.container_empty}>
                                    На данный момент в компании нет проектов.
                                </div>
                            )}
                            {currentProjects.map((project) => (
                                <div key={project.id} className={styles.employees__item}>
                                    <div className={`${styles.container} ${styles.employee}`}>
                                        {showColumns.title && (
                                            <Link to = {`/projects/${project.id}`} className={`${styles.employee__column} ${styles.employee__lname}`}>
                                                {project.title || '-'}
                                            </Link>
                                        )}
                                        {showColumns.date_of_update && (
                                            <div className={`${styles.employee__column} ${styles.employee__gender}`}>
                                                {project.date_of_update || '-'}
                                            </div>
                                        )}
                                        {showColumns.priority && (
                                            <div className={`${styles.employee__column} ${styles.employee__city}`}>
                                                {project.priority || '-'}
                                            </div>
                                        )}
                                        {showColumns.creation_date && (
                                            <div className={`${styles.employee__column} ${styles.employee__city}`}>
                                                {project.creation_date || '-'}
                                            </div>
                                        )}
                                        {showColumns.departments && (
                                            <div className={`${styles.employee__column} ${styles.employee__city}`}>
                                                {project.departments.map((dep) => dep.description).join(', ') || '-'}
                                            </div>
                                        )}
                                        {showColumns.owner && (
                                            <div className={`${styles.employee__column} ${styles.employee__city}`}>
                                                {project.owner || '-'}
                                            </div>
                                        )}
                                        {showColumns.users && (
                                            <div className={`${styles.employee__column} ${styles.employee__city}`}>
                                                {project.users.map((user) => user.email).join(', ') || '-'}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    {totalPages >= 1 && (
                        <Pagination
                            totalItems={projects.length}
                            totalPages={totalPages}
                            currentPage={currentPage}
                            onPageChange={setCurrentPage}
                            labels={{ items: 'Проектов', pages: 'Страниц' }}
                        />
                    )}
                </div>

                {isSettingsOpen && (
                    <CompanyFeatures.CompanyListSettings
                        onSave={handleSaveSettings}
                        onClose={() => setIsSettingsOpen(false)}
                        initialSettings={showColumns}
                    />
                )}
            </div>
        </div>
    );
}
