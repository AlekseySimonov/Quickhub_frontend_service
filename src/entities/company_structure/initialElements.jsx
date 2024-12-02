import { icons } from "../../shared/ui/icons/header";
import dagre from 'dagre';

export const createGraph = (data, companyUsers) => {

    const g = new dagre.graphlib.Graph()
    g.setGraph({ rankdir: 'TB' })
    g.setDefaultEdgeLabel(() => ({}))

    let zIndexCounter = 1000

    data.forEach(department => {
        g.setNode(String(department.id), { width: 650, height: 200, label: department.title });
        if (department.parent !== 0) {
            g.setEdge(String(department.parent), String(department.id));
        }
    });

    dagre.layout(g);
    const nodes = [];
    const edges = [];

    g.nodes().forEach(nodeId => {
        

        const node = g.node(nodeId);
        console.log(node)
        if (!node) {
            return
        }

        const { x, y } = node
        const departmentData = data.find(dep => dep.id === Number(nodeId));

        if (!departmentData) {
            return
        }


        nodes.push({
            style: { zIndex: zIndexCounter }, 
            id: nodeId,
            type: 'departmentNode',
            data: {
                title: g.node(nodeId).label,
                photo: icons.profile,
                parent: g.node(nodeId).parent,
                users: departmentData.users,
                id: departmentData.id,
                color: departmentData.color,
                companyUsers: companyUsers
            },
            position: { x, y },
            draggable: false,
        });

        zIndexCounter--
    });

    g.edges().forEach(edge => {
        edges.push({
            style:{zIndex:-9999},
            id: `e${edge.v}-${edge.w}`,
            source: edge.v,
            target: edge.w,
            type: 'smoothstep',
        });
    });

    return { nodes, edges }
}