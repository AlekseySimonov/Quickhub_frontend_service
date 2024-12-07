import { Handle, Position } from '@xyflow/react';
import styles from './nodes.module.css'

export const ProjectNode = ({ data }) => {

    return (
        <div className={styles.node}>
            <div className={styles.project}>
                <Handle type="source" position={Position.Right} id="source" style={{ opacity: 0 }} />
                <div className={styles.label}>{data.label}</div>
                <Handle type="target" position={Position.Left} id="target" style={{ opacity: 0 }} />
            </div>
        </div>
    )
}