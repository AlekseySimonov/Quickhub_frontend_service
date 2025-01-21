import { ReactFlow, Background, Controls, MiniMap } from '@xyflow/react';
import '@xyflow/react/dist/style.css'
import styles from './styles.module.css'
import {DepartmentNode} from './CustomNodes';
import {  useSelector } from 'react-redux';
import { createGraph } from './initialElements';
import { useGetDepartmentsQuery, useGetUsersCompanyQuery } from '../../app/store/slices/companySlice';

export const CompanyStructure = ()=>{
    const companyID = useSelector(state => state.company.companyID)

    const { data: departmentData = [] } = useGetDepartmentsQuery(companyID, {
        skip: !companyID,
    });

    const {data: companyUsers = []} = useGetUsersCompanyQuery(companyID, {
        skip: !companyID,
    });
    

    const { nodes, edges } = createGraph(departmentData, companyUsers)

    const nodeTypes = {
    departmentNode: DepartmentNode
    };

    return (
        <div className={styles.reactFlow}>
            {departmentData.length === 0 && 
            <div className={styles.container_empty}>
            На данный момент в компании нет отделов
            </div>
            }
            {departmentData.length > 0 &&
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

