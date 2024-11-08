import { ReactFlow, Background, Controls, MiniMap, applyNodeChanges } from '@xyflow/react';
import '@xyflow/react/dist/style.css'
import styles from './styles.module.css'
import { useCallback, useState } from 'react';

export const CompanyStructure = ()=>{

    const initialNodes = [
    {
        id: '1',
        data: { label: 'Hello' },
        position: { x: 0, y: 0 },
        type: 'input',
    },
    {
        id: '2',
        data: { label: 'World' },
        position: { x: 100, y: 100 },
    },
    ];

    const initialEdges = [
        { id: '1-2', source: '1', target: '2', type: 'step' },
    ];

    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);

    const onNodesChange = useCallback(
        (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
        [],
    );
    const onEdgesChange = useCallback(
        (changes) => setEdges((eds) => applyNodeChanges(changes, eds)),
        [],
    );
    return (
        <div className={styles.reactFlow}>
        <ReactFlow 
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodes={nodes} 
        edges={edges}
        fitView>
            <Background color='white'/>
            <Controls />
            <MiniMap pannable zoomable nodeStrokeWidth={3} />
        </ReactFlow>
    </div>
    )
    
}

