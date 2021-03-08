// src/mock.js
const Mock = require('mockjs')
const Random = Mock.Random

const getResource = () => {
    let resources = []
    for (let i = 0; i < 10; i++) {
        resources.push({
            id: Random.date() + ' ' + Random.time(),
            label: '一级' + Random.csentence(2, 5),
            children: [{
                label: '二级 1-1-1'
            }]
        })
    }
    return resources
}
/**
 * 格式： Mock.mock(url, post/get , 返回的数据)；
 * 当post或get请求到路由的时候mock会拦截并返回
 * 注意写全路径
 **/
Mock.mock('/getResource', 'get', getResource())

Mock.mock('/login/code', 'get', function () {
    return { code: 200, msg: '' }
})

Mock.mock('/api/v1/send/verify/code', 'post', function () {
    return { code: 200, msg: '', data: { token: "aabbcc", refreshToken: 'aabbcc' } }
})


Mock.mock('/api/v1/user/login/by/phone', 'post', function () {
    return { code: 200, msg: '', data: { token: "aabbcc", refreshToken: 'aabbcc' } }
})

Mock.mock('/api/v1/get/user/info/by/token', 'post', function () {
    return { code: 20000, msg: '', data: { token: "aabbcc", refreshToken: 'aabbcc' } }
})

Mock.mock('/api/user', 'post', function () {
    let list = []
    for (let i = 0; i < 10; i++) {
        list.push({
            userId: i + 1,
            avatar: 'assets/image/user.png',
            name: '朱鹏飞',
            phone: '13523025454',
            sex: 0,
        })
    }
    return { code: 200, msg: '', data: list }
})

Mock.mock('/api/get/device/list', 'post', function () {
    let list = []
    for (let i = 0; i < 10; i++) {
        list.push({
            id: i + 1,
            deviceName: '朱鹏飞',
            createdAt: '2020-01-01',
        })
    }
    return { code: 200, msg: '', data: { total: 100, pageTotal: 10, items: list } }
})

Mock.mock('/api/get/device/detail', 'post', function () {
    let data = {
        deviceName: 'test',
        imme: '1111111',
        deviceTypeId: 1,
        companyId: 1,
    }
    return { code: 200, msg: '', data: data }
})


