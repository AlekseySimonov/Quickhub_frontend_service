import { icons } from "../../shared/ui/icons/header";
import dagre from 'dagre';

const jsonData = [
        {
            id: 1,
            title: '',
            parent: 0,
            users: [
                {
                    id: 1,
                    position: 'Директор',
                    email: 'director@example.com',
                    fullName: 'Алексей Смирнов'
                }
            ]
        },
        {
            id: 2,
            title: 'Отдел продаж',
            parent: 1,
            users: [
                {
                    id: 2,
                    position: 'Руководитель',
                    email: 'sales_manager@example.com',
                    fullName: 'Иван Иванов'
                },
                {
                    id: 3,
                    position: 'Сотрудник',
                    email: 'sales_employee_1@example.com',
                    fullName: 'Мария Петрова'
                },
                {
                    id: 4,
                    position: 'Сотрудник',
                    email: 'sales_employee_2@example.com',
                    fullName: 'Сергей Кузнецов'
                },
                {
                    id: 5,
                    position: 'Сотрудник',
                    email: 'sales_employee_3@example.com',
                    fullName: 'Анна Сидорова'
                },
                {
                    id: 6,
                    position: 'Сотрудник',
                    email: 'sales_employee_4@example.com',
                    fullName: 'Петр Васильев'
                }
            ]
        },
        {
            id: 3,
            title: 'Отдел разработки',
            parent: 2,
            users: [
                {
                    id: 7,
                    position: 'Руководитель',
                    email: 'dev_manager@example.com',
                    fullName: 'Дмитрий Васильев'
                },
                {
                    id: 8,
                    position: 'Разработчик',
                    email: 'developer_1@example.com',
                    fullName: 'Елена Григорьева'
                },
                {
                    id: 9,
                    position: 'Разработчик',
                    email: 'developer_2@example.com',
                    fullName:'Андрей Федоров'
                },
                {
                id: 10,
                position:'Тестировщик',
                email:'tester_1@example.com',
                fullName:'Ольга Лебедева'
            },
            {
                id: 11,
                position:'Тестировщик',
                email:'tester_2@example.com',
                fullName:'Виктория Романова'
            }
            ]
        },
        {
            id: 4,
            title:'Отдел дизайна',
            parent: 3,
            users:[
            {
                id: 12,
                position:'Руководитель',
                email:'design_manager@example.com',
                fullName:'Игорь Смирнов'
            },
            {
                id: 13,
                position:'Дизайнер',
                email:'designer_1@example.com',
                fullName:'Анастасия Николаева'
            },
            {
                id: 14,
                position:'Дизайнер',
                email:'designer_2@example.com',
                fullName:'Павел Соловьев'
            },
            {
                id: 15,
                position:'Дизайнер',
                email:'designer_3@example.com',
                fullName:'Ксения Коваленко'
            },
            {
                id: 16,
                position:'Дизайнер',
                email:'designer_4@example.com',
                fullName:'Роман Зайцев'
            }
            ]
        },
        {
        id: 5,
        title:'Отдел маркетинга',
        parent: 3,
        users:[
            {
                id: 17,
                position:'Руководитель',
                email:'marketing_manager@example.com',
                fullName:'Наталья Петрова'
            },
            {
                id: 18,
                position:'Маркетолог',
                email:'marketer_1@example.com',
                fullName:'Светлана Сергеева'
            },
            {
                id: 19,
                position:'Маркетолог',
                email:'marketer_2@example.com',
                fullName:'Владимир Костин'
            },
            {
                id: 20,
                position:'Аналитик',
                email:'analyst_1@example.com',
                fullName:'Григорий Михайлов'
            },
            {
                id: 21,
                position:'Аналитик',
                email:'analyst_2@example.com',
                fullName:'Евгений Рябов'
            }
        ]
        },
        {
        id: 6,
        title:'Отдел HR',
        parent: 1,
        users:[
            {
                id :22, 
                position :'Руководитель', 
                email :'hr_manager@example.com', 
                fullName :'Татьяна Иванова'
            }, 
            { 
                id :23, 
                position :'HR-менеджер', 
                email :'hr_specialist_1@example.com', 
                fullName :'Олег Петров' 
            }, 
            { 
                id :24, 
                position :'HR-менеджер', 
                email :'hr_specialist_2@example.com', 
                fullName :'Кирилл Сидоров' 
            }, 
            { 
                id :25, 
                position :'Специалист по обучению', 
                email :'trainer_1@example.com', 
                fullName :'Мария Громова' 
            }, 
            { 
                id :26, 
                position :'Специалист по обучению', 
                email :'trainer_2@example.com', 
                fullName :'Екатерина Фролова' 
            } 
        ] 
    }, 
    { 
        id :7, 
        title :'Отдел IT',  
        parent :1,  
        users :[  
            {  
                id :27,  
                position :'Руководитель',  
                email :'it_manager@example.com',  
                fullName :'Денис Михайлов'  
            },  
            {  
                id :28,  
                position :'Системный администратор',  
                email :'sys_admin_1@example.com',  
                fullName :'Тимур Алексеев'  
            },   
            {   
                id :29,   
                position :'Системный администратор',   
                email :'sys_admin_2@example.com',   
                fullName :'Олег Петров'   
            },   
            {   
                id :30,   
                position :'Разработчик',   
                email :'it_developer_1@example.com',   
                fullName :'Станислав Ковалев'   
            },   
            {   
                id :31,   
                position :'Разработчик',   
                email :'it_developer_2@example.com',   
                fullName :'Валентин Романов'   
            }   
        ]   
    }, 

    {   
        id :8,   
        title :'Отдел логистики',    
        parent :1,    
        users :[    
            {    
                id :32,    
                position :'Руководитель',    
                email :'logistics_manager@example.com',    
                fullName :'Геннадий Сухов'    
            },    
            {    
                id :33,    
                position :'Логист',    
                email :'logistics_specialist_1@example.com',    
                fullName :'Лариса Кузнецова'    
            },    
            {    
                id :34,    
                position :'Логист',    
                email :'logistics_specialist_2@example.com',    
                fullName :'Валерий Дубровский'    
            },    
            {    
                id :35,    
                position :'Кладовщик',    
                email :'warehouse_keeper_1@example.com',    
                fullName :'Михаил Гаврилов'    
            },     
            {     
                id :36,     
                position :'Кладовщик',     
                email :'warehouse_keeper_2@example.com',     
                fullName :'Наталья Синицина'     
            }     
        ]     
    },    

    ]

const createGraph = (data) => {
    const g = new dagre.graphlib.Graph()
    g.setGraph({ rankdir: 'TB' })
    g.setDefaultEdgeLabel(() => ({}))

    data.forEach(department => {
        g.setNode(String(department.id), { width: 550,height: 200, label: department.title })
        if (department.parent !== 0) {
            g.setEdge(String(department.parent), String(department.id))
        }
    })

    dagre.layout(g);

    const nodes = [];
    const edges = [];

    g.nodes().forEach(nodeId => {
        const { x, y } = g.node(nodeId)
        const departmentData = data.find(dep => dep.id === Number(nodeId))

        nodes.push({
            id: nodeId,
            type: 'departmentNode',
            data: { 
                title: g.node(nodeId).label,
                photo: icons.profile,
                psrent: g.node(nodeId).parent,
                users: departmentData.users,
            },
            position: { x, y },
            draggable: false,
        })
    });

    g.edges().forEach(edge => {
        edges.push({
            id: `e${edge.v}-${edge.w}`,
            source: edge.v,
            target: edge.w,
            type: 'smoothstep',
        });
    });

    return { nodes, edges }
};

export const { nodes, edges } = createGraph(jsonData)