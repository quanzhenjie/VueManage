<template>
    <div class="tags-nav">
        <div class="close-con">
            <Dropdown transfer @on-click="closeTags" style="margin-top: 7px">
                <Button size="small" type="text">
                    <Icon :size="18" type="ios-close-circle-outline" />
                </Button>
                <DropdownMenu slot="list">
                    <DropdownItem name="close-all">关闭所有</DropdownItem>
                    <DropdownItem name="close-others">关闭其他</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
        <div class="btn-con left-btn">
            <Button type="text" style="padding: 6px 4px;line-height: 14px;text-align: center;" @click="handleScroll(240)">
                <Icon :size="18" type="ios-arrow-back" />
            </Button>
        </div>
        <div class="btn-con right-btn">
            <Button type="text" style="padding: 6px 4px;line-height: 14px;text-align: center;" @click="handleScroll(-240)">
                <Icon :size="18" type="ios-arrow-forward" />
            </Button>
        </div>
        <div class="scroll-outer" ref="scrollOuter" @DOMMouseScroll="handlescroll" @mousewheel="handlescroll">
            <div ref="scrollBody" class="scroll-body" :style="{left: tagBodyLeft + 'px'}">
                <transition-group name="taglist-moving-animation">
                    <Tag type="dot" v-for="(item,index) in list" :name="index" :key="`tag-nav-${index}`" checkable @click.native="GotoPage(item)" @on-close="closeTag" :closable="item.name == 'home'?false:true" :color="isCurrentTag(item) ? 'primary' : 'default'">{{item.title}}</Tag>
                </transition-group>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "TagsNav",
        props: {
            CurrentRoute : {},
            list: {}
        },
        data () {
            return {
                tagBodyLeft: 0
            }
        },
        methods : {
            GotoPage : function (item) {
                this.$emit('input', item);
            },
            isCurrentTag (item) {
                return this.CurrentRoute.name == item.name ? true : false;
            },
            closeTag : function(event,name){
                setTimeout(() => {
                    if(this.list[name].name == this.CurrentRoute.name){
                        this.GotoPage(this.list.length>name+1?this.list[name+1]:this.list[name-1]);
                    }
                    this.list.splice(name, 1);
                    this.$emit("saveT");
                }, 120);
            },
            closeTags : function (type) {
                let i=this.list.length-1;
                for(i;i>=0;i--){
                    if (type.includes('all')) {
                        if(this.list[i].name != "home"){
                            this.closeTag(null,i);
                        }
                    } else if (type.includes('others')) {
                        if(this.list[i].name != "home" && this.list[i].name != this.CurrentRoute.name){
                            this.closeTag(null,i);
                        }
                    }
                }
            },
            handlescroll (e) {
                var type = e.type
                let delta = 0
                if (type === 'DOMMouseScroll' || type === 'mousewheel') {
                    delta = (e.wheelDelta) ? e.wheelDelta : -(e.detail || 0) * 40
                }
                this.handleScroll(delta)
            },
            handleScroll (offset) {
                const outerWidth = this.$refs.scrollOuter.offsetWidth
                const bodyWidth = this.$refs.scrollBody.offsetWidth
                if (offset > 0) {
                    this.tagBodyLeft = Math.min(0, this.tagBodyLeft + offset)
                } else {
                    if (outerWidth < bodyWidth) {
                        if (this.tagBodyLeft < -(bodyWidth - outerWidth)) {
                            this.tagBodyLeft = this.tagBodyLeft
                        } else {
                            this.tagBodyLeft = Math.max(this.tagBodyLeft + offset, outerWidth - bodyWidth)
                        }
                    } else {
                        this.tagBodyLeft = 0
                    }
                }
            },
            moveToView (tag) {
                const outerWidth = this.$refs.scrollOuter.offsetWidth
                const bodyWidth = this.$refs.scrollBody.offsetWidth
                if (bodyWidth < outerWidth) {
                    this.tagBodyLeft = 0
                } else if (tag.offsetLeft < -this.tagBodyLeft) {
                    // 标签在可视区域左侧
                    this.tagBodyLeft = -tag.offsetLeft + this.outerPadding
                } else if (tag.offsetLeft > -this.tagBodyLeft && tag.offsetLeft + tag.offsetWidth < -this.tagBodyLeft + outerWidth) {
                    // 标签在可视区域
                    this.tagBodyLeft = Math.min(0, outerWidth - tag.offsetWidth - tag.offsetLeft - this.outerPadding)
                } else {
                    // 标签在可视区域右侧
                    this.tagBodyLeft = -(tag.offsetLeft - (outerWidth - this.outerPadding - tag.offsetWidth))
                }
            }
        },
        created () {
            //console.log(this.CurrentRoute);
        },
        computed : {

        }
    }
</script>

<style>
    .tags-nav{
        width: 100%;
        height: 40px;
        padding: 0;
        background: #f0f0f0;
        position: relative;
        border-top: 1px solid #f0f0f0;
        border-bottom: 1px solid #f0f0f0;
    }
    .close-con{
        position: absolute;
        top: 0;
        right: 0;
        height: 100%;
        background: #fff;
        z-index: 3;
    }
    .left-btn{
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        background: #fff;
        padding-top: 3px;
        z-index: 3;
    }
    .right-btn{
        position: absolute;
        top: 0;
        right: 32px;
        border-right: 1px solid #f0f0f0;
        height: 100%;
        background: #fff;
        padding-top: 3px;
        z-index: 3;
    }
    .scroll-outer{
        position: absolute;
        left: 28px;
        right: 61px;
        top: 0;
        bottom: 0;
        box-shadow:inset 0 0 3px 2px hsla(0,0%,39.2%,.1);
    }
    .scroll-body{
        position: absolute;
        height: calc(100% - 1px);
        padding: 1px 4px 0;
        overflow-x: hidden;
        overflow-y: visible;
        display: inline-block;
        white-space:nowrap;
    }
</style>