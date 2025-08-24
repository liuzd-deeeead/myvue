import {useEffect, useState} from 'react';
import {Card, Table, Space, Tag, Button} from 'antd';
import {Form} from '@/components';

import type {TableProps} from 'antd';
import {useNavigate} from "react-router-dom";

// 定义统一类型
interface LoginForm {
    planName: string;  // 新增查询字段
    page?: number;
    pageSize?: number;
}

interface PlanRecord {
    planId: number;
    planName: string;
    status: string;
    createDept: string;
    username: string | null;
}

interface MyBatisPlusResponse {
    records: PlanRecord[];
    total: number;
    size: number;
    current: number;
}

interface AntdTableData {
    key: string;
    name: string;
    status: string;
    dept: string;
    owner: string;
}

export default function Test() {
    const navigate = useNavigate();
    const [tableData, setTableData] = useState<AntdTableData[]>([]);
    const [pagination, setPagination] = useState({current: 1, pageSize: 10, total: 0});
    const [loading, setLoading] = useState(false);

    // 优化后的表单配置
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

    ]

    // 重构后的提交处理
    const handleSubmit = async (formData: LoginForm) => {
        try {
            setLoading(true);
            const {data, pagination} = await fetchData({
                ...formData,
                page: 1,
                pageSize: 10
            });

            setTableData(data);
            setPagination(pagination);
        } catch (error) {
            console.error('查询失败:', error);
        } finally {
            setLoading(false);
        }
    };

    // 优化后的数据获取
    const fetchData = async (params: LoginForm) => {
        const response = await fetch('/api/query', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(params)
        });

        const jsonData: MyBatisPlusResponse = await response.json();
        return {
            data: jsonData.data.records.map(record => ({
                key: String(record.planId),
                name: record.planName,
                status: record.status === '1' ? '启用' : '停用',
                dept: record.createDept,
                owner: record.username || '未分配'
            })),
            pagination: {
                total: jsonData.total,
                pageSize: jsonData.size,
                current: jsonData.current
            }
        };
    };

    // 表格配置
    const columns: TableProps<AntdTableData>['columns'] = [
        {
            title: '计划名称',
            dataIndex: 'name',
            key: 'name',
            render: text => <a>{text}</a>
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render: status => <Tag color={status === '启用' ? 'green' : 'red'}>{status}</Tag>
        },
        {
            title: '所属部门',
            dataIndex: 'dept',
            key: 'dept'
        },
        {
            title: '负责人',
            dataIndex: 'owner',
            key: 'owner'
        },
        {
            title: '操作',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button onClick={() => navigate(`/createPlan/${record.key}`)}>详情</Button>
                    <Button danger>删除</Button>
                </Space>
            )
        }
    ];
useEffect(()=>{
    handleSubmit();

},[])

    return (
        <>
            <Card>
                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 16}}>
                    <Form<LoginForm>
                        items={formItems}
                        onSubmit={handleSubmit}
                    />
                    <Button type="primary" onClick={() => navigate('/createPlan')}>
                        创建计划
                    </Button>
                </div>
            </Card>

            <Card>
                <Table
                    columns={columns}
                    dataSource={tableData}
                    pagination={{
                        ...pagination,
                        showSizeChanger: true,
                        onChange: (page, pageSize) => {
                            setPagination(prev => ({...prev, current: page, pageSize}));
                            handleSubmit({planName: form.getFieldValue('planName'), page, pageSize});
                        }
                    }}
                    loading={loading}
                    rowKey="key"
                />
            </Card>
        </>
    );
}