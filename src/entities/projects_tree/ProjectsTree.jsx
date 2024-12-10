import { ReactFlow, Background, Controls, MiniMap } from '@xyflow/react';
import '@xyflow/react/dist/style.css'
import styles from './flow.module.css'
import { CompanyNode, ProjectNode } from './CustomNodes';
import { createGraph } from './initialElements';
import { useSelector } from 'react-redux';
import { useGetProjectsQuery } from '../../app/store/slices/projectsSlice';

export const ProjectsTree = () => {
    const {companyTitle, companyID} = useSelector(state => state.company)
    const {data = []} = useGetProjectsQuery(companyID)

    const { nodes, edges } = createGraph({ data, companyTitle })

    const nodeTypes = {
        projectNode: ProjectNode,
        companyNode: CompanyNode,
    };

    return (
        <div className={styles.reactFlow}>
            {data.length === 0 && 
                <div className={styles.container_empty}>
                На данный момент в компании нет проектов
                </div>
            }
            {
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    nodeTypes={nodeTypes}
                    fitView>
                    <Background color='white'/>
                    <Controls />
                    <MiniMap pannable zoomable nodeStrokeWidth={3} />
                </ReactFlow>
            }
            
        </div>
        
    )
}
