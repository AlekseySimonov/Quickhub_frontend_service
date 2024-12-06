import { ReactFlow, Background, Controls, MiniMap } from '@xyflow/react';
import '@xyflow/react/dist/style.css'
import styles from './styles.module.css'
import {DepartmentNode} from './CustomNodes';
import { useDispatch, useSelector } from 'react-redux';
import { createGraph } from './initialElements';
import { getDepartmentsAPI } from '../../app/store/slices/companySlice';
import { useEffect } from 'react';

export const CompanyStructure = ()=>{
    const companyID = useSelector(state => state.company.companyID)
    const departments = useSelector(state => state.company.departments)

    const currentDepartments = departments ? departments : [];
    const totalDepartments = currentDepartments.length;

    const dispatch = useDispatch()

    useEffect(() => {
    if (companyID) {
        dispatch(dispatch(getDepartmentsAPI));
    }
    }, [companyID, dispatch]);

    const { nodes, edges } = createGraph(departments)

    const nodeTypes = {
    departmentNode: DepartmentNode
    };

    return (
        <div className={styles.reactFlow}>
            {totalDepartments === 0 && 
            <div className={styles.container_empty}>
            На данный момент в компании нет отделов
            </div>
            }
            {totalDepartments > 0 &&
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

