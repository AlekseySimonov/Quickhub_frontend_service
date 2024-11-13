import { icons } from "../../shared/ui/icons/header";

export const nodes = [
    {
        id: '1',
        style: {width: '300px'},
        type: 'directorNode',
        data: { photo: icons.profile,
                name: 'Якушев Илья',
                position: 'Директор компании'
            },
        position: { x: 0, y: 0 },
    },
    {
        id: '2',
        style: {width: '300px'},
        type: 'directorNode',
        data: { photo: icons.profile,
                name: 'Иванов Иван',
                position: 'Главный менеджер'
            },
        position: { x: -400, y: 200 },
    },
    {
        id: '3',
        style: {width: '300px'},
        type: 'designerNode',
        data: { photo: icons.profile,
                name: 'Симонов Алексей',
                position: 'Главный дизайнер'
            },
        position: { x: 400, y: 200 },
    },
    {
        id: '4',
        style: {width: '220px'},
        type: 'childNode',
        data: { photo: icons.profile,
                name: 'Симонов Алексей',
                position: 'Главный дизайнер'
            },
        position: { x: 80, y: 80 },
        parentId: '3',
    },

    {
        id: '5',
        style: {width: '220px'},
        type: 'childNode',
        data: { photo: icons.profile,
                name: 'Иванов Иван',
                position: 'Сотрудник'
            },
        position: { x: 80, y: 160 },
        parentId: '3',
    },
];

export const edges = [
    { id: 'e1-2', source: '1', target: '2', sourceHandle: 'source', targetHandle: 'target', type: 'step', },
    { id: 'e1-3', source: '1', target: '3', sourceHandle: 'source', targetHandle: 'target', type: 'step', },
    { id: 'e3-4', source: '3', target: '4', sourceHandle: 'source', targetHandle: 'target', type: 'step', },
    { id: 'e3-5', source: '3', target: '5', sourceHandle: 'source', targetHandle: 'target', type: 'step', },
];