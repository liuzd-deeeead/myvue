// form.tsx
import {useForm} from 'react-hook-form';

// 表单项类型定义
export interface FormItem {
    /**
     * 输入框标签
     */
    label: string;
    /**
     * 输入框字段名 (唯一标识)
     */
    name: string;
    /**
     * 输入框类型 (默认 text)
     */
    type?: 'text' | 'password' | 'email' | 'number';
    /**
     * 是否必填 (默认 false)
     */
    required?: boolean;
    /**
     * 自定义验证规则
     */
    validate?: (value: string) => string | boolean;
}

// 组件 Props 类型
interface FormProps<T extends Record<string, any>> {
    /**
     * 表单项配置数组
     */
    items: [];
    /**
     * 表单提交回调
     */
    onSubmit:any;
    /**
     * 初始值
     */
    initialValues?: Partial<T>;
    /**
     * 提交按钮文本 (默认 '提交')
     */
}

// 泛型表单组件
export const Form = <T extends Record<string, any>>({
                                                        items,
                                                        onSubmit,
                                                        initialValues,

                                                    }: FormProps<T>) => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<T>({ defaultValues: initialValues });
console.log(items, '11')
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="form-container">
            {items.map((item) => (
                <div key={item.name} className="form-item">
                    <label className="form-label">
                        {item.label}
                        {item.required && <span className="required-asterisk">*</span>}
                    </label>
                    <input
                        type={item.type || 'text'}
                        className={`form-input ${errors[item.name] ? 'error' : ''}`}
                        {...register(item.name as any, {  // 注册字段并绑定验证规则
                            required: item.required ? `${item.label}不能为空` : false,
                            validate: item.validate
                        })}
                    />
                    {errors[item.name] && (
                        <span className="error-message">
              {errors[item.name]?.message?.toString()}
            </span>
                    )}
                </div>
            ))}
            <button type="submit" className="submit-button">
                查询
            </button>
        </form>
    );
};

// 样式示例（可以根据需要调整）
const styles = `
  .form-container {
    margin: 0 auto;
    padding: 20px;
    display:flex;
    flex-wrap:wrap;
  }

  .form-item {
    width:40%;
    margin-bottom: 15px;
  }

  .form-label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }

  .form-input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }

  .error {
    border-color: #ff4d4f;
  }

  .required-asterisk {
    color: #ff4d4f;
    margin-left: 3px;
  }

  .error-message {
    color: #ff4d4f;
    font-size: 12px;
    display: block;
    margin-top: 4px;
  }

  .submit-button {
    background-color: #1890ff;
    color: white;
    border: none;
    border-radius: 4px;
    padding:0;
    cursor: pointer;
    width:80px;
    height:40px;
  }

  .submit-button:hover {
    background-color: #40a9ff;
  }
`;

// 注入样式（如果使用 CSS-in-JS 方案可以调整）
const styleSheet = document.createElement('style');
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);