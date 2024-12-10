import { Handle, Position } from '@xyflow/react';
import styles from './nodes.module.css'
import { Link } from 'react-router-dom';

export const ProjectNode = ({ data }) => {

    return (
        <div className={styles.node}>
            <div className={styles.project}>
                <Handle type="source" position={Position.Right} id="source" style={{ opacity: 0 }} />
                    <Link to={`/projects/${data.id}`} className={styles.label}>
                        {data.title}
                    </Link>
                <Handle type="target" position={Position.Left} id="target" style={{ opacity: 0 }} />
            </div>
        </div>
    )
}

export const CompanyNode = ({ data }) => {

    return (
        <div className={styles.node}>
            <div className={styles.project}>
                <Handle type="source" position={Position.Right} id="source" style={{ opacity: 0 }} />
                    {data.title}
                <Handle type="target" position={Position.Left} id="target" style={{ opacity: 0 }} />
            </div>
        </div>
    )
}