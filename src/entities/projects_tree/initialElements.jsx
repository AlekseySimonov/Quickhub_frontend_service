import dagre from 'dagre';

export const createGraph = ({ data, companyTitle }) => {
    const g = new dagre.graphlib.Graph();
    g.setGraph({ rankdir: 'LR' }); 
    g.setDefaultEdgeLabel(() => ({}));

    let zIndexCounter = 1000;

    const companyNodeId = '0';
    g.setNode(companyNodeId, { width: 150, height: 50, label: companyTitle });

    data.forEach(project => {
        g.setNode(String(project.id), { width: 200, height: 100, label: project.title });
        g.setEdge(companyNodeId, String(project.id));
    });

    dagre.layout(g);
    
    const nodes = [];
    const edges = [];

    g.nodes().forEach(nodeId => {
        const node = g.node(nodeId);
        if (!node) {
            return;
        }

        const { x, y } = node;
        let projectData = data.find(proj => proj.id === Number(nodeId));

        if (!projectData && nodeId === companyNodeId) {
            projectData = { title: companyTitle }; 
        }

        nodes.push({
            style: { zIndex: zIndexCounter },
            id: nodeId,
            type: 'projectNode', 
            data: {
                title: projectData.title,
                users: projectData.users || [],
                id: projectData.id || null,
                color: projectData.color || null,
            },
            position: { x, y },
            draggable: false,
        });

        zIndexCounter--;
    });

    g.edges().forEach(edge => {
        edges.push({
            style: { zIndex: -9999 },
            id: `e${edge.v}-${edge.w}`,
            source: edge.v,
            target: edge.w,
            type: 'smoothstep', 
        });
    });

    return { nodes, edges };
};