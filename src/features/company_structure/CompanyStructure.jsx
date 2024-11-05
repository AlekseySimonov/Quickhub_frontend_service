import { ReactFlow, Background, Controls } from '@xyflow/react';
import '@xyflow/react/dist/style.css'
import styles from './styles.module.css'

export const CompanyStructure = ()=>{

    const edges = [{ id: '1-2', source: '1', target: '2' }];

    const nodes = [
    {
        id: '1', // required
        position: { x: 0, y: 0 }, // required
        data: { label: 'Hello' }, // required
    },
    {
    id: '2',
    data: { label: 'World' },
    position: { x: 100, y: 100 },
    },
    ];
    return (
        <div className={styles.reactFlow}>
        <ReactFlow nodes={nodes} edges={edges}>
            <Background />
            <Controls />
        </ReactFlow>
    </div>
    )
}