
import { GenericPopup } from './../../../shared/ui/components/GenericPopup';

export const AddProject = ({onClose}) => {
    return (
        <GenericPopup
            onClose= {onClose}
            title = {'Добавить проект'}
        >
            <div>AddProject</div>
        </GenericPopup>
    )
}
