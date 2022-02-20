//let ipUrl = "http://127.0.0.1:7001/admin/";
let ipUrl="http://47.97.26.45:7001/admin/"
let servicePath = {
    checkLogin : ipUrl+'checkLogin',// 首页接口
    getType : ipUrl+'getType',// 分类接口
    addArticle:ipUrl + 'addArticle' , // 添加文章
    updateArticle:ipUrl + 'updateArticle' , // 多次添加文章
    getArticlelist:ipUrl + 'getArticlelist',// 获取文章列表
    delArticle:ipUrl + 'delArticle/' ,  // 删除文章
    getArticleById:ipUrl + 'getArticleById/' ,  // 根据ID获得文章详情
    isLogin:ipUrl+ 'isLogin',// 判断用户是否登录的接口
    getBooks:ipUrl+ 'getBooks',//获取小册列表
    addBooks:ipUrl+ 'addBooks',//添加小册
}

export default servicePath