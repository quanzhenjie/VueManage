<template>
    <div id="app">
        <layout v-if="this.topMenuActiveName != '/Login'">
            <header class="header">
                <row>
                    <i-col span="5" offset="1">
                        <img src="https://file.iviewui.com/dist/e1cf12c07bf6458992569e67927d767e.png" alt="logo" class="logo">
                    </i-col>
                    <i-col span="13">
                        <Menu mode="horizontal" :active-name="topMenuActiveName" @on-select="topMenuSelected" style="height: 66px;line-height: 66px;">
                            <MenuItem name="/" to="/">
                                <Icon type="md-home" size="20" />首页
                            </MenuItem>
                            <MenuItem name="/logs" to="/logs">
                                <Icon type="ios-bug" size="20" />日志
                            </MenuItem>
                            <MenuItem name="/message" to="/message">
                                <Icon type="ios-notifications" size="20" />
                                <Badge :offset="[25,0]" dot>
                                    消息
                                </Badge>
                            </MenuItem>
                            <MenuItem name="exit">
                                <Icon type="md-exit" size="20" />退出
                            </MenuItem>
                        </Menu>
                    </i-col>
                    <i-col span="5">
                        <row>
                            <i-col span="4" class="topUser">
                                <Tooltip :content="isFullScreen ? '退出全屏': '全屏显示'">
                                    <Icon :type="isFullScreen ? 'md-contract': 'md-expand'" @click="handleFullscreen" size="25" style="cursor: pointer" />
                                </Tooltip>
                            </i-col>
                            <i-col span="6" class="topUser">
                                <Dropdown>
                                    <a href="javascript:void(0)">
                                        <font color="blue">语言</font>
                                        <Icon type="md-arrow-dropdown" size="20" color="blue" />
                                    </a>
                                    <DropdownMenu slot="list">
                                        <DropdownItem>简体中文</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </i-col>
                            <i-col span="14" class="topUser">
                                <Avatar icon="ios-person" size="large" /> 管理员
                            </i-col>
                        </row>
                    </i-col>
                </row>
            </header>
            <layout>
                <sider class="sider" width="250" collapsible v-model="isCollapsibled">
                    <Menu active-name="" theme="dark" width="auto">
                        <Submenu name="1">
                            <template slot="title">
                                <Icon type="ios-navigate"></Icon>
                                <label class="menuName">一级菜单 1</label>
                            </template>
                            <MenuItem name="1-1"><label class="menuName">二级菜单 1</label></MenuItem>
                            <MenuItem name="1-2"><label class="menuName">二级菜单 2</label></MenuItem>
                            <MenuItem name="1-3"><label class="menuName">二级菜单 3</label></MenuItem>
                        </Submenu>
                        <Submenu name="2">
                            <template slot="title">
                                <Icon type="ios-keypad"></Icon>
                                <label class="menuName">一级菜单 2</label>
                            </template>
                            <MenuItem name="2-1"><label class="menuName">二级菜单 1</label></MenuItem>
                            <MenuItem name="2-2"><label class="menuName">二级菜单 2</label></MenuItem>
                        </Submenu>
                        <Submenu name="3">
                            <template slot="title">
                                <Icon type="ios-analytics"></Icon>
                                <label class="menuName">一级菜单 3</label>
                            </template>
                            <MenuItem name="3-1"><label class="menuName">二级菜单 1</label></MenuItem>
                            <MenuItem name="3-2"><label class="menuName">二级菜单 2</label></MenuItem>
                        </Submenu>
                    </Menu>
                </sider>
                <div class="tag-nav-wrapper" :class="{'tagnav-expand':isCollapsibled}">
                    <TagsNav :CurrentRoute="tagNavCurrentRoute" :list="tabsNavList" :All="tagNavList.routes" @input="turnToPage" @saveT="saveTags" />
                </div>
                <content class="content" :class="{'conent-expand':isCollapsibled}">
                    <keep-alive :include="tabsNavNameList">
                        <router-view class="routerContent"></router-view>
                    </keep-alive>
                </content>
                <footer></footer>
            </layout>
        </layout>
        <router-view v-if="this.topMenuActiveName == '/Login'"></router-view>
    </div>
</template>
<script>
    import TagsNav from './components/TagsNav/tags-nav'
    export default {
        // name: 'main',
        components: {
            TagsNav
        },
        data() {
            return {
                user : "admin",
                isFullScreen : false,
                isCollapsibled : false,
                topMenuActiveName : "/",
                // BreadcrumbItems : [],    //弃用面包屑
                tagNavCurrentRoute : this.$router.history.current,
                tabsNavNameList : [],
                tabsNavList : [this.$router.options.routes[0]]
            }
        },
        watch : {
            $route () {
                this.tagNavCurrentRoute = this.$router.history.current;
                this.topMenuActiveName = this.$router.history.current.path;
                let haveTab = false;//在标签数组中有没有当前标签
                for(let i=0;i<this.tabsNavList.length;i++){
                    if(this.tabsNavList[i].name == this.$router.history.current.name){
                        haveTab = true;
                        break;
                    }
                }
                if(!haveTab){
                    for(let j=0;j<this.$router.options.routes.length;j++){
                        if(this.$router.options.routes[j].name == this.$router.history.current.name && this.$router.history.current.path != "/Login"){
                            this.tabsNavList.push(this.$router.options.routes[j]);
                            this.saveTags();
                            break;
                        }
                    }
                }else {
                    // this.saveTags();
                    //在标签中找到当前标签
                }
                // switch (this.$router.history.current.path) {
                //     case "/":
                //         this.BreadcrumbItems = [];
                //         break;
                //     case "/logs":
                //         this.BreadcrumbItems = [{"to":"/logs","name":"日志"}];
                //         break;
                //     case "/message":
                //         this.BreadcrumbItems = [{"to":"/message","name":"消息"}];
                //         break;
                //     //......这里添加更多的路由页面
                // }

                if(this.topMenuActiveName != '/Login'){
                    //登录成功
                    window.onresize = function(){
                        document.getElementsByClassName('content')[0].style.height = (document.documentElement.clientHeight - 108) + 'px';
                    }
                    this.$nextTick(()=>{
                        document.getElementsByClassName('content')[0].style.height = (document.documentElement.clientHeight - 108) + 'px';
                    });
                }
            }
        },
        methods : {
            topMenuSelected : function(name){
                if(name == "exit"){
                    this.turnToPage(this.$router.options.routes[0]);
                    this.tabsNavList = [this.$router.options.routes[0]];
                    this.saveTags();
                    this.$router.push({name:"Login"});
                    // window.location.reload();
                }
            },
            handleFullscreen : function() {
                let main = document.body;
                if (this.isFullScreen) {
                    if (document.exitFullscreen) {
                        document.exitFullscreen()
                    } else if (document.mozCancelFullScreen) {
                        document.mozCancelFullScreen()
                    } else if (document.webkitCancelFullScreen) {
                        document.webkitCancelFullScreen()
                    } else if (document.msExitFullscreen) {
                        document.msExitFullscreen()
                    }
                    this.isFullScreen = false;
                } else {
                    if (main.requestFullscreen) {
                        main.requestFullscreen()
                    } else if (main.mozRequestFullScreen) {
                        main.mozRequestFullScreen()
                    } else if (main.webkitRequestFullScreen) {
                        main.webkitRequestFullScreen()
                    } else if (main.msRequestFullscreen) {
                        main.msRequestFullscreen()
                    }
                    this.isFullScreen = true;
                }
            },
            turnToPage (route) {
                this.$router.push({name:route.name}).catch(data => {});
            },
            saveTags (){
                sessionStorage.setItem(this.user,JSON.stringify(this.tabsNavList));
                this.tabsNavNameList = [];
                this.tabsNavList.forEach((item,key) => {
                    this.tabsNavNameList[key] = item.name;
                });
            }
        },
        computed : {
            tagNavList () {
                return this.$router.options;
            }
        },
        beforeCreate : function() {
            //this.user = "";//这里获取用户名
        },
        created : function() {
            let routeTags = JSON.parse(sessionStorage.getItem(this.user));
            this.tabsNavList = routeTags?routeTags:this.tabsNavList;
        }
    }
</script>
<style>
    body{
        background-color: #F5F7F9;
        overflow-x: hidden;
    }
    .header{
        width: 100%;
        height: 66px;
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.05);
        position: fixed;
        z-index: 10;
    }
    .logo{
        height: 66px;
    }
    .ivu-menu-horizontal.ivu-menu-light:after{
        display: none;
    }
    .topUser{
        height: 66px;
        line-height: 66px;
    }
    .sider{
        position: fixed;
        height: 100%;
        left: 0px;
        top: 66px;
        z-index: 9;
    }
    .ivu-layout-sider-collapsed ul ul{
        display: none;
    }
    .ivu-layout-sider-collapsed .menuName{
        display: none;
    }
    .ivu-layout-sider-collapsed .ivu-menu-submenu-title-icon{
        display: none;
    }
    .content{
        width: 100%;
        margin-left: 250px;
        margin-top: 106px;
        padding: 0;
        transition: all .2s ease-in-out;
    }
    .tag-nav-wrapper{
        width: calc(100% - 250px);
        position: fixed;
        right: 0px;
        top: 66px;
        z-index: 3;
    }
    .conent-expand{
        margin-left: 64px;
    }
    .tagnav-expand{
        width: calc(100% - 64px);
    }
    .routerContent{
        height: 100%;
        padding: 10px 15px;
    }
</style>
