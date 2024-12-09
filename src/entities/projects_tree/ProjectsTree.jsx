import { ReactFlow, Background, Controls, MiniMap } from '@xyflow/react';
import '@xyflow/react/dist/style.css'
import styles from './flow.module.css'
import { ProjectNode } from './CustomNodes';
import { createGraph } from './initialElements';
import { useSelector } from 'react-redux';
import { useGetProjectsQuery } from '../../app/store/slices/projectsSlice';

export const ProjectsTree = () => {
    const {companyTitle, companyID} = useSelector(state => state.company)
    const {data = []} = useGetProjectsQuery(companyID)

    const { nodes, edges } = createGraph({ data, companyTitle })

    const nodeTypes = {
        projectNode: ProjectNode,
    };

    return (
        <div className={styles.reactFlow}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                fitView>
                    <Background color='white'/>
                    <Controls />
                    <MiniMap pannable zoomable nodeStrokeWidth={3} />
            </ReactFlow>
        </div>
        
    )
}
