# sscc

## 权限管理
### 1. 后台
  1. 后台 url 前缀 /api2/
  2. 登录用户才可以访问
  3. 任何请求,需要在 body 或者 url ,或者 header 里面带入 site 参数, 值为 site ID
  4. 验证所有的 /api2/xxx 必须为 site 的 createBy
 
#### 组件权限
1. Ship, Container, Component 的权限 为 createBy 所有. Create, Update, delete
2. Site 的 POST 权限为登录用户所有. 一个用户只能创建一个站点,
3. Site 的 CUD 操作,均为 createBy 所有

#### 组件验证
1. Ship, Container, Component 的 domain 和 siteID 联合 唯一
2. Site ID + createBy 联合唯一 ,限制一个用户管理一个站点

