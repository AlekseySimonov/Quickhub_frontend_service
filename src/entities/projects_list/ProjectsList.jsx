import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Pagination } from "../../shared/ui/components";
import styles from './styles.module.css'
import { icons } from '../../shared/ui/icons/projects';
import { CompanyFeatures } from '../../features/company';
import { useGetProjectsQuery } from '../../app/store/slices/projectsSlice';
import { Link } from 'react-router-dom';
import { usePopup } from '../../shared/hooks';
import Popup from 'reactjs-popup';
import { ProjectsFeatures } from './../../features/projects/index';
import { useGetUsersCompanyQuery } from '../../app/store/slices/companySlice';

export const ProjectsList = () => {

    const companyID = useSelector(state => state.company.companyID)
    useGetUsersCompanyQuery(companyID)

    const { data: projects = [] } = useGetProjectsQuery(companyID, {
        skip: !companyID,
    })

    const { isVisible, openPopup, closePopup } = usePopup();

    const projectsPerPage = 8;
    const totalPages = Math.ceil(projects.length / projectsPerPage);

    const [currentPage, setCurrentPage] = useState(1)
    const [selectedProjectIds, setSelectedProjectIds] = useState([])

    const handleCheckboxChange = (projectId) => {
        setSelectedProjectIds((prevSelected) =>
            prevSelected.includes(projectId)
                ? prevSelected.filter((id) => id !== projectId)
                : [...prevSelected, projectId]
        );
    };

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
        localStorage.setItem('projectsListSettings', JSON.stringify(settings));
        setIsSettingsOpen(false);
    };

    const handleDeleteProject = () => {
        console.log('DeleteProject')
        /** Добавить удаление проектов с помощью метода patch  */ 
    }

    const handleArchiveProject = () => {
        console.log('Archived')
    }
    return (
        <div className={styles.main}>
            {selectedProjectIds.length > 0 && (
                <div className={styles.action__panel}>
                    <button>
                        <img src={icons.cross} alt="X" onClick={() => setSelectedProjectIds([])} />
                    </button>

                    <div className={styles.action__panel__length}>
                        <img src={icons.circle} alt="o" />
                        {selectedProjectIds.length}
                    </div>
                    <button onClick={handleArchiveProject}>Добавить в архив</button>
                    {selectedProjectIds.length === 1 && (
                        <>
                            <button>
                                <Link to={`/projects/${selectedProjectIds[0]}`} className={styles.title}>
                                    Открыть
                                </Link>
                            </button>
                            <button onClick={openPopup}>Редактировать</button>
                        </>
                    )}
                    <button onClick={handleDeleteProject}>Удалить</button>
                </div>
            )}
            {projects.length === 0 && (
                <div className={styles.container_empty}>
                    На данный момент в компании нет проектов.
                </div>
            )}
            {projects.length > 0 && (
                <table className={styles.projects}>
                    <tr className={styles.projects__header}>
                        <th className={styles.projects__settings} 
                        // onClick={() => setIsSettingsOpen(true)}
                        >
                            <img src={icons.settingsGrey} alt="Настройки" />
                        </th>
                        {[
                            { key: 'title', label: 'Название' },
                            { key: 'date_of_update', label: 'Активность' },
                            { key: 'priority', label: 'Приоритет' },
                            { key: 'creation_date', label: 'Дата создания' },
                            { key: 'departments', label: 'Отделы' },
                            { key: 'owner', label: 'Руководитель' },
                            { key: 'users', label: 'Участники' },
                        ]
                            .filter(column => showColumns[column.key])
                            .map(column => (
                                <th key={column.key}>{column.label}</th>
                            ))}
                    </tr>
                    {currentProjects.map((project) => (
                        <tr key={project.id} className={`${styles.projects__item} ${selectedProjectIds.includes(project.id) ? styles.selected : ''
                            }`}>
                            <td>
                                <input
                                    className={styles.checkbox}
                                    type="checkbox"
                                    checked={selectedProjectIds.includes(project.id)}
                                    onChange={() => handleCheckboxChange(project.id)}
                                />
                            </td>
                            {showColumns.title && (
                                <td>
                                    <Link to={`/projects/${project.id}`} className={styles.title}>{project.title || '-'}</Link>
                                </td>
                            )}
                            {showColumns.date_of_update && (
                                <td>{project.date_of_update || '-'}</td>
                            )}
                            {showColumns.priority && (
                                <td>{project.priority || '-'}</td>
                            )}
                            {showColumns.creation_date && (
                                <td>{project.creation_date || '-'}</td>
                            )}
                            {showColumns.departments && (
                                <td>{project.departments.map((dep) => dep.description).join(', ') || '-'}</td>
                            )}
                            {showColumns.owner && (
                                <td>{project.owner || '-'}</td>
                            )}
                            {showColumns.users && (
                                <td >{project.users.map((user) => user.email).join(', ') || '-'}</td>
                            )}
                        </tr>
                    ))}

                    {isSettingsOpen && (
                        <CompanyFeatures.CompanyListSettings
                            onSave={handleSaveSettings}
                            onClose={() => setIsSettingsOpen(false)}
                            initialSettings={showColumns}
                        />
                    )}
                </table>
            )}
            {totalPages >= 1 && (
                <Pagination
                    totalItems={projects.length}
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onPageChange={setCurrentPage}
                    labels={{ items: 'Проектов', pages: 'Страниц' }}
                />
            )}
            <Popup open={isVisible} closeOnDocumentClick onClose={closePopup}>
                <ProjectsFeatures.EditProject onClose={closePopup} projectData={projects.find(project => project.id === selectedProjectIds[0])} />
            </Popup>
        </div>
    );
}
