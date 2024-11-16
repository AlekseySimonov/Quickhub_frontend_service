import { ReactFlow, Background, Controls, MiniMap } from '@xyflow/react';
import '@xyflow/react/dist/style.css'
import styles from './styles.module.css'
import {nodes as initialNodes,
        edges as initialEdges} from './initialElements'
import {DirectorNode, DesignersNode, ChildNode} from './CustomNodes';

import useOnClickOutside from "react-cool-onclickoutside";

export const CompanyStructure = ()=>{

    const nodes = initialNodes;
    const edges = initialEdges;

    const nodeTypes = {
    directorNode: DirectorNode,
    designerNode: DesignersNode,
    childNode: ChildNode,
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

