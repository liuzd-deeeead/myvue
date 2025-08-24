// App.tsx
import {Form} from '@/components';
import {Card} from "antd";

console.log(Form, '11')
import {Space, Table, Tag} from 'antd';
import type {TableProps} from 'antd';
import {useNavigate,useParams} from "react-router-dom";


export default function Test() {
    const navigate = useNavigate();
    const { id } = useParams();

    console.log(id, '88')

    const fetchData = async (params:any) => {
        const response = await fetch('/api/query', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(params)
        });

        const jsonData = await response.json();
        return {
            data: jsonData.data.records.map(record => ({
                key: String(record.planId),
                name: record.planName,
                status: record.status === '1' ? '启用' : '停用',
                dept: record.createDept,
                owner: record.username || '未分配'
            })),
        };
    };
    const getDetail =async ()=>{
        let {data} = await fetchData({'planId':id})
        console.log(data, '99')
    }
    if(id){
        getDetail()
    }    // 表单配置
    const formItems = [
        {
            label: '计划名称',
            name: 'planName',
        },
        {
            label: '状态',
            name: 'status',
        }, {
            label: '部门',
            name: 'createDept',
        },

    ] as FormItem[];

    // 提交处理
    const handleSubmit = (data) => {
        console.log('提交数据:', data);
        data.username =import.meta.env.VITE_USERNAME
        fetch('/api/createPlan',{
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
    };


    interface DataType {
        key: string;
        name: string;
        age: number;
        address: string;
        tags: string[];
    }

    const columns: TableProps<DataType>['columns'] = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Tags',
            key: 'tags',
            dataIndex: 'tags',
            render: (_, {tags}) => (
                <>
                    {tags.map((tag) => {
                        let color = tag.length > 5 ? 'geekblue' : 'green';
                        if (tag === 'loser') {
                            color = 'volcano';
                        }
                        return (
                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a>Invite {record.name}</a>
                    <a>Delete</a>
                </Space>
            ),
        },
    ];

    const data: DataType[] = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            tags: ['nice', 'developer'],
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
            tags: ['loser'],
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sydney No. 1 Lake Park',
            tags: ['cool', 'teacher'],
        },
    ];
    return (
        <>
            <Card>
                <Form<LoginForm>
                    items={formItems}
                    onSubmit={handleSubmit}
                    submitText="提交"
                />
            </Card>
            <Card>
                <Table<DataType> columns={columns} dataSource={data}/>
            </Card>
        </>

    );
};