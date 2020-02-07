// Settings configured here will be merged into the final config object.

export default {
  menu: [
    {
      key: 1,
      name: '站点管理',
      icon: 'home',
      child: [
        {
          name: '站点列表',
          key: 102,
          path: '/sites'
        },
        {
          name: '新增站点',
          key: 101,
          path: '/add-site'
        },
      ]
    },
    {
      key: 2,
      name: '页面管理',
      icon: 'laptop',
      child: [
        {
          name: '页面列表',
          key: 202,
          path: '/ships',
        },
        {
          name: '新增页面',
          key: 201,
          path: '/ship',
        },
      ],
    }, {
      key: 3,
      name: '模块管理',
      icon: 'desktop',
      child: [
        {
          name: '模块列表',
          key: 302,
          path: '/containers',
        },
        {
          name: '新增模块',
          key: 301,
          path: '/container',
        },
      ],
    }, {
      key: 4,
      name: '组件管理',
      icon: 'credit-card',
      child: [
        {
          name: '组件列表',
          key: 402,
          path: '/compnts',
        },
        {
          name: '新增组件',
          key: 401,
          path: '/compnt',
        },
      ],
    }, {
      key: 5,
      name: '管理员管理',
      icon: 'team',
      child: [
        {
          name: '新增管理员',
          key: 502,
          path: '/admin'
        },
        {
          name: '设置管理员',
          key: 501,
          path: '/set-admin'
        },
        {
          name: '管理员列表',
          key: 503,
          path: '/admins',
        },
      ]
    },
  ],
};
