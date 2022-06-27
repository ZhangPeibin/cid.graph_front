const menuList = [
    {
      title: '首页', // 菜单标题名称
      key: '/home', // 对应的path
      icon: 'home', // 图标名称
      isPublic: true, // 公开的
    },
    {
      title: '商品',
      key: '/products',
      icon: 'appstore',
      children: [ // 子菜单列表
        {
          title: '品类管理',
          key: '/category',
          icon: 'bars'
        },
        {
          title: '商品管理',
          key: '/product',
          icon: 'tool'
        },
      ]
    },
    {
      title: 'web3工具箱',
      key:'/web3tool',
      icon:'tool'
    }
  ]
  
  export default menuList