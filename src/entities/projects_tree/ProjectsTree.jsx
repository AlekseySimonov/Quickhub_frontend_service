import { ReactFlow, Background, Controls, MiniMap } from '@xyflow/react';
import '@xyflow/react/dist/style.css'
import styles from './flow.module.css'
import { ProjectNode } from './CustomNodes';

export const ProjectsTree = () => {

    const projects = [
        {
            id: '1',
            position: { x: 0, y: 0 },
            data: { label: 'Hello', description: 'This is project 1' }
        },
    ];

    const nodes = projects.map(project => ({
        id: project.id,
        type: 'projectNode', 
        position: project.position,
        data: project.data,
    }));

    const nodeTypes = {
        projectNode: ProjectNode,
    };

    return (
        <div className={styles.reactFlow}>
            <ReactFlow
                nodes={nodes}
                nodeTypes={nodeTypes}
                fitView>
                    <Background color='white'/>
                    <Controls />
                    <MiniMap pannable zoomable nodeStrokeWidth={3} />
            </ReactFlow> 
        </div>
        
    )
}
