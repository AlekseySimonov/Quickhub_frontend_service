import { ReactFlow, Background, Controls, MiniMap } from '@xyflow/react';
import '@xyflow/react/dist/style.css'
import styles from './styles.module.css'
import {DepartmentNode} from './CustomNodes';
import {  useSelector } from 'react-redux';
import { createGraph } from './initialElements';
import { useGetDepartmentsQuery } from '../../app/store/slices/companySlice';

export const CompanyStructure = ()=>{
    const companyID = useSelector(state => state.company.companyID)

    const { data = [] } = useGetDepartmentsQuery(companyID, {
        skip: !companyID,
    });

    const { nodes, edges } = createGraph(data)

    const nodeTypes = {
    departmentNode: DepartmentNode
    };

    return (
        <div className={styles.reactFlow}>
            {data.length === 0 && 
            <div className={styles.container_empty}>
            На данный момент в компании нет отделов
            </div>
            }
            {data.length > 0 &&
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

