import React, { useState, useEffect } from 'react';
import marked from 'marked';
import '../statics/css/pages/addArticle.css';
import { Row, Col, Input, Select, Button, DatePicker, message,Divider } from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import servicePath from '../config/apiUrl'
import { useHistory } from 'react-router';
const { Option } = Select;
const { TextArea } = Input;
function AddArticle(props) {
    const history = useHistory()
    const [articleId, setArticleId] = useState(0)  // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
    const [articleTitle, setArticleTitle] = useState('') //文章标题
    const [articleContent, setArticleContent] = useState('')  //markdown的编辑内容
    const [markdownContent, setMarkdownContent] = useState('') //html内容
    const [introducemd, setIntroducemd] = useState() //简介的markdown内容
    const [introducehtml, setIntroducehtml] = useState('') //简介的html内容
    const [showDate, setShowDate] = useState()   //发布日期
    //const [updateDate, setUpdateDate] = useState() //修改日志的日期
    const [typeInfo, setTypeInfo] = useState([]) // 文章类别信息
    const [bookInfo, setBookInfo] = useState([]) // 文章小册类型
    const [selectedType, setSelectType] = useState(1) //选择的文章类别
    const [selectedBook, setSelectBook] = useState()//选择的小册类型
    const [addBook,setAddBook] = useState()//添加的小册类型
    marked.setOptions({
        renderer: marked.Renderer(),
        gfm: true,
        pedantic: false,
        sanitize: false,
        tables: true,
        breaks: false,
        smartLists: true,
        smartypants: false,
    });
    const changeContent = (e) => {
        setArticleContent(e.target.value)
        let html = marked(e.target.value)
        setMarkdownContent(html)
    }
    const changeIntroduce = (e) => {
        setIntroducemd(e.target.value)
        let html = marked(e.target.value)
        setIntroducehtml(html)
    }
    const getTypeInfo = () => {

        axios({
            method: 'get',
            url: servicePath.getType,
            header: { 'Access-Control-Allow-Origin': '*' },
            withCredentials: true
        }).then(
            res => {
                if (res.data.data === "没有登录") {
                    localStorage.removeItem('openId')
                    history.push('/login')
                } else {
                    setTypeInfo(res.data.data)
                }

            }
        )
    }
    const getBookInfo = ()=>{
        axios({
            method: 'get',
            url: servicePath.getBooks,
            header: { 'Access-Control-Allow-Origin': '*' },
            withCredentials: true
        }).then(
            res => {
                if (res.data.data === "没有登录") {
                    localStorage.removeItem('openId')
                    history.push('/login')
                } else {
                    setBookInfo(res.data.data)
                }

            }
        )
    }
    const selectTypeHandler = (value) => {
        setSelectType(value)
    }
    const selectBookHandler = (value) => {
        setSelectBook(value)
    }
    const onBookInputChange =  (input) =>{
        setAddBook(input.target.value)
    }
    const addBookClick = ()=>{
        if(!addBook){
            message.error('小册名称不能为空')
            return false
        }
        axios({
            method: 'post',
            url: servicePath.addBooks,
            header: { 'Access-Control-Allow-Origin': '*' },
            withCredentials: true,
           data:{
                addBook
            }
        }).then(
            res => {
                console.log(res)
            }
        )
        setAddBook()
    }
    const getArticleById = (id) => {
        axios(servicePath.getArticleById + id, {
            withCredentials: true,
            header: { 'Access-Control-Allow-Origin': '*' }
        }).then(
            res => {
                setArticleTitle(res.data.data[0].title)
                setArticleContent(res.data.data[0].article_content)
                let html = marked(res.data.data[0].article_content)
                setMarkdownContent(html)
                setIntroducemd(res.data.data[0].introduce)
                let tmpInt = marked(res.data.data[0].introduce)
                setIntroducehtml(tmpInt)
                setShowDate(res.data.data[0].addTime)
                setSelectType(res.data.data[0].typeId)

            }
        )
    }
    const saveArticle = () => {
        if (!selectedType) {
            message.error('必须选择文章类别')
            return false
        } else if (!articleTitle) {
            message.error('文章名称不能为空')
            return false
        } else if (!articleContent) {
            message.error('文章内容不能为空')
            return false
        } else if (!introducemd) {
            message.error('简介不能为空')
            return false
        } else if (!showDate) {
            message.error('发布日期不能为空')
            return false
        } else if (!selectedBook){
            message.error('请选择文章的小册')
            return false
        }
        let dataProps = {}   //传递到接口的参数
        dataProps.type_id = selectedType
        dataProps.title = articleTitle
        dataProps.article_content = articleContent
        dataProps.introduce = introducemd
        dataProps.book_id=selectedBook
        let datetext = showDate.replace('-', '/') //把字符串转换成时间戳
        dataProps.addTime = (new Date(datetext).getTime()) / 1000
        if (articleId === 0) {
            console.log('articleId=' + articleId)
            dataProps.view_count = Math.ceil(Math.random() * 100) + 1000
            axios({
                method: 'post',
                url: servicePath.addArticle,
                data: dataProps,
                withCredentials: true
            }).then(
                res => {
                    setArticleId(res.data.insertId)
                    if (res.data.isScuccess) {
                        message.success('文章保存成功')
                    } else {
                        message.error('文章保存失败');
                    }
                }
            )
        } else {
            dataProps.id = articleId
            axios({
                method: 'post',
                url: servicePath.updateArticle,
                header: { 'Access-Control-Allow-Origin': '*' },
                data: dataProps,
                withCredentials: true
            }).then(
                res => {
                    if (res.data.isScuccess) {
                        message.success('文章保存成功')
                    } else {
                        message.error('保存失败');
                    }
                }
            )
        }
    }
    useEffect(() => {
        getTypeInfo()
        getBookInfo()
        //获得文章ID
        let tmpId = props.match.params.id
        if (tmpId) {
            setArticleId(tmpId)
            getArticleById(tmpId)
        }
    }, [])
    return (
        <div>
            <Row gutter={5}>
                <Col span={18}>
                    <Row gutter={10} >
                        <Col span={20}>
                            <Input
                                value={articleTitle}
                                placeholder="博客标题"
                                size="large"
                                onChange={e => {
                                    setArticleTitle(e.target.value)
                                }} />
                        </Col>
                        <Col span={4}>
                            &nbsp;
                            <Select defaultValue={"技术博客"} size="large" onChange={selectTypeHandler}>
                                {
                                    typeInfo.map((item, index) => {
                                        return (<Option key={index} value={item.id}>{item.typename}</Option>)
                                    })
                                }
                            </Select>
                        </Col>
                    </Row>
                    <br />
                    <Row gutter={10} >
                        <Col span={12}>
                            <TextArea
                                className="markdown-content"
                                rows={35}
                                placeholder="文章内容"
                                onChange={changeContent}
                                onPressEnter={changeContent}
                            />
                        </Col>
                        <Col span={12}>
                            <div
                                className="show-html"
                                dangerouslySetInnerHTML={{ __html: markdownContent }}>
                            </div>
                        </Col>
                    </Row>

                </Col>

                <Col span={6}>
                    <Row>
                        <Col span={24}>
                            <Button size="large">暂存文章</Button>&nbsp;
                            <Button type="primary" size="large" onClick={saveArticle}>发布文章</Button>
                            <br />
                        </Col>
                        <Col span={24}>
                            <br />
                            <TextArea
                                rows={4}
                                placeholder="文章简介"
                                onChange={changeIntroduce}
                                onPressEnter={changeIntroduce}
                            />
                            <br /><br />
                            <div
                                className="introduce-html"
                                dangerouslySetInnerHTML={{ __html: '文章简介：' + introducehtml }}>
                            </div>
                        </Col>
                        <Col span={12}>
                            <div className="date-select">
                                <DatePicker
                                    onChange={(date, dateString) => setShowDate(dateString)}
                                    placeholder="发布日期"
                                    size="large"
                                />
                            </div>
                        </Col>
                        <Col span={12}>
                            <div className="artical-book">
                                &nbsp;
                                <Select  style={{width:'80%'}} defaultValue={"选择小册"} size="large" onChange={selectBookHandler}
                                dropdownRender={menu => (
                                    <div>
                                      {menu}
                                      <Divider style={{ margin: '4px 0' }} />
                                      <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>
                                        <Input style={{ flex: 'auto' }} value={addBook} onChange={onBookInputChange} />
                                        <a
                                          style={{ flex: 'none', padding: '8px', display: 'block', cursor: 'pointer' }}
                                          onClick={addBookClick}
                                        >
                                          <PlusOutlined /> 添加小册
                                        </a>
                                      </div>
                                    </div>
                                  )}>
                                    {
                                        bookInfo.map((item, index) => {
                                            return (<Option key={index} value={item.id}>{item.bookname}</Option>)
                                        })
                                    }
                                </Select>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}

export default AddArticle