/**
 * Layout
 * Created by 王佳欣 on 2018/6/4.
 */
import layoutEjs from './layout.ejs';
import headerEjs from './header.ejs';
import footerEjs from './footer.ejs';

// 渲染页面
export default {
    render: ({title, keyword, description, content, gLoading = true}) => {
        const renderData = {
            title,
            keyword,
            description,
            header: headerEjs(),
            footer: footerEjs(),
            content: typeof content === 'string' ? content : content(),
            console: process.env.NODE_ENV !== 'production',
            gLoading
        };
        return layoutEjs(renderData);
    }
};
