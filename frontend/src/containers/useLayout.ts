export const useLayout = () => {
    const layout_8_16 = {
        labelCol: {span: 8},
        wrapperCol: {span: 16},
    };

    const layout_4_20 = {
        labelCol: {
            span: 4,
        },
        wrapperCol: {
            span: 20,
        },
    };
    const tailLayout = {
        wrapperCol: {
            offset: 4,
            span: 20,
        },
    };

    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 8 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 },
        },
    };
    const tailFormItemLayout = {
        wrapperCol: {
            xs: {
                span: 24,
                offset: 0,
            },
            sm: {
                span: 16,
                offset: 8,
            },
        },
    };

    return {
        layout_8_16,
        layout_4_20,
        tailLayout,
        formItemLayout,
        tailFormItemLayout
    }
}
