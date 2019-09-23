<template>
    <div>
        <h1>这是一个打印DEMO页面</h1>
        <button @click="print_test">{{remark}}</button>
        <div id="PrintDiv">

            <div class="outer" style="display: inline-block; width:210mm;margin-bottom: 20px">
                <div class="topinfo" style="float: left; width: 100%;font-size: 14px;padding-bottom: 10px">
                    <div class="tleft textl" style="float: left; height:80px;width:30%;height:20px;padding-top:64px;text-align: left;overflow: hidden;">核算单位:上海心连旅馆</div>
                    <div class="tmid textc" style="float: left; height:80px;width:35%;text-align: center"><span class="title" style="float: left;width: 100%;text-align: center;font-size: 24px;font-weight: 700;margin-bottom:30px">记账凭证</span><span class="date" style="float: left;width: 100%;text-align: center">日期:2019-12-31</span></div>
                    <div class="tright textr" style="float: left; height:80px;width:34%;text-align:right">
                        <p style="margin: 0;margin-top:8px">附件数:0张</p>
                        <p style="margin: 0;margin-top:8px">本位币:人民币 单位:元</p>
                        <p style="margin: 0;margin-top:8px">第0001号-0001/0001</p>
                    </div>
                </div>
                <table cellspacing="0" cellpadding="0" border="0" class="print-table" style="float:left;border-collapse: separate;border-collapse: collapse;font-size: 14px;">
                    <thead>
                    <tr class="" style="height:30px">
                        <td class="td-vchrAbstr" style="width:70mm;border:1px solid #000;border-collapse: collapse;padding:2px 2px;">
                            <div class="vchrAbstr">摘要</div>
                        </td>
                        <td class="td-acctId" style="width:70mm;border:1px solid #000;border-collapse: collapse;padding:2px 2px;">
                            <div class="acctId">会计科目</div>
                        </td>
                        <td class="td-debitAmt" style="width:30mm;border:1px solid #000;border-collapse: collapse;padding:2px 2px;">
                            <div class="debitAmt">借方</div>
                        </td>
                        <td class="td-creditAmt" style="width:38mm;border:1px solid #000;border-collapse: collapse;padding:2px 2px;">
                            <div class="creditAmt">贷方</div>
                        </td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr class="" style="height:70px;">
                        <td class="td-vchrAbstr" style="border:1px solid #000;border-collapse: collapse;padding:2px 2px;">
                            <div class="vchrAbstr">结转本年利润结转本年利润(df)(ghjgfhj) dgdsg sdgdsfg dfg </div>
                        </td>
                        <td class="td-acctId" style="border:1px solid #000;border-collapse: collapse;padding:2px 2px;">
                            <div class="acctId">3103 本年利润</div>
                        </td>
                        <td class="td-debitAmt" style="border:1px solid #000;border-collapse: collapse;padding:2px 2px;">
                            <div class="debitAmt">200.00</div>
                        </td>
                        <td class="td-creditAmt" style="border:1px solid #000;border-collapse: collapse;padding:2px 2px;">
                            <div class="creditAmt"></div>
                        </td>
                    </tr>
                    <tr class="" style="height:70px;">
                        <td class="td-vchrAbstr" style="border:1px solid #000;border-collapse: collapse;padding:2px 2px;">
                            <div class="vchrAbstr">结转本年利润结转本年利润(df)(ghjgfhj) dgdsg sdgdsfg dfg </div>
                        </td>
                        <td class="td-acctId" style="border:1px solid #000;border-collapse: collapse;padding:2px 2px;">
                            <div class="acctId">3103 本年利润</div>
                        </td>
                        <td class="td-debitAmt" style="border:1px solid #000;border-collapse: collapse;padding:2px 2px;">
                            <div class="debitAmt">200.00</div>
                        </td>
                        <td class="td-creditAmt" style="border:1px solid #000;border-collapse: collapse;padding:2px 2px;">
                            <div class="creditAmt"></div>
                        </td>
                    </tr>
                    <tr class="summary" style="height: 30px">
                        <td class="td-vchrAbstr" colspan="2" style="border:1px solid #000;border-collapse: collapse;padding:2px 2px;">
                            <div class="vchrAbstr">合计:贰佰元整</div>
                        </td>
                        <td class="td-debitAmt" style="border:1px solid #000;border-collapse: collapse;padding:2px 2px;">
                            <div class="debitAmt">200.00</div>
                        </td>
                        <td class="td-creditAmt" style="border:1px solid #000;border-collapse: collapse;padding:2px 2px;">
                            <div class="creditAmt">200.00</div>
                        </td>
                    </tr>

                    </tbody>
                </table>

                <div class="footer" style="float: left;width: 100%; margin-top: 10px">
                    <div style="float: left;width: 19%;font-size: 14px">财务主管:XXX</div>
                    <div style="float: left;width: 19%;font-size: 14px">记账人:XXX</div>
                    <div style="float: left;width: 19%;font-size: 14px">审核人:XXX</div>
                    <div style="float: left;width: 19%;font-size: 14px">制单人:admin</div>
                    <div style="float: left;width: 19%;font-size: 14px">经办人:XXX</div>
                </div>

            </div>

            <div><input /></div>

        </div>
    </div>
</template>

<script>
    import {getLodop} from './../plugins/lodop/LodopFuncs.js';
    export default {
        name: "Message",
        data () {
            return {
                remark : "测试一下打印功能"
            }
        },
        methods :{
            print_test() {
                this.CreateOneFormPage();
                //LODOP.PRINT();//直接打印
                LODOP.PREVIEW();//打印预览
            },
            CreateOneFormPage() {
                LODOP = getLodop();
                LODOP.PRINT_INIT("凭证");
                //设置字体大小
                LODOP.SET_PRINT_STYLE("FontSize",12);
                //参数1：打印方向 1---纵向打印，固定纸张； 2---横向打印，固定纸张；  3---纵向打印，宽度固定，高度按打印内容的高度自适应；0---方向不定，由操作者自行选择或按打印机缺省设置。参数2：纸张宽，参数3：纸张高，参数4：纸张类型名
                LODOP.SET_PRINT_PAGESIZE(0,1970,2790,"CreateCustomPage");
                LODOP.SET_PRINT_MODE("CREATE_CUSTOM_PAGE_NAME","241连续纸");//对新建的纸张重命名
                //参数1：上边距，参数2：左边距,参数3，参数4：设置打印可用区域，暂时默认都是"100%"
                LODOP.ADD_PRINT_HTM(0, 0, "100%", "100%",document.getElementById("PrintDiv").innerHTML);

            }
        }
    }
</script>
