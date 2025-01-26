import { useParams } from "react-router-dom";
import { InDevelop } from "../../shared/ui/components/inDevelop"

export const ProjectList = () => {
    const { projectId } = useParams();
    return (
        <InDevelop/>
    )
}
