import { usePatchProjectMutation } from "../../../app/store/slices/projectsSlice";
import { ProjectsFeatures } from "..";

export const EditProject = ({ onClose, projectData }) => {
			const [patchProject] = usePatchProjectMutation();
	const handleEditProject = async (payload) => {
		return await patchProject({
			companyPk: payload.company,
			id: projectData.id,
			body: payload,
		}).unwrap();
	};

	return (
		<ProjectsFeatures.ProjectForm
			title={`Изменить ${projectData.title}`}
			onClose={onClose}
			onSubmit={handleEditProject}
			projectData={projectData}
		/>
	);
};
