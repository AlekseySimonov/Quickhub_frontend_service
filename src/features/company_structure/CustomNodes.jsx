import { Handle, Position } from '@xyflow/react';
import styles from './nodes.module.css'


export const DirectorNode = ({ data }) => {
    return (
        
        <div className={styles.directors} >
        <Handle type="source" position={Position.Bottom} id="source"  style={{ opacity: 0 }}/>
            <img className={styles.photo} src={data.photo} />
            <div className={styles.label}>
                <div className={styles.name}>
                    {data.name}
                </div>
                <div className={styles.position}>
                    {data.position}
                </div>
            </div>
        <Handle type="target" position={Position.Top} id="target" style={{ opacity: 0 }}/>
        </div>
    );
};

export const DesignersNode = ({ data }) => {
    return (
        <div className={styles.designers}>
            <img className={styles.photo} src={data.photo} />
            <div className={styles.label}>
                <div className={styles.name}>
                    {data.name}
                </div>
                <div className={styles.position}>
                    {data.position}
                </div>
            </div>
        <Handle type="target" position={Position.Top} id="target" style={{ opacity: 0 }}/>
        <Handle type="source" position={Position.Bottom} id="source" style={{ opacity: 0,  left: '15%',} } />
        </div>
    );
};

export const ChildNode = ({ data }) => {
    return (
        <div className={styles.child}>
            <div className={styles.label}>
                <div className={styles.name}>
                    {data.name}
                </div>
                <div className={styles.position}>
                    {data.position}
                </div>
            </div>
        <Handle type="source" position={Position.Bottom} id="source" style={{ opacity: 0 }} />
        <Handle type="target" position={Position.Left} id="target" style={{ opacity: 0 }}/>
        </div>
    );
};