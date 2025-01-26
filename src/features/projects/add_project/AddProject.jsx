import { ProjectsFeatures } from "..";
import { usePostProjectMutation } from "../../../app/store/slices/projectsSlice";

export const AddProject = ({ onClose }) => {
    const [postProject] = usePostProjectMutation();

    const handleAddProject = async (payload) => {
        return await postProject({ companyPk: payload.company, body: payload }).unwrap();
    };

    return (
        <ProjectsFeatures.ProjectForm
            title="Добавить проект"
            onClose={onClose}
            onSubmit={handleAddProject}
        />
    );
};
