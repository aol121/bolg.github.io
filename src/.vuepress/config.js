module.exports = {
    dest: './docs',  // 设置输出目录
    base: '/wzp/',// 设置站点根路径
    title: '辰砂首页', // 显示在左上角的网页名称以及首页在浏览器标签显示的title名称
    description: '辰砂的前端记录', // meta 中的描述文字，用于SEO
    // 注入到当前页面的 HTML <head> 中的标签
    head: [
        ['link', { rel: 'icon', href: '/logo.png' }],  //浏览器的标签栏的网页图标
        ['link', { rel: 'stylesheet', href: '/live2dModels/live2d/css/common.css' }],  //引入css
        ['script', { type: 'text/javascript', src: '/live2dModels/live2d/js/live2d.js' }],  //引入live2d
        ['script', { type: 'text/javascript', src: '/live2dModels/live2d/js/init.js' }],  //引入live2d初始化脚本,async:'async'
    ],
    markdown: {
        lineNumbers: true
    },
    serviceWorker: true,
    themeConfig: {    
        logo: '/logo.png',
        lastUpdated: 'lastUpdate', // string | boolean
        nav: [
            { text: '首页', link: '/' },
            {
                text: '分类',
                ariaLabel: '分类',
                items: [
                    { text: '文章', link: '/pages/folder1/test1.md' },
                    { text: '琐碎', link: '/pages/folder2/test4.md' },
                ]
            },
            { text: '功能演示', link: '/pages/folder1/test3.md' },
            { text: 'Github', link: 'https://github.com/aol121/wzp' },
        ],
        sidebar: {
            '/pages/folder1/':[
                {
                    title: '开发笔记',   // 必要的
                    collapsable: false, // 可选的, 默认值是 true,
                    sidebarDepth: 1,    // 可选的, 默认值是 1
                    children: [
                        ['test1.md', '前端开发笔记'],
                        ['test3.md', 'vue笔记']
                    ]
                },
                {
                    title: '杂七杂八',
                    collapsable: false, // 可选的, 默认值是 true,
                    children: [
                        ['test2.md', 'vuepress+github搭建博客教程']
                    ]
                }
            ],
        }
    }
}