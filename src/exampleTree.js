let tree = [
    {
        name: "раздел 1",
        depth: 0 ,
        path: "0",
        children: [
            {
                name: "папка 1-1 ",
                depth: 1 ,
                path: "0/0" ,
                children: [
                    {
                        name: "подпапка 1-1-1",
                        depth: 2 ,
                        path: "0/0/0" ,
                    },
                    {
                        name: "подпапка 1-1-2",
                        depth: 2 ,
                        path: "0/0/1" ,
                    }
                ]
            },
            {
                name: "папка 1-2",
                depth: 1 ,
                path: "0/1" ,
                children: [
                    {
                        name: "подпапка 1-2-1",
                        depth: 1 ,
                        path: "0/1/0" ,
                    },
                    {
                        name: "подпапка 1-2-2",
                        depth: 1 ,
                        path: "0/1/1" ,
                    }
                ]
            }
        ],
    },
    {
        name: "раздел 2",
        depth: 0 ,
        path: "1" ,
        children: [
            {
                name: "папка 2-1",
                depth: 1 ,
                path: "1/0" ,
                children: [
                    {
                        name: "подпапка 2-1-1",
                        depth: 2 ,
                        path: "1/0/0" ,
                    },
                    {
                        name: "подпапка 2-1-2",
                        depth: 2 ,
                        path: "1/0/1" ,
                    }
                ]
            }
        ],
    },
];
export default tree;